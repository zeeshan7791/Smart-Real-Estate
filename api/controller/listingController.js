const Listing = require("../model/listing");

const createListing = async (req, res, next) => {
  try {
    let pics = [];

    req.files.map((item) => {
      pics.push(item.filename);
    });
    req.body.pictures = pics;

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
