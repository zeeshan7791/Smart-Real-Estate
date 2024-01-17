const errorHandler = require("../utils/error");
const bcryptjs = require("bcryptjs");
const User = require("../model/user");
const Listing = require("../model/listing");

const getUser = async (req, res) => {
  res.send("hey how are you");
};
const updateUser = async (req, res, next) => {
  console.log(req.body.password, "Password before ");
  const photo = req.file ? req.file.filename : "";
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    let updateForm = {
      username: req.body.username,
      email: req.body.email,
    };
    // Check if password is provided and not empty
    if (req.body.password !== undefined && req.body.password.trim() !== "") {
      updateForm.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (photo) {
      updateForm.photo = photo;
    }
    console.log(req.body.password, "value in password");
    console.log(updateForm, "value in form");
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateForm,
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

// userListing

const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const userlistings = await Listing.find({ userRef: req.params.id });
      res.status(200).json({
        success: true,
        message: "user listing fetched successfully",
        userlistings,
      });
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};
module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getUserListings,
};
