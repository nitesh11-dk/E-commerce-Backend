import Cart from "../Models/cart.js";
import Product from "../Models/product.js";

// add to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        const user = {
            id: "673f0a99e621d7eb39d2d7a8"
        };
        const cart = await Cart.findOne({ userId: user.id });

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        if (cart) {
            const existingItem = cart.items.find(item => item.productId?.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.totalPrice += product.price * quantity;
            } else {
                cart.items.push({ productId, quantity, totalPrice: product.price * quantity });
            }
            await cart.save();
        } else {
            const newCart = new Cart({
                userId: user.id,
                items: [{ productId, quantity, totalPrice: product.price * quantity }],
            });
            await newCart.save();
        }
        // const updatedCart = await Cart.findOne({ user: user.id })
        //     .populate('items.productId'); 

        res.status(200).json({ message: "Product added to cart successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding product to cart", success: false });
    }
};

// get user cart 
export const getUserCart = async (req, res) => {
    try {
        const user = {
            id: "673f0a99e621d7eb39d2d7a8"
        };
        const cart = await Cart.findOne({ userId: user.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }
        res.status(200).json({ cart, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting cart", success: false });
    }
};

// remove product from cart 
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params; // Changed from req.body to req.params
        const user = {
            id: "673f0a99e621d7eb39d2d7a8"
        };
        const cart = await Cart.findOne({ userId: user.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }

        const itemIndex = cart.items.findIndex(item => item.productId?.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart", success: false });
        }
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json({ message: "Product removed from cart successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing product from cart", success: false });
    }
};

export const clearCart = async (req, res) => {
    try {
        const user = {
            id: "673f0a99e621d7eb39d2d7a8"
        };
        const cart = await Cart.findOne({ userId: user.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }
        cart.items = [];
        await cart.save();
        res.status(200).json({ message: "Cart cleared successfully", success: true });
    } catch (error) {
        console.log(error);
        res.json({ message: "Error clearing cart", success: false });
    }
};