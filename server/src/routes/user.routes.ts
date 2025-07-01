import express from 'express'
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, updateProfile, verifyEmail } from '../controller/user.controller';
import { isAuthenticated } from '../middleware/isAuthenticated';

const router = express.Router();

// Helper to wrap async route handlers and forward errors to Express
const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.route("check-auth").get(isAuthenticated,asyncHandler(checkAuth))
router.route("/signup").post(asyncHandler(signup));
router.route("/login").post(asyncHandler(login));
// router.route("/logout").post(logout)
// router.route("/verify-email").post(verifyEmail)
// router.route("/forgot-password").post(forgotPassword)
// router.route("/reset-password").post(resetPassword)
// router.route("/profile/update").post(isAuthenticated,updateProfile)
      
export default router;  