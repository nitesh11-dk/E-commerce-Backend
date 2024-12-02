import express from 'express';
const router = express.Router();
import { checkout, verifyPayment, getOrders } from '../Controllers/payment.js';
import { AuthenticateUser } from '../Middlewares/auth.js';

router.post('/checkout', AuthenticateUser, checkout)
// verify payment 

router.post('/verify-payment', AuthenticateUser, verifyPayment)

router.get('/getOrders', AuthenticateUser, getOrders);



export default router
