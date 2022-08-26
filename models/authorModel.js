const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  return sequelize.define('author', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notIn:[['monetochka', 'монеточка']],
        notEmpty: true
      }
    }
  });
};