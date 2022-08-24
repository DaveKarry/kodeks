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
      validate: {
        // /\/\онеточка не пройдет
        isAlpha: true,
        isLowercase: true,
        notEmpty: true,
        isMonetochka(value) {
          if (value === 'monetocka') {
            // throw ApiError.badRequest('Ошибка валидации', datalog)
            throw new Error({code: '6000', message: 'no monetocka'});
          }
        }
      }
    }
  });
};