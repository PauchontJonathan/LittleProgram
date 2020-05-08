const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const api = "/api/v1/";

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//Middlewares
const usersRoute = require('./routes/users');

app.use(`${api}users`, usersRoute)


mongoose.connect(
  process.env.DB_CONNECT,
  {useUnifiedTopology: true, useNewUrlParser: true},
  err=>{
    if(err){
        console.error(err)
    }else {
        console.log('it worked !');
    }
});


//Listening to port 8000
app.listen(8000);