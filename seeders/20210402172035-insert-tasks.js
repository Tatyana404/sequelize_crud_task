"use strict";

const _ = require("lodash");
const { User } = require("../models");

module.exports = {
  up: async (queryInterface) => {
    const users = await User.findAll({
      attributes: ["id"],
    });

    const tasks = users
      .map((u) =>
        new Array(_.random(1, 10, false)).fill(null).map((_, i) => ({
          user_id: u.id,
          body: `TestBody${i}`,
          created_at: new Date(),
          updated_at: new Date(),
        }))
      )
      .flat(2);

    queryInterface.bulkInsert("tasks", tasks, {});
  },
};
