const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv= require('dotenv');
const connectDB = require('./config/db');
const app = express();

app.use(morgan('dev'));

app.use(express.json({}));
app.use(express.json({
    extended:true
}));

dotenv.config({
    path: './config/config.env'
});

connectDB();

// https://localhost:3000/api/todo/auth/register //put the name server here

app.use('/api/todo/auth',require('./routes/user'));

app.get('/todo',(req,res)=>{
    res.status(200).json({
        "name":"Frioz",
        

    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,
    console.log(`Server run on port: ${PORT}`.blue.underline.bold));