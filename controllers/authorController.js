const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const { Author } = require('../database/initdb');
const { logSuccess } = require('./logger');

class AuthorController{

  async create(req,res, next){
    const {name} = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const {login, id} = jwt.verify(token, process.env.SECRET_KEY);

    const datalog = {
      ip,
      login,
      request: req.originalUrl
    };

    if (!name) {
      return next(ApiError.badRequest('Пустые поля', datalog));
    }
    const newAuthor = await Author.create({name, userId: id}).catch((err)=>{
      // Дупликат
      if (err?.original?.code === '23505'){
        next(ApiError.badRequest('Уже существует музыкант', datalog));
      }else {
        next(ApiError.internal('Ошибка валидации', datalog));
      }
    });
    if (newAuthor){
      logSuccess(datalog);
      res.json({newAuthor});
    }
    return;

  }

  async get(req,res){
    
  }

  async update(req,res){

  }

  async delete(req,res){

  }

  async getOne(req,res){

  }
}

module.exports = new AuthorController();