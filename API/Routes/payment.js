import express from 'express';
const router = express.Router();
import { checkout, verifyPayment, getOrders, allOrders, getOrderById, updateOrderStatus, cancelOrderUser, updateRefundStatus } from '../Controllers/payment.js';
import { AuthenticateUser, AuthenticateAdmin } from '../Middlewares/auth.js';

router.post('/checkout', checkout)
// verify payment 

router.post('/verify-payment', verifyPayment)

router.get('/getOrders', AuthenticateUser, getOrders);
router.get('/allorders', AuthenticateUser, AuthenticateAdmin, allOrders);
router.get('/order/:id', AuthenticateUser, AuthenticateAdmin, getOrderById);
router.put('/order/status/:id', AuthenticateUser, AuthenticateAdmin, updateOrderStatus);
router.put('/order/refund/:id', AuthenticateUser, AuthenticateAdmin, updateRefundStatus);
router.put('/order/cancel/:id', AuthenticateUser, cancelOrderUser);



export default router;
