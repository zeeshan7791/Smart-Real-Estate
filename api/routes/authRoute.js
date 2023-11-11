const express = require("express");
const { signUp, signIn, signOut } = require("../controller/authController");

const router = express.Router();
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);
module.exports = router;
