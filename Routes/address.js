import { Router } from "express";
import { addAddress } from "../Controllers/address.js";
import { AuthenticateUser } from "../Middlewares/auth.js";
const router = Router();

router.post('/add', AuthenticateUser, addAddress);


export default router;