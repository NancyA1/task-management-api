const express = require("express");

const taskController = require("../controllers/taskController");

const router = express.Router();


router.get("/:id", taskController.getTaskById);
router.put("/:id",taskController.updateTask);

module.exports = router;