const { Router } = require("express");
const UserController = require("../controller/user.controller");
const pagination = require("../middlewares/pagination.mw");

const userRouter = Router();

userRouter.get("/", pagination, UserController.getAllUsers);
userRouter.get("/:id", UserController.getUser);
userRouter.post("/", UserController.createUser);
userRouter.patch("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);

module.exports = userRouter;
