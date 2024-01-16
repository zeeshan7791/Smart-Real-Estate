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
    console.log(getProductListing);
    res.status(200).json({
      success: true,
      message: "listing get successfully",
      getProductListing,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createListing,
  getListing,
};
