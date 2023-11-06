const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
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
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("user creater successfully");
  } catch (error) {
    next(error);
    // next(errorHandler(501, "error from my sde"));
  }
};

module.exports = signUp;
