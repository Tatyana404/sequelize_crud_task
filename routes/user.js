const { Router } = require("express");
const UserController = require("../controller/user.controller");
const TaskController = require("../controller/task.controller");
const pagination = require("../middlewares/pagination.mw");
const { checkUser } = require("../middlewares/user.mw");

const userRouter = Router();

userRouter.get("/:id/tasks", checkUser, pagination, TaskController.getUserTasks);
userRouter.post("/:id/task", checkUser, TaskController.createUserTask)
userRouter.get("/", pagination, UserController.getAllUsers);
userRouter.delete("/:id", UserController.deleteUser);
userRouter.patch("/:id", UserController.updateUser);
userRouter.post("/", UserController.createUser);
userRouter.get("/:id", UserController.getUser);

module.exports = userRouter;
