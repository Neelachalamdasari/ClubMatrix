const express = require("express");
const { createResource, getClubResources, updateResource, deleteResource } = require("../controllers/resource.controller");
const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const router = express.Router();

router.post("/create/:clubId", protect, upload.single("resourceFile"), createResource);
router.put("/update/:resourceId", protect, updateResource);
router.delete("/delete/:resourceId", protect, deleteResource);
router.get("/:clubId", protect, getClubResources);

module.exports = router;