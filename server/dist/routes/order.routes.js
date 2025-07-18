import { asyncHandler } from './restaurant.routes';
import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { createCheckoutSession, getOrders, stripeWebhook, } from "../controller/order.controller";
const router = express.Router();
router.route("/").get(isAuthenticated, getOrders);
router
    .route("/checkout/create-checkout-session")
    .post(isAuthenticated, asyncHandler(createCheckoutSession));
router.route("/webhook").post(express.raw({ type: "application/json" }), asyncHandler(stripeWebhook));
export default router;
