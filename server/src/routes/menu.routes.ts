import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated';
import { addMenu, editMenu } from '../controller/menu.controller';
import upload from '../middleware/multer';
const router = express.Router();

router.route("/").post(isAuthenticated,upload.single("image"),addMenu)
router.route("/:id").post(isAuthenticated,upload.single("image"),editMenu)

export default router;