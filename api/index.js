const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("../config/db");
const userRouter = require("./routes/useroute");
const authRouter = require("./routes/authRoute");
dotenv.config();
connectDB();
const app = express();
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// user route
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
