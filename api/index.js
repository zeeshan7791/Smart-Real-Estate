const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const connectDB = require("../config/db");
const userRouter = require("./routes/useroute");
const authRouter = require("./routes/authRoute");
const listingRouter = require("./routes/listingRoute");
const cookieParser = require("cookie-parser");
dotenv.config();
connectDB();
const app = express();
const __dirname = path.resolve();
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
// user route
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
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
