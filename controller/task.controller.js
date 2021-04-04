const { Task } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;

    // const task = await Task.create({ ...body, userId: id });
    const task = await userInstance.createTask(body);

    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance } = req;

    const tasks = await userInstance.getTasks();

    res.send({ data: tasks });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTask = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const task = await Task.findByPk(id);
    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const users = await Task.findAll();
    res.status(200).send({
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const [rowsCount, [updatedTask]] = await Task.update(body, {
      where: { id },
      returning: true,
    });
    res.send({ data: updatedTask });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTasc = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const task = await Task.findByPk(id);

    const result = await task.destroy();
    console.log(result);
    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};
