const createError = require("http-errors");
const _ = require("lodash");
const { Task } = require("../models");

const checkBody = (body) => _.pick(body, ["isDone", "deadline", "body"]);

module.exports.createUserTask = async (req, res, next) => {
  try {
    const { userInstance, body } = req;

    const values = checkBody(body);

    const task = await userInstance.createTask(values);

    if (!task) {
      return next(createError(400));
    }

    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance, pagination } = req;

    const tasks = await userInstance.getTasks({ ...pagination });

    if (!tasks.length) {
      return next(createError(400, "User without tasks"));
    }

    res.send({ data: tasks });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const { pagination = {} } = req;

    const tasks = await Task.findAll({ ...pagination });

    if (!tasks.length) {
      return next(createError(404, "Tasks not found"));
    }

    res.status(200).send({ data: tasks });
  } catch (err) {
    next(err);
  }
};

module.exports.getTask = async (req, res, next) => {
  try {
    const {
      body: { id },
    } = req;

    const task = await Task.findByPk(id);

    if (!task) {
      return next(createError(404, "Task not found"));
    }

    res.status(200).send({ data: task });
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

    const values = checkBody(body);

    const [rowsCount, [updatedTask]] = await Task.update(values, {
      where: { id },
      returning: true,
    });

    if (rowsCount !== 1) {
      return next(createError(400, "Task can't be updated"));
    }

    res.status(200).send({ data: updatedTask });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const rowsCount = await Task.destroy({
      where: { id },
    });

    if (!rowsCount) {
      return next(createError(404, "Task not found"));
    }

    res.status(200).send({ data: `${rowsCount} Task successfully deleted` });
  } catch (err) {
    next(err);
  }
};
