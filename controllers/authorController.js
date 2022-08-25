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
        next(ApiError.badRequest('Ошибка валидации', datalog));
      }
    });
    if (newAuthor){
      logSuccess(datalog);
      res.json({newAuthor});
    }
    return;

  }
  async getAll(req,res){
    res.send('не то');
  }


  async getOne(req,res, next){
    const {id} = req.params;
    const datalog = createDatalog(req);

    const author = await Author.findByPk(id).catch(()=>{
      return 'invalid';
    });
    if (author=='invalid'){
      next(ApiError.badRequest('Ошибка неверный формат id', datalog));
      return;
    }
    if (author){
      res.json(author);
    } else {
      next(ApiError.notFound('Не найден', datalog));
    }
    
    return;
  }

  async update(req,res){

  }

  async delete(req,res){

  }

}

module.exports = new AuthorController();