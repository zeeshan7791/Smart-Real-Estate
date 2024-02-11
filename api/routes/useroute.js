const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const upload = require("../middleware/upload");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();

router.post("/update/:id", verifyToken, upload.single("photo"), updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser);

module.exports = router;
