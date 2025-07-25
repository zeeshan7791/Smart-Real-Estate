import express from "express";
import {
  createListing,
  getMyListings,
  deleteListing,
  updateListing,
  getSingleListing,
  getListings,
} from "../controller/listingController.js";
import upload from "../middleware/upload.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create-listing", upload.array("pictures"), createListing);
router.post("/my-listing", getMyListings);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", upload.array("pictures"), verifyToken, updateListing);
router.get("/getListing/:id", getSingleListing);
router.get("/get", getListings);

export default router;
