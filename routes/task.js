const { Router } = require('express');
const TaskController = require('../controller/task.controller');
const pagination = require('../middlewares/pagination.mw');
const { checkUser } = require('../middlewares/user.mw');

const taskRouter = Router();

taskRouter.get('/:id', checkUser, pagination, TaskController.getUserTasks);
// taskRouter.get('/:taskId', TaskController.getTask);
taskRouter.get('/', pagination, TaskController.getAllTasks);
taskRouter.post('/:id', checkUser, TaskController.createTask);
taskRouter.patch('/:taskId', TaskController.updateTask);
taskRouter.delete('/:taskId', TaskController.deleteTask);

module.exports = taskRouter;
