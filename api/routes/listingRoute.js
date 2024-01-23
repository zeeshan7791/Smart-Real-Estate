const express = require("express");
const {
  createListing,
  getListing,
  getMyListings,
  deleteListing,
} = require("../controller/listingController");
const router = express.Router();
const upload = require("../middleware/upload");
const { verifyToken } = require("../utils/verifyUser");

router.post(
  "/create-listing",
  verifyToken,
  upload.array("pictures"),
  createListing
);
router.post("/my-listing", getMyListings);
router.delete("/delete/:id", verifyToken, deleteListing);

module.exports = router;
