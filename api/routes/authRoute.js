import express from "express";
import { signUp, signIn, signOut } from "../controller/authController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/signup", upload.single("photo"), signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

export default router;
