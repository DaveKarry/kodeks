const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const { Author } = require('../database/initdb');
const { logSuccess, createDatalog } = require('./logger');

class AuthorController{

  async create(req,res, next){
    const {name} = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const {id} = jwt.verify(token, process.env.SECRET_KEY);

    const datalog = createDatalog(req);

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