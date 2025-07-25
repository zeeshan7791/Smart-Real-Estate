import errorHandler from "../utils/error.js";
import Listing from "../model/listing.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
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
// const updateListing = async (req, res, next) => {
//   console.log("hello");
//   const listing = await Listing.findById({ _id: req.params.id });
//   if (!listing) {
//     return next(errorHandler(404, "Listing not found"));
//   }
//   if (req.user.id !== req.params.id) {
//     return next(errorHandler(401, "You can only update your own account!"));
//   }

//   try {
//     // const {
//     //   name,
//     //   description,
//     //   address,
//     //   regularPrice,
//     //   discountPrice,
//     //   bedrooms,
//     //   bathrooms,
//     //   furnished,
//     //   parking,
//     //   type,
//     //   offer,
//     //   userRef,
//     // } = req.body;
//     // let pics = [];

//     // req.files.map((item) => {
//     //   pics.push(item.filename);
//     // });
//     // if (pics.length != 0) {
//     //   req.body.pictures = pics;
//     // }

//     let updateUserListing = {
//       name: req.body.name,
//       description: req.body.description,
//       address: req.body.address,
//       regularPrice: req.body.regularPrice,
//       discountPrice: req.body.discountPrice,
//       bedrooms: req.body.bedrooms,
//       bathrooms: req.body.bathrooms,
//       furnished: req.body.furnished,
//       parking: req.body.parking,
//       type: req.body.type,
//       offer: req.body.offer,
//       userRef: req.body.userRef,
//     };
//     const updatedlisting = await Listing.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: updateUserListing,
//       },
//       { new: true }
//     );
//     return res.status(201).json({
//       success: true,
//       message: "User listing updated successfully",
//       updatedlisting,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  console.log(listing, "value in listing----");
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    let pics = [];
    if (req.files) {
      req.files.map((item) => {
        pics.push(item.filename);
      });
    }
    console.log(pics, "value in pics-------");
    if (pics.length !== 0) {
      req.body.pictures = pics;
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "listing Updated Successfully",
      updatedListing,
    });
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
  if (req.user.id !== findListing.userRef) {
    return next(errorHandler(401, "You can only delete your own listing!"));
  }

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

const getSingleListing = async (req, res, next) => {
  try {
    const listing = await Listing.findOne({ _id: req.params.id });
    console.log(listing, "value in listing");

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    return res.status(200).json(listing);
  } catch (error) {
    return next(error);
  }
};
const getListings = async (req, res, next) => {
  try {
    console.log("hello");
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res
      .status(200)
      .json({ success: true, message: "searched successfully", listings });
  } catch (error) {
    console.log(error);
  }
};
export {
  createListing,
  getListing,
  getMyListings,
  deleteListing,
  updateListing,
  getSingleListing,
  getListings,
};
