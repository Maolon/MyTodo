"use strict";
const express = require("express");
const Router = express.Router;

const router = Router();

let task = require("../controllers/taskController");
const Auth = require("../controllers/Auth");
// todoList Routes
router
  .route("/v1/tasks")
  .get(Auth.authMiddleware,task.list_all_tasks)
  .post(Auth.authMiddleware,task.create_a_task);

router
  .route("/v1/tasks/:taskId")
  .get(Auth.authMiddleware,task.read_a_task)
  .put(Auth.authMiddleware,task.update_a_task)
  .delete(Auth.authMiddleware,task.delete_a_task);

module.exports = router;
