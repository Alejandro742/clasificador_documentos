const mysql = require('mysql');
const {promisify} = require('util')
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

connection.getConnection((err,connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection was closes');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has yo many connections');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    if(connection) connection.release();
    console.log('DB is conncected');
    return;
});
connection.query = promisify(connection.query);//cada vez que se haga una llamada a db se podrá usar promesas
module.exports = connection;