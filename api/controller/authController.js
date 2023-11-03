const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("user creater successfully");
  } catch (error) {
    next(error);
    // next(errorHandler(501, "error from my sde"));
  }
};

module.exports = signUp;
