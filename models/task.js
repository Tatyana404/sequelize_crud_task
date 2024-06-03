"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: "userId",
      }); // UserId | userId -> user_id
    }
  }
  Task.init(
    {
      body: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      /*  userId:{
        //......
      }, */
      isDone: {
        field: "is_done",
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        validate: {
          notNull: true,
        },
      },
      deadline: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "tasks",
      underscored: true,
    }
  );

  return Task;
};
