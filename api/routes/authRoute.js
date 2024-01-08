const express = require("express");
const { signUp, signIn, signOut } = require("../controller/authController");
const upload = require("../middleware/upload");
const router = express.Router();
router.post("/signup", upload.single("photo"), signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);
module.exports = router;
