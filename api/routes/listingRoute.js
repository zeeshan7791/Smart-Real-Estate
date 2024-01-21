const express = require("express");
const {
  createListing,
  getListing,
  getMyListings,
} = require("../controller/listingController");
const router = express.Router();
const upload = require("../middleware/upload");

router.post("/create-listing", upload.array("pictures"), createListing);
router.get("/get-listing", getListing);
router.post("/my-listing", getMyListings);

module.exports = router;
