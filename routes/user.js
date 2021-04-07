const { Router } = require('express');
const UserController = require('../controller/user.controller');
const paginations = require('../middlewares/pagination.mw');

const userRouter = Router();

userRouter.get('/', paginations, UserController.getAllUsers);
userRouter.get('/:userId', UserController.getUser);
userRouter.post('/', UserController.createUser);
userRouter.patch('/:userId', UserController.updateUser);
userRouter.delete('/:userId', UserController.deleteUser);

module.exports = userRouter;
