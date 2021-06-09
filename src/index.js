require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require("cors");

const app = express();


app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("./routes/uploads.routes.js")(app);


app.use('/statics',express.static('public'));

app.listen(process.env.PORT || 3000,()=>{
    console.log("Listen on port "+ process.env.PORT +" Toroooooo");
});