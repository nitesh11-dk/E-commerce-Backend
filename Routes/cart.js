import { Router } from "express";
import { addToCart, getUserCart ,removeFromCart } from '../Controllers/cart.js'
const router = Router();



router.post("/add", addToCart)
router.get("/user", getUserCart)
router.delete("/remove", removeFromCart)


export default router;