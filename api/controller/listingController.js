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
module.exports = {
  createListing,
};
