import { Router } from "express";
import { addToCart, getUserCart, removeFromCart, clearCart, decreaseQuantity } from '../Controllers/cart.js'
const router = Router();



router.post("/add", addToCart)
router.get("/user", getUserCart)
router.delete("/remove/:productId", removeFromCart)
router.delete("/clear", clearCart)
router.get("/--qty/:productId", decreaseQuantity)


export default router;

