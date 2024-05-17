const { Router } = require("express");
const TaskController = require("../controller/task.controller");
const pagination = require("../middlewares/pagination.mw");
const { checkUser } = require("../middlewares/user.mw");

const taskRouter = Router();

taskRouter.get("/:id", checkUser, pagination, TaskController.getUserTasks);
// taskRouter.get('/:id', TaskController.getTask);
taskRouter.get("/", pagination, TaskController.getAllTasks);
taskRouter.post("/:id", checkUser, TaskController.createTask);
taskRouter.patch("/:id", TaskController.updateTask);
taskRouter.delete("/:id", TaskController.deleteTask);

module.exports = taskRouter;
