import Restaurant from "../models/restaurantModel";
import uploadImageOnCloudinary from "../utils/imageUpload";
import Order from "../models/orderModel";
export const createRestaurant = async (req, res, next) => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (restaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user",
            });
        }
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Restaurant image is required",
            });
        }
        const imageUrl = await uploadImageOnCloudinary(file);
        await Restaurant.create({
            user: req.id,
            restaurantName,
            city,
            country,
            deliveryTime: Number(deliveryTime),
            cuisines: cuisines.split(","),
            imageUrl,
        });
        res.status(200).json({
            success: true,
            message: "Restaurant Added",
        });
    }
    catch (error) {
        next(error);
    }
};
export const getRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.id }).populate("menus");
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                restaurant: [],
                message: "Restaurant not found",
            });
        }
        res.status(200).json({
            success: true,
            restaurant,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateRestaurant = async (req, res, next) => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }
        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.deliveryTime = Number(deliveryTime);
        restaurant.cuisines = cuisines.split(",");
        if (file) {
            const imageURL = await uploadImageOnCloudinary(file);
            restaurant.imageUrl = imageURL;
        }
        await restaurant.save();
        res.status(200).json({
            success: true,
            message: "Restaurant updated",
            restaurant,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getRestaurantOrders = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }
        const orders = await Order.find({ restaurant: restaurant._id })
            .populate("restaurant")
            .populate("user");
        res.status(200).json({
            success: true,
            orders,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateOrderStatus = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        order.status = status;
        await order.save();
        res.status(200).json({
            success: true,
            status: order.status,
            message: "Order status updated",
        });
    }
    catch (error) {
        next(error);
    }
};
export const searchRestaurant = async (req, res, next) => {
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery || "";
        const selectedCuisines = (req.query.selectedCuisines || "")
            .split(",")
            .filter((cuisines) => cuisines);
        const query = {};
        // basic search on searchText
        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: "i" } },
                { city: { $regex: searchText, $options: "i" } },
                { country: { $regex: searchText, $options: "i" } },
            ];
        }
        // search on the basis of searchQuery
        if (searchQuery) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: "i" } },
                { cuisines: { $regex: searchText, $options: "i" } },
            ];
        }
        if (selectedCuisines.length > 0) {
            query.cuisines = { $in: selectedCuisines };
        }
        const restaurants = await Restaurant.find(query);
        res.status(200).json({
            success: true,
            data: restaurants,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getSingleRestaurant = async (req, res, next) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId).populate({
            path: "menus",
            options: { createdAt: -1 },
        });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }
        res.status(200).json({
            success: true,
            restaurant,
        });
    }
    catch (error) {
        next(error);
    }
};
