import Payment from "../Models/Payment.js";
import Product from "../Models/Product.js";
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// checkout
export const checkout = async (req, res) => {
    try {
        let { amount, cardItems, userShippingAddress, userId } = req.body;

        const options = {
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `receipt_#${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.json({
            orderId: order.id,
            amount,
            cardItems,
            userShippingAddress,
            userId,
            payStatus: "created"
        });
    } catch (error) {
        console.error("Error in checkout:", error);
        if (error.statusCode === 400 && error.error?.code === 'BAD_REQUEST_ERROR') {
            res.status(400).json({ message: "Invalid amount.", details: error.error.description });
        } else {
            res.status(500).json({ message: "Failed to create order.", error: error.message });
        }
    }
};


// verify payment & decrement product stock
export const verifyPayment = async (req, res) => {
    try {
        const {
            userId, orderId, paymentId, signature,
            amount, orderItems, userShippingAddress,
        } = req.body;

        // ── Signature verification ──────────────────────────────────────
        const body = orderId + "|" + paymentId;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== signature) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        // ── Decrement stock for each purchased item ─────────────────────
        for (const item of orderItems) {
            const productId = item.productId?._id || item.productId;
            const purchasedQty = item.quantity || 1;
            const selectedSize = item.selectedSize || null;

            const product = await Product.findById(productId);
            if (!product) continue;

            if (selectedSize && product.sizes?.length > 0) {
                // Decrement specific size stock
                const sizeEntry = product.sizes.find(s => s.size === selectedSize);
                if (sizeEntry) {
                    sizeEntry.stock = Math.max(0, sizeEntry.stock - purchasedQty);
                }
                // Recompute total
                product.quantity = product.sizes.reduce((sum, s) => sum + s.stock, 0);
            } else {
                // Simple decrement on total quantity
                product.quantity = Math.max(0, product.quantity - purchasedQty);
            }

            await product.save();
        }

        // ── Save payment record ─────────────────────────────────────────
        const orderConfirm = await Payment.create({
            orderId, paymentId, signature, amount,
            orderItems, userId, userShippingAddress,
            payStatus: "paid",
            orderStatus: "Processing"
        });
        await orderConfirm.save();

        res.json({ message: "Payment verified successfully", success: true, orderConfirm });
    } catch (error) {
        console.error("Error in verifyPayment:", error.message);
        res.status(500).json({ message: "Failed to verify payment", error: error.message });
    }
};

// get orders (user)
export const getOrders = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const orders = await Payment.find({ userId }).sort({ orderDate: -1 });
        res.status(200).json({ orders, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting orders", success: false });
    }
};

export const allOrders = async (req, res) => {
    try {
        const orders = await Payment.find().sort({ orderDate: -1 });
        res.status(200).json({ orders, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting orders", success: false });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Payment.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found", success: false });
        res.status(200).json({ order, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting order by ID", success: false });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;
        
        const order = await Payment.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found", success: false });

        if (order.orderStatus === 'Cancelled') {
            return res.status(400).json({ message: "Cannot change the status of a cancelled order.", success: false });
        }
        
        order.orderStatus = orderStatus;
        if (orderStatus === 'Cancelled') {
            order.refundStatus = 'Pending';
        }
        
        await order.save();
        res.status(200).json({ message: "Order status updated successfully", success: true, order });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Error updating order status", success: false });
    }
};

export const cancelOrderUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id.toString();
        
        // Ensure user owns this order
        const order = await Payment.findOne({ _id: id, userId });
        if (!order) return res.status(404).json({ message: "Order not found or unauthorized", success: false });
        
        if (order.orderStatus === 'Delivered' || order.orderStatus === 'Cancelled') {
            return res.status(400).json({ message: "Cannot cancel this order anymore.", success: false });
        }
        
        order.orderStatus = 'Cancelled';
        order.refundStatus = 'Pending';
        await order.save();
        
        res.status(200).json({ message: "Order cancelled successfully. Refund initiated.", success: true, order });
    } catch (error) {
        console.error("Error cancelling order:", error);
        res.status(500).json({ message: "Error cancelling order", success: false });
    }
};

export const updateRefundStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { refundStatus } = req.body;
        
        const order = await Payment.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found", success: false });

        if (order.refundStatus === 'Refund Successful') {
            return res.status(400).json({ message: "Refund is already marked as Successful and cannot be changed.", success: false });
        }
        
        order.refundStatus = refundStatus;
        await order.save();
        
        res.status(200).json({ message: "Refund status updated", success: true, order });
    } catch (error) {
        console.error("Error updating refund status:", error);
        res.status(500).json({ message: "Error updating refund status", success: false });
    }
};
