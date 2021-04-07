const createError = require('http-errors');
const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);

    if (!createdUser) {
      return next(createError(400));
    }

    res.status(201).send({
      data: createdUser,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
      ...pagination,
    });

    if (!users.length) {
      return next(createError(404, 'Users not found'));
    }

    res.status(200).send({
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      const err = createError(404, 'User not found');
      return next(err);
    }

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
      body,
    } = req;

    const [count, [updatedUser]] = await User.update(body, {
      where: { userId },
      returning: true,
    });

    if (rowsCount !== 1) {
      return next(createError(400, 'User cant be updated'));
    }

    // delete updatedUser.password;
    updatedUser.password = undefined;

    res.status(200).send({ data: updatedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const rowsCount = await User.destroy({
      where: { id: userId },
    });

    if (!rowsCount) {
      return next(createError(404, 'User not found'));
    }

    res.status(200).send({ data: `${rowsCount} User successfully deleted` });
  } catch (err) {
    next(err);
  }
};
