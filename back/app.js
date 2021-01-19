const express = require('express');
const app = express();
const http = require('http').Server(app)
const mongoose = require('mongoose');
require('dotenv/config');
const api = "/api/v1/";
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
})
const handleSocketMessage = require('./socket/singleMessage')
const handleSocketUser = require ('./socket/users')

//Connection to DB
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
mongoose.set('useFindAndModify', false);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Import Routes
const roomRoute = require('./routes/room');
const messagesRoute = require('./routes/messages');
const sessionsRoute = require('./routes/sessions');
const usersRoute = require('./routes/users');

app.use("/static", express.static('public/avatar'));

//Middlewares
app.use(`${api}users`, usersRoute)
app.use(`${api}messages`, messagesRoute)
app.use(`${api}sessions`, sessionsRoute)
app.use(`${api}room`, roomRoute)


//Socket
io.on('connection', (socket) => {
   socket.on('sendMessage', (userMessage) => {
    handleSocketMessage.sendMessage(userMessage)
    const { singleMessage } = handleSocketMessage
    io.local.emit('getMessage', singleMessage)
  })
   socket.on('setUser', () => {
    const connected = handleSocketUser.connectUser()
    socket.broadcast.emit('loadIsConnectedUser', connected) 
  })
   socket.on('unsetUser', () => {
    const connected = handleSocketUser.disconnectUser()
     socket.broadcast.emit('loadIsConnectedUser', connected)
  })
   socket.on('unset', () => {
     socket.disconnect()
  })
})

//Listening to port 8000
http.listen(8000);