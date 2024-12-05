import express from 'express';
const router = express.Router();
import { checkout, verifyPayment, getOrders, allOrders, getOrderById } from '../Controllers/payment.js';
import { AuthenticateUser, AuthenticateAdmin } from '../Middlewares/auth.js';

router.post('/checkout', checkout)
// verify payment 

router.post('/verify-payment', verifyPayment)

router.get('/getOrders', AuthenticateUser, getOrders);
router.get('/allorders', AuthenticateUser, AuthenticateAdmin, allOrders);
router.get('/order/:id', AuthenticateUser, AuthenticateAdmin, getOrderById);



export default router;
