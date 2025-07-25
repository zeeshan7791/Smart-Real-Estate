import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import userRouter from "./routes/useroute.js";
import authRouter from "./routes/authRoute.js";
import listingRouter from "./routes/listingRoute.js";
import cookieParser from "cookie-parser";
dotenv.config();
connectDB();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
// user route
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
const PORT = process.env.PORT || 5000;
app.use("/image", express.static(path.join(__dirname, "uploads")));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
