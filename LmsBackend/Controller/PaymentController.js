const payment = require("../model/PaymentSchema");
const razorPay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

const razorpay = new razorPay({
  key_id: process.env.Key_Id,
  key_secret: process.env.Secret_key,
});

const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", userId, courseId } = req.body;

    const options = {
      amount: amount * 100,
      currency,
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const payments = await payment({
      user: userId,
      course: courseId,
      razorpay_order_id: order.id,
      amount,
      currency,
      status: "pending",
    });

    await payments.save();

    res.status(201).json(order);
  } catch (error) {
    console.log(error.message);
  }
};

const VerfiyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.Secret_key)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await payment.findOneAndUpdate(
        { razorpay_order_id },
        {
          razorpay_payment_id,
          razorpay_signature,
          status: "successful",
        }
      );

      res.json({ message: "Payment successful", status: "success" });
    } else {
      await payment.findOneAndUpdate(
        { razorpay_order_id },
        { status: "failed" }
      );

      res.status(400).json({ message: "Invalid signature", status: "failed" });
    }
  } catch (err) {
    console.log(err.message);
  }
};


module.exports = {
    createOrder,
    VerfiyPayment
}