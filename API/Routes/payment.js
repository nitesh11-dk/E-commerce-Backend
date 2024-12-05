import express from 'express';
const router = express.Router();
import { checkout, verifyPayment, getOrders, allOrders } from '../Controllers/payment.js';
import { AuthenticateUser, AuthenticateAdmin } from '../Middlewares/auth.js';

router.post('/checkout', checkout)
// verify payment 

router.post('/verify-payment', verifyPayment)

router.get('/getOrders', AuthenticateUser, getOrders);
router.get('/allOrders', AuthenticateUser, AuthenticateAdmin, allOrders);



export default router;
