import { Router } from "express";
import { addToCart, getUserCart, removeFromCart, clearCart } from '../Controllers/cart.js'
const router = Router();



router.post("/add", addToCart)
router.get("/user", getUserCart)
router.delete("/remove/:productId", removeFromCart)
router.delete("/clear", clearCart)


export default router;

2: 34