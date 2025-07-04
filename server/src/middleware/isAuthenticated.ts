import { Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

export const isAuthenticated = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Login first" });
      return;
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    if (!decode) {
      res.status(401).json({ message: "Invalid authentication token" });
      return;
    }
    req.id = decode.userId;
    res.status(200).json({ message: "User is authenticated" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
