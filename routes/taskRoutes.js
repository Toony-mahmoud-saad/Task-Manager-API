const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const authintication = require("../middleware/authMiddleware");

router.post("/api/tasks/", authintication, taskController.craeteTask);
router.get("/api/tasks/:status", authintication, taskController.readListOfTasks);
router.get("/api/tasks/readTask/:id", authintication, taskController.readTask);
router.put("/api/tasks/:id", authintication, taskController.updateTask);
router.delete("/api/tasks/:id", authintication, taskController.deleteTask);


module.exports = router;

