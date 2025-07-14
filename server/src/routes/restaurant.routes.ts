import express from 'express'
import { createRestaurant, getRestaurant, getRestaurantOrders, getSingleRestaurant, searchRestaurant, updateOrderStatus, updateRestaurant } from '../controller/restaurant.controller';
import { isAuthenticated } from '../middleware/isAuthenticated';
import upload from '../middleware/multer';
const router = express.Router();

export const asyncHandler = (fn:any)=> (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    Promise.resolve(fn(req,res,next)).catch(next)
}

router.route("/").post(isAuthenticated,upload.single("imageFile"), asyncHandler(createRestaurant))
router.route("/").get(isAuthenticated,asyncHandler(getRestaurant))
router.route("/").put(isAuthenticated,upload.single("imageFile"), asyncHandler(updateRestaurant))
// router.route("/order").get(isAuthenticated,getRestaurantOrders)
// router.route("/order/:orderId/status").put(isAuthenticated,updateOrderStatus)
router.route("/search/:searchText").post(isAuthenticated,searchRestaurant)
// router.route("/:id").get(isAuthenticated,getSingleRestaurant)

export default router;