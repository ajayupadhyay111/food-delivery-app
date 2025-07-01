import { Request, Response, NextFunction } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import Menu from "../models/menuModel";
import Restaurant from "../models/restaurantModel";
import mongoose from "mongoose";
export const addMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    const imageURL = await uploadImageOnCloudinary(file as Express.Multer.File);
    const menu = await Menu.create({
      name,
      description,
      price,
      image: imageURL,
    });
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (restaurant) {
      restaurant.menus.push(menu._id as mongoose.Types.ObjectId);
      await restaurant.save();
    }
    res.status(200).json({
      success: true,
      message: "Menu added successfully",
      menu,
    });
  } catch (error) {
    next(error);
  }
};

export const editMenu = async (
  next: NextFunction,
  res: Response,
  req: Request
) => {
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
    if (name) menu.name = name;
    if (description) menu.description = description;
    if (price) menu.price = price;

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      menu.image = imageUrl;
    }
    await menu.save();
    res.status(200).json({
      success: true,
      message: "Menu updated",
      menu,
    });
  } catch (error) {
    next(error);
  }
};
