const db = require('../db');

exports.prueba = async (req,res) => {
    let data = await db.query("SELECT * FROM areas");
    console.log(data);
};

exports.uploadFiles = async (req,res) => {
    console.log(req.files);
    // let data = await db.query("SELECT * FROM areas");
    // console.log(data);
};