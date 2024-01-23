const listing = require("../model/listing");
const Listing = require("../model/listing");
const errorHandler = require("../utils/error");

const createListing = async (req, res, next) => {
  try {
    const { name, description, address } = req.body;
    let pics = [];

    req.files.map((item) => {
      pics.push(item.filename);
    });
    req.body.pictures = pics;
    console.log(req.body.pictures);
    if (req.body.pictures.length === 0) {
      return next(errorHandler(401, "please upload pictures"));
    }

    if (!name || !description || !address) {
      return next(errorHandler(401, "Enter the fields"));
    }

    const listing = await Listing.create(req.body);
    return res.status(201).json({
      success: true,
      message: "product created successfully",
      listing,
    });
  } catch (error) {
    next(error);
  }
};
const getListing = async (req, res, next) => {
  try {
    const getProductListing = await Listing.find();
    // console.log(getProductListing);
    return res.status(200).json({
      success: true,
      message: "listing get successfully",
      getProductListing,
    });
  } catch (error) {
    next(error);
  }
};

const getMyListings = async (req, res, next) => {
  try {
    // console.log(req.body, "value in body");
    const { userRef } = req.body;
    console.log(userRef);
    const userListing = await Listing.find({ userRef: userRef });
    console.log(userListing, "value in listing--------------");
    return res.status(200).json({
      success: true,
      message: "user listing fetched successfully",
      userListing,
    });
  } catch (error) {
    next(error);
  }
};
const updateListing = async (req, res, next) => {
  try {
    const {
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bedrooms,
      bathrooms,
      furnished,
      parking,
      type,
      offer,
      userRef,
    } = req.body;

    const updatelistings = await Listing.findByIdAndUpdate();
  } catch (error) {
    next(error);
  }
};
const deleteListing = async (req, res, next) => {
  console.log(req.params.id, "value in listing");
  const findListing = await Listing.findById({ _id: req.params.id });
  console.log(findListing, "value in listing");

  if (!findListing) {
    return next(errorHandler(404, "Listing not found"));
  }

  // if (req.user.id !== findListing.userRef.toString()) {
  //   return next(errorHandler(401, "You can only delete your own listing!"));
  // }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createListing,
  getListing,
  getMyListings,
  deleteListing,
};
