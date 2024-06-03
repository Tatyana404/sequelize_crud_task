const { Router } = require("express");
const TaskController = require("../controller/task.controller");
const pagination = require("../middlewares/pagination.mw");

const taskRouter = Router();

taskRouter.get("/", pagination, TaskController.getAllTasks);
taskRouter.delete("/:id", TaskController.deleteTask);
taskRouter.patch("/:id", TaskController.updateTask);
taskRouter.get('/:id', TaskController.getTask);

module.exports = taskRouter;
