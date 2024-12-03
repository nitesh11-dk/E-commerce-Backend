import Payment from "../Models/Payment.js";
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});


//checkout
export const checkout = async (req, res) => {
    try {
        let { amount, cardItems, userShippingAddress, userId } = req.body;

        // Ensure amount is an integer
        amount = amount; // Rounds to the nearest integer

        const options = {
            amount: amount * 100,  // Convert to smallest currency unit
            currency: "INR",
            receipt: `receipt_#${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.json({
            orderId: order.id,
            amount: amount,
            cardItems,
            userShippingAddress,
            userId,
            payStatus: "created"
        });
    } catch (error) {
        console.error("Error in checkout:", error);

        if (error.statusCode === 400 && error.error?.code === 'BAD_REQUEST_ERROR') {
            res.status(400).json({
                message: "Invalid amount. Please provide a valid integer value for the amount.",
                details: error.error.description,
            });
        } else {
            res.status(500).json({
                message: "Failed to create order. Please try again later.",
                error: error.message,
            });
        }
    }
};


export const verifyPayment = async (req, res) => {
    try {
        const {
            userId,
            orderId,
            paymentId,
            signature,
            amount,
            orderItems,
            userShippingAddress,
        } = req.body;

        const orderConfirm = await Payment.create({
            orderId,
            paymentId,
            signature,
            amount,
            orderItems,
            userId,
            userShippingAddress,
            payStatus: "paid"
        });

        await orderConfirm.save();

        res.json({ message: "Payment verified successfully", success: true, orderConfirm });
    } catch (error) {
        console.error("Error in verifyPayment:", error.message);
        res.status(500).json({ message: "Failed to verify payment", error: error.message });
    }
};

//  get orders 
export const getOrders = async (req, res) => {
    try {
        let userId = req.user._id.toString();
        console.log(userId);
        const orders = await Payment.find({ userId }).sort({ orderDate: -1 });
        res.status(200).json({ orders, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting orders", success: false });
    }
}

export const allOrders = async (req, res) => {
    try {
        const orders = await Payment.find()
        res.status(200).json({ orders, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting orders", success: false });
    }
}