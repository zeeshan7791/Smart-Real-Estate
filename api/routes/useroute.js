const express = require("express");
const { getUser, updateUser } = require("../controller/userController");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();

router.get("/test", getUser);
router.post("/update/:id", verifyToken, updateUser);
module.exports = router;
