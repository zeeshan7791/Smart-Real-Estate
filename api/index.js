const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("../config/db");
const userRouter = require("./routes/useroute");
const authRouter = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
dotenv.config();
connectDB();
const app = express();
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
// user route
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
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
