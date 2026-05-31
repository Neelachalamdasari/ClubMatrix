const express = require("express");
const {
  createEvent,
  getClubEvents,
  updateEvent,
  deleteEvent,
  getUpcomingEvents
} = require("../controllers/event.controller");
const protect = require("../middleware/auth.middleware");
const { coordinatorOnly } = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");
const router = express.Router();

router.post("/create/:clubId", protect, coordinatorOnly, upload.single("poster"), createEvent);
router.put("/update/:eventId",protect,upload.single("poster"),updateEvent);
router.delete("/delete/:eventId", protect, deleteEvent);
router.get("/upcoming/all", protect, getUpcomingEvents);
router.get("/:clubId", protect, getClubEvents);

module.exports = router;