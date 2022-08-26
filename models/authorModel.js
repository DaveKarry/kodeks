const { Sequelize, DataTypes } = require('sequelize');
const levenshtein = require('fast-levenshtein');


function tokenesation(str){
  const res = ['monetochka', 'монеточка'].map((a)=>{
    return levenshtein.get(str, a);
  }).sort((a,b)=>{
    return a-b;
  })[0];

  if (res<=3){
    return null;
  }
  return res;
}


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
        notEmpty: true,
        isMonetochka(value) {
          const res = tokenesation(value);
          let ru = 0;
          let en = 0;
          for (const str of value) {
            if (str.match(/[a-z]/i)){
              en+=1;
            }
          }
          for (const str of value) {
            if (str.match(/[а-я]/i)){
              ru+=1;
            }
          }
          if (!res || (ru & en)) {
            // throw ApiError.badRequest('Ошибка валидации', datalog)
            throw new Error({code: '6000', message: 'no monetocka'});
          }
        }
      },
      
    }
  });
};