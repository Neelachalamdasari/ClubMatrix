const express = require("express");
const {
  createTask,
  getClubTasks,
  getMyTasks,
  updateTaskStatus,
  updateTask,
  deleteTask
} = require("../controllers/task.controller");
const protect = require("../middleware/auth.middleware");
const { coordinatorOnly } = require("../middleware/role.middleware");
const router = express.Router();

router.post("/create/:clubId", protect, coordinatorOnly, createTask);
router.get("/my", protect, getMyTasks);
router.get("/:clubId", protect, getClubTasks);
router.put("/update/:taskId", protect, updateTask);
router.put("/status/:taskId", protect, updateTaskStatus);
router.delete("/delete/:taskId", protect, deleteTask);

module.exports = router;