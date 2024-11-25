import { Router } from "express";
import { addAddress, getAddress } from "../Controllers/address.js";
import { AuthenticateUser } from "../Middlewares/auth.js";
const router = Router();

router.post('/add', AuthenticateUser, addAddress);
router.get('/get', AuthenticateUser, getAddress);


export default router;