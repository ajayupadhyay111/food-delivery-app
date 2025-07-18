import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { addMenu, editMenu } from '../controller/menu.controller';
import upload from '../middleware/multer';
import { asyncHandler } from './restaurant.routes';
const router = express.Router();
router.route("/").post(isAuthenticated, upload.single("image"), asyncHandler(addMenu));
router.route("/:id").put(isAuthenticated, upload.single("image"), asyncHandler(editMenu));
export default router;
