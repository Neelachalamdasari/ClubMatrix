const express = require("express");
const {
  createAnnouncement,
  getClubAnnouncements,
  updateAnnouncement,
  deleteAnnouncement
} = require("../controllers/announcement.controller");
const protect = require("../middleware/auth.middleware");
const { coordinatorOnly } = require("../middleware/role.middleware");
const router = express.Router();
router.post("/create/:clubId", protect, coordinatorOnly, createAnnouncement);
router.put("/update/:announcementId", protect, updateAnnouncement);
router.delete("/delete/:announcementId", protect, deleteAnnouncement);
router.get("/:clubId", protect, getClubAnnouncements);
module.exports = router;