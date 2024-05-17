const createError = require("http-errors");
const _ = require("lodash");
const { Task } = require("../models");

const checkBody = (body) => _.pick(body, ["isDone", "deadline", "body"]);

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;

    const values = checkBody(body);
    // const task = await Task.create({ ...body, userId: id });
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
    const { userInstance: user, pagination } = req;

    const tasks = await user.getTasks({ ...pagination });

    if (!tasks.length) {
      return next(createError(400, "User without tasks"));
    }

    res.send({ data: tasks });
  } catch (err) {
    next(err);
  }
};

// module.exports.getTask = async (req, res, next) => {
//   try {
//     const {
//       body: { id },
//     } = req;
//     const task = await Task.findByPk(id);

//     if (!task) {
//       const err = createError(404, 'Task not found');
//       return next(err);
//     }

//     res.status(200).send(task);
//   } catch (err) {
//     next(err);
//   }
// };

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const tasks = await Task.findAll({ ...pagination });

    if (!tasks) {
      const err = createError(404, "Tasks have not been created yet");

      return next(err);
    }

    res.status(200).send({
      data: tasks,
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

    const values = checkBody(body);

    const [, [updatedTask]] = await Task.update(values, {
      where: { id },
      returning: true,
    });

    if (!updatedTask) {
      return next(createError(400));
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
      return next(createError(404, "There is no such task"));
    }

    res.status(200).send({ data: `${rowsCount} Task successfully deleted` });
  } catch (err) {
    next(err);
  }
};
