const express = require("express");
const upload = require("../middleware/upload.middleware");
const {
  createClub,
  getAllClubs,
  getSingleClub,
  joinClub,
  getJoinedClubs
} = require("../controllers/club.controller");
const protect = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/create", protect, upload.single("clubImage"), createClub);
router.get("/joined", protect, getJoinedClubs);
router.get("/all", protect, getAllClubs);
router.get("/:clubId", protect, getSingleClub);
router.put("/join/:clubId", protect, joinClub);

module.exports = router;