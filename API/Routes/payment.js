import express from 'express';
const router = express.Router();
import { checkout, verifyPayment } from '../Controllers/payment.js';

router.post('/checkout', checkout)
// verify payment 

router.post('/verify-payment', verifyPayment)



export default router
