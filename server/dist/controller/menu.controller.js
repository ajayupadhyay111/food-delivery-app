import uploadImageOnCloudinary from "../utils/imageUpload";
import Menu from "../models/menuModel";
import Restaurant from "../models/restaurantModel";
export const addMenu = async (req, res, next) => {
    try {
        const { name, price, desc } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }
        const imageURL = await uploadImageOnCloudinary(file);
        const menu = await Menu.create({
            name,
            description: desc,
            price,
            image: imageURL,
        });
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (restaurant) {
            restaurant.menus.push(menu._id);
            await restaurant.save();
        }
        res.status(200).json({
            success: true,
            message: "Menu added successfully",
            menu,
        });
    }
    catch (error) {
        next(error);
    }
};
export const editMenu = async (res, req, next) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const file = req.file;
        const menu = await Menu.findById(id);
        if (!menu) {
            return res.status(404).json({
                success: false,
                message: "Menu not found",
            });
        }
        if (name)
            menu.name = name;
        if (description)
            menu.description = description;
        if (price)
            menu.price = price;
        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file);
            menu.image = imageUrl;
        }
        await menu.save();
        res.status(200).json({
            success: true,
            message: "Menu updated",
            menu,
        });
    }
    catch (error) {
        next(error);
    }
};
