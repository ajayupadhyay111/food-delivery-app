import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Login first" });
            return;
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            res.status(401).json({ message: "Invalid authentication token" });
            return;
        }
        req.id = decode.userId;
        next();
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
