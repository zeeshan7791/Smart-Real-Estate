const express = require("express");
const { createListing } = require("../controller/listingController");
const router = express.Router();

router.post("/create-listing", createListing);

module.exports = router;
