const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  return sequelize.define('music', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isLowercase: true,
      }
    },
    path: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name']
      },
    ]
  });
};