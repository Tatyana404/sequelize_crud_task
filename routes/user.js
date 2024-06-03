const { Router } = require("express");
const UserController = require("../controller/user.controller");
const pagination = require("../middlewares/pagination.mw");

const userRouter = Router();

userRouter.get("/", pagination, UserController.getAllUsers);
userRouter.delete("/:id", UserController.deleteUser);
userRouter.patch("/:id", UserController.updateUser);
userRouter.post("/", UserController.createUser);
userRouter.get("/:id", UserController.getUser);

module.exports = userRouter;
