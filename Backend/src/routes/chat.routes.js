const express = require("express");
const { getClubMessages } = require("../controllers/chat.controller");
const protect = require("../middleware/auth.middleware");
const router = express.Router();
router.get("/:clubId", protect, getClubMessages);
module.exports = router;