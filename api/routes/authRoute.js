const express = require("express");
const { signUp, signIn } = require("../controller/authController");

const router = express.Router();
router.post("/signup", signUp);
router.post("/sigin", signIn);
module.exports = router;
