import { Response } from "express";
import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/userModel";

export const generateToken = (res: Response, user: IUserDocument) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d", // Token expiration time
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // Helps prevent CSRF attacks
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};
