import { Router } from "express";
import { addToCart, getUserCart, removeFromCart, clearCart, decreaseQuantity } from '../Controllers/cart.js'
const router = Router();

import { AuthenticateUser } from "../Middlewares/auth.js";

router.post("/add", AuthenticateUser, addToCart)
router.get("/user", AuthenticateUser, getUserCart)
router.delete("/remove/:productId", AuthenticateUser, removeFromCart)
router.delete("/clear", AuthenticateUser, clearCart)
router.get("/--qty/:productId", AuthenticateUser, decreaseQuantity)


export default router;

