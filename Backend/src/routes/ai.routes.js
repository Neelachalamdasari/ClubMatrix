const express = require("express");
const { askAssistant } = require("../controllers/ai.controller");
const protect = require("../middleware/auth.middleware");
const router = express.Router();
router.post("/ask", protect, askAssistant);
module.exports = router;