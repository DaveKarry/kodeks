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

    // findOrCreate нашел поздно, нужно исправить
    const newAuthor = await Author.create({
      name: name.trim().toLowerCase(),
      userId: id
    }).catch((err)=>{
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
    const authors = await Author.findAll({attributes: ['id','name']});
    const datalog = createDatalog(req);
    logSuccess(datalog);
    return res.json(authors);
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
      logSuccess(datalog);

      res.json(author);
    } else {
      next(ApiError.notFound('Не найден', datalog));
    }
    
    return;
  }

  async update(req,res, next){
    const {id} = req.params;
    const {name} = req.body;
    const datalog = createDatalog(req);
    const result = await Author.update({
      name: name.trim().toLowerCase()
    }, {
      where: { id },
      returning: true,
    }).catch((err)=>{
      if (err?.original?.code === '23505'){
        next(ApiError.badRequest('Уже существует музыкант', datalog));
      }else {
        next(ApiError.badRequest('Ошибка валидации', datalog));
      }
    });
    if (result){
      const [,[updated]] = result;
      if (updated){
        logSuccess(datalog);
        res.json(updated);
      }
      else {
        next(ApiError.notFound('Не найден', datalog));
      }
    }
    return;
  

  }

  async delete(req,res, next){
    const {id} = req.params;
    const datalog = createDatalog(req);

    const result = await Author.destroy({
      where: {
        id
      }
    });
    if (result){
      logSuccess(datalog);

      return res.status('200').json('Удалено');
    }

    next(ApiError.notFound(`Не найден ${id}`, datalog));
    
    return;
  }

}

module.exports = new AuthorController();