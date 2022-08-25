const { logSuccess, createDatalog } = require('./logger');
const ApiError = require('../error/ApiError');
const { Author, Music } = require('../database/initdb');
const fs = require('fs');
const { Op } = require('sequelize');
const moment = require('moment');

class MusicController{
  async create(req,res,next){
    const {authorId} = req.body;
    const name = req.body.name.trim().toLowerCase();
    const datalog = createDatalog(req);
    const {files} = req.files;
    if (!files || !name || !authorId){
      next(ApiError.badRequest('нет файла или пустые поля', datalog));
      return;
    }
    const author = await Author.findByPk(authorId).catch(()=>{
      return null;
    });
    if (!author){
      next(ApiError.notFound('Не найден', datalog));
      return;
    }
    //  todo погуглить как инитить папку в папке
    if (!fs.existsSync('files')){
      fs.mkdirSync('files');
    }
    const dir = `files/${authorId}`;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    const path = `${dir}/${name}`;
    if (fs.existsSync( `${dir}/${name}`)) {
      next(ApiError.badRequest('создайте другое имя для файла', datalog));
      return;
    }
    files.mv(path);

    const newMusic = await Music.create({
      authorId,
      name,
      path
    });

    if (!newMusic){
      next(ApiError.badRequest('Ошибка создания', datalog));
      return;
    }

    logSuccess(datalog);
    return res.json(newMusic);
  }

  async getOne(){

  }

  async get(req,res,next){
    const {limit, offset, id, authorId, name, start, end} = req.query;
    const datalog = createDatalog(req);
    try {

      let musics;
      let idArray;
      let authoridArray;
      let query = {};
      if (id){
        idArray = id.split('&');
        query.id = {[Op.in]: idArray};
      }
  
      if (authorId){
        authoridArray = authorId.split('&');
        query.authorId = {[Op.in]: authoridArray};
        
      }
  
      if (name){
        query.name = {[Op.regexp]: name.trim().toLowerCase()};
        
      }
      if (start){
        query.createdAt = {[Op.gte]: moment(start).toDate()};
      }
      if (end){
        query.createdAt = {[Op.lte]: moment(end).toDate()};
      }
  
      musics = await Music.findAll({
        where: {...query},
        limit,
        offset,
        include: {
          model: Author,
          attributes: ['name', 'id']
        }
      });
      return res.send(musics);
    } catch (error) {
      next(ApiError.badRequest('Параметры фильтрации неверные', datalog));
      return;
    }
  }

  async delete(req,res, next){
    const {id} = req.params;
    const datalog = createDatalog(req);
    const {name} = await Music.findByPk(id, {attributes: ['name']});
    const result = await Music.destroy({
      where: {
        id
      }
    });
    if (result){
      logSuccess(datalog);
      fs.rmSync(`files/${id}/${name}`);
      return res.status(200).json('Удалено');
    }

    next(ApiError.notFound(`Не найден ${id}`, datalog));
    
    return;
  }
  async update(){
        
  }
}


module.exports = new MusicController();