const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../database/initdb');
const ApiError = require('../error/ApiError');
const {logSuccess} = require('../controllers/logger');

const generateJWT = (id, login) =>{
  return jwt.sign(
    {id: id, login },
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  );
};

class UserController{
  async registration(req,res, next){
    const {login, password} = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const datalog = {
      ip,
      login,
      request: req.originalUrl
    };
    if (!login||!password){
      return next(ApiError.badRequest('Пустые поля', datalog));
    }
    const candidate = await User.findOne({where: {login}});
    if (candidate){
      return next(ApiError.badRequest('Пользователь с такой почтой зарегистрирован', datalog));
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({login, password: hashPassword}).catch(()=>{
      next(ApiError.badRequest('Ошибка валидации', datalog));
    });
    if (user){
      logSuccess(datalog);

      const token = generateJWT(user.id, login);
      res.json({token});
    }
    return;

  }


  async login(req,res, next){
    const {login, password} = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const datalog = {
      ip,
      login,
      request: req.originalUrl
    };

    const user = await User.findOne({where: {login}});
    if(!user){
      return next(ApiError.notFound('Нет пользователя с такой почтой', datalog));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword){
      return next(ApiError.badRequest('Пароль неверный', datalog));
    }
    const token = generateJWT(user.id, login);
    logSuccess(datalog);
    return res.json({token});
  }
}

module.exports = new UserController();
