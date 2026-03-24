import Cart from "../Models/Cart.js";
import Product from "../Models/Product.js";

// add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, selectedSize = null } = req.body;
    const user = req.user;

    let cart = await Cart.findOne({ userId: user.id });
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }

    if (cart) {
      // Find item with same productId AND selectedSize
      const existingItem = cart.items.find(
        (item) => item.productId?.toString() === productId && item.selectedSize === selectedSize
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice += product.price * quantity;
      } else {
        cart.items.push({
          productId,
          quantity,
          totalPrice: product.price * quantity,
          selectedSize
        });
      }
      await cart.save();
    } else {
      const newCart = new Cart({
        userId: user.id,
        items: [{ productId, quantity, totalPrice: product.price * quantity, selectedSize }],
      });
      await newCart.save();
    }

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
    const cart = await Cart.findOne({ userId: user.id }).populate("items.productId");

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
    // Expect productId to represent the specific array _id OR exact product+size combo
    // We'll update the frontend to pass the unique _id of the cart item if possible, 
    // but for now, we'll assume we delete the first match of productId
    const { productId } = req.params; 
    const { selectedSize } = req.body || {}; // optional
    const user = req.user;
    
    const cart = await Cart.findOne({ userId: user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found", success: false });
    }

    // Match by productId and optionally selectedSize if provided
    const itemIndex = cart.items.findIndex((item) => {
      let isMatch = item.productId?.toString() === productId;
      if (selectedSize) isMatch = isMatch && item.selectedSize === selectedSize;
      return isMatch;
    });

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
    const { selectedSize } = req.body || {};
    const user = req.user;

    const cart = await Cart.findOne({ userId: user.id }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found", success: false });
    }

    const itemIndex = cart.items.findIndex((item) => {
        let isMatch = item.productId._id.toString() === productId;
        if (selectedSize) isMatch = isMatch && item.selectedSize === selectedSize;
        return isMatch;
    });

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart", success: false });
    }

    const productPrice = cart.items[itemIndex].productId.price;

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
      cart.items[itemIndex].totalPrice -= productPrice;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    res.status(200).json({ message: "Product quantity decreased successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error decreasing product quantity", success: false });
  }
};
