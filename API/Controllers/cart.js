import Cart from "../Models/Cart.js";


// add to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        const user = req.user;
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
        const user = req.user;
        const cart = await Cart.findOne({ userId: user.id }).populate('items.productId');

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
        const user = req.user;
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
        const user = req.user;
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

export const decreaseQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = req.user;



        const cart = await Cart.findOne({ userId: user.id }).populate("items.productId");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }
        console.log(cart)
        // Find the index of the product in the cart items
        const itemIndex = cart.items.findIndex(
            (item) => item.productId._id.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart", success: false });
        }

        // Get the product's price from the populated data
        const productPrice = cart.items[itemIndex].productId.price;

        // Decrease quantity or remove item if quantity is 1
        if (cart.items[itemIndex].quantity > 1) {
            cart.items[itemIndex].quantity -= 1;
            cart.items[itemIndex].totalPrice -= productPrice;
        } else {
            cart.items.splice(itemIndex, 1); // Remove the item from the cart
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: "Product quantity decreased successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error decreasing product quantity", success: false });
    }
};
