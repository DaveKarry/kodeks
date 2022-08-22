const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  return sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    login: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        unique: true,
        notEmpty: true,
        isLowercase: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};