const express = require("express");
const { getNotifications, markAsRead } = require("../controllers/notification.controller");
const protect = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/", protect, getNotifications);
router.put("/read/:notificationId", protect, markAsRead);

module.exports = router;