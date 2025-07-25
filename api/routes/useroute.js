import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import upload from "../middleware/upload.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyToken, upload.single("photo"), updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser);

export default router;
