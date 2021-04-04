const { Task } = require('../models');

module.exports.paginations = async (req, res, next) => {
  try {
    const limitTask = await Task.limit(10);
    if (limitTask > 10) {
      throw new Error('Limit is exceeded');
    }
    req.limitTask = limitTask;
    next();
  } catch (err) {
    next(err);
  }
};
