const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../database/initdb');
const ApiError = require('../error/ApiError');

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
    if (!login||!password){
      return next(ApiError.badRequest('Пустые поля'));
    }
    const candidate = await User.findOne({where: {login}});
    if (candidate){
      return next(ApiError.badRequest('Пользователь с такой почтой зарегистрирован'));
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({login, password: hashPassword}).catch(()=>{
      next(ApiError.badRequest('Ошибка валидации'));
    });
    if (user){
      const token = generateJWT(user.id, login);
      res.json({token});
    }
    return;

  }


  async login(req,res, next){
    const {login, password} = req.body;
    const user = await User.findOne({where: {login}});
    if(!user){
      return next(ApiError.badRequest('Нет пользователя с такой почтой'));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword){
      return next(ApiError.badRequest('Пароль неверный'));
    }
    const token = generateJWT(user.id, login);
    return res.json({token});
  }
}

module.exports = new UserController();
