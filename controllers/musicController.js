const { logSuccess, createDatalog } = require('./logger');
const ApiError = require('../error/ApiError');
const { Author, Music } = require('../database/initdb');
var fs = require('fs');


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

  async get(){

  }

  async delete(){

  }
  async update(){
        
  }
}


module.exports = new MusicController();