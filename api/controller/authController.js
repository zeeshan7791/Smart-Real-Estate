const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");
const signUp = async (req, res, next) => {
  const { username, email, password, avatar } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.username === username) {
        // Username is already in use
        return next(errorHandler(409, "Duplicate username"));
      }
      if (existingUser.email === email) {
        // Email is already in use
        return next(errorHandler(409, "Duplicate email "));
      }
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar,
    });
    await newUser.save();
    console.log(newUser.avatar);
    res.status(201).json("user creater successfully");
  } catch (error) {
    next(error);
    // next(errorHandler(501, "error from my sde"));
  }
};
const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      // Email is already in use
      return next(errorHandler(404, "user not found "));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      // Email is already in use
      return next(errorHandler(401, "invalid credentials "));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
    // next(errorHandler(501, "error from my sde"));
  }
};

module.exports = {
  signUp,
  signIn,
};
