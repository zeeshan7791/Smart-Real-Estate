const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("user creater successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = signUp;
