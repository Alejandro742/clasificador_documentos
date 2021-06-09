
module.exports = app => {
    const uploadsController = require('../controllers/uploads.controller');
    const multer = require('multer');
    const fs = require('fs');
    const path = require('path');
    const db = require('../db');

    const storage = multer.diskStorage({
        destination: async(req,file,cb) => {
          let url_file = '';
          let query = await db.query("SELECT url FROM files_copy1 WHERE originalName = ?",[file.originalname]);
          if(query.length!==0){
            url_file = query[0].url;
            
          }else{
            url_file = 'no_encontrados'
          }
          let path_to_save = 'public/'+url_file;
          fs.mkdirSync(path_to_save, { recursive: true })
          cb(null,path_to_save);
        },
        filename: async(req, file, cb) => {
          let url_file = '';
          let query = await db.query("SELECT url FROM files_copy1 WHERE originalName = ?",[file.originalname]);
          if(query.length!==0){
            url_file = query[0].url;
            let url_split = url_file.split('/');
            url_file = url_split[url_split.length - 1];
            console.log(url_file);
          }else{
            url_file = file.originalname
          }
          cb(null,url_file);
      }
      });
      const upload = multer({ storage: storage });
  
    app.get('/api/prueba',uploadsController.prueba);
    app.post('/api/uploads',upload.array('file[]',5),uploadsController.uploadFiles);
  };