const { Router } = require("express");
const TaskController = require("../controller/task.controller");
const pagination = require("../middlewares/pagination.mw");
const { checkUser } = require("../middlewares/user.mw");

const taskRouter = Router();

taskRouter.get("/:id", checkUser, pagination, TaskController.getUserTasks);
taskRouter.post("/:id", checkUser, TaskController.createTask);
taskRouter.get("/", pagination, TaskController.getAllTasks);
taskRouter.delete("/:id", TaskController.deleteTask);
taskRouter.patch("/:id", TaskController.updateTask);
taskRouter.get('/:id', TaskController.getTask);

module.exports = taskRouter;
