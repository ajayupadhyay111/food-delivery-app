import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db";
import errorHandler from "./middleware/errorHandler";
import userRoutes from "./routes/user.routes";
import restaurantRoutes from "./routes/restaurant.routes";
import menuRoutes from "./routes/menu.routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import orderRoutes from "./routes/order.routes";
// Importing dotenv to manage environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from TypeScript backend!");
});

//middlewares
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
// Import routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/restaurant", restaurantRoutes);
app.use("/api/v1/menu", menuRoutes);
// app.use("/api/v1/order", orderRoutes);

// error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
