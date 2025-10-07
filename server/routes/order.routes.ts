import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createOrder, getAllOrder, newPayment, sendStripePublishableKey } from "../controller/order.controller";
import { updateAccessToken } from "../controller/user.controller";
const OrderRouter = express.Router();

OrderRouter.post("/create-order", isAuthenticated, createOrder);

OrderRouter.get(
  "/get-orders",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrder
);

OrderRouter.get('/payment/stripePublishablekey',sendStripePublishableKey)

OrderRouter.post("/payment",isAuthenticated,newPayment)

export default OrderRouter;
