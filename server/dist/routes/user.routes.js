import express from "express";
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, updateProfile, verifyEmail, } from "../controller/user.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
const router = express.Router();
// Helper to wrap async route handlers and forward errors to Express
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
router.route("/check-auth").get(isAuthenticated, asyncHandler(checkAuth));
router.route("/signup").post(asyncHandler(signup));
router.route("/login").post(asyncHandler(login));
router.route("/logout").post(logout);
router.route("/verify-email").post(asyncHandler(verifyEmail));
router.route("/forgot-password").post(asyncHandler(forgotPassword));
router.route("/reset-password").post(asyncHandler(resetPassword));
router
    .route("/profile/update")
    .post(isAuthenticated, asyncHandler(updateProfile));
export default router;
