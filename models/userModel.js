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
      allowNull: false,
      unique: true,
      isLowercase: true,
      notEmpty: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};