const express = require("express");
const {
  createListing,
  getMyListings,
  deleteListing,
  updateListing,
  getSingleListing,
} = require("../controller/listingController");
const router = express.Router();
const upload = require("../middleware/upload");
const { verifyToken } = require("../utils/verifyUser");

router.post(
  "/create-listing",

  upload.array("pictures"),
  createListing
);
router.post("/my-listing", getMyListings);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post(
  "/update/:id",
  upload.array("pictures"),
  verifyToken,
  updateListing
);
router.get("/getListing/:id", getSingleListing);

module.exports = router;
