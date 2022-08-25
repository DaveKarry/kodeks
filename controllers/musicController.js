const { logSuccess, createDatalog } = require('./logger');
const ApiError = require('../error/ApiError');
const { Author } = require('../database/initdb');
var fs = require('fs');


class MusicController{
  async create(req,res,next){
    const {authorId} = req.body;
    const datalog = createDatalog(req);
    const {files} = req;
    const author = await Author.findByPk(authorId).catch(()=>{
      return null;
    });
    if (!author){
      next(ApiError.badRequest('Не найден', datalog));
      return;
    }
    const filepath = `/files/${authorId}`;
    const buffer = Buffer.from(files.files.path);
    fs.createWriteStream(filepath).write(buffer);
    
    res.json('ok');
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