const express = require("express");
const { createListing } = require("../controller/listingController");
const router = express.Router();
const upload = require("../middleware/upload");

router.post("/create-listing", upload.array("pictures"), createListing);

module.exports = router;
