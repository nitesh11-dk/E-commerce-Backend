import Payment from "../Models/Payment.js";
import Razorpay from 'razorpay'; // Import Razorpay

const razorpay = new Razorpay({
    key_id: "rzp_test_YaU552VxGMnvhU",
    key_secret: "4AL5mEvdAaq0IyYlrgYHWPMk"
})


//checkout
export const checkout = async (req, res) => {
    const { amount, cardItems, userShipping, userId } = req.body;

    var options = {
        amount: amount * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: `receipt_#${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);

    res.json({
        orderId: order.id,
        amount: amount,
        cardItems,
        userShipping,
        userId,
        payStatus: "created"
    })

}

export const verifyPayment = async (req, res) => {


    
}
