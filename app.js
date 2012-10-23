var http = require('http');
var express = require('express');
var socket = require('socket.io');

var app = express();

var server = http.createServer(app).listen((8080), function(){
  console.log("Server on http://localhost:8080");
});

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.get('/camera.html', function(req, res){
  res.sendfile(__dirname + '/camera.html');
});

app.get('/cordova-2.0.0.js', function(req, res){
  res.sendfile(__dirname + '/cordova-2.0.0.js');
});

//Websockets
var io = socket.listen(server);
io.sockets.on('connection', function(socket){

  socket.on('init_app', function(data){
    if(data === 1){console.log('App open');}
    else {console.log('not connected to the App');}
    });

  socket.on('imageData', function(imageData){
    console.log(imageData + "<--imageData"); 
    io.sockets.emit('base', imageData);
  }); 
  
  socket.on('init_index', function(data){
    if(data === 1){console.log('Index open');}
    else {console.log('index not connected');}
    io.sockets.emit('mensaje', 1);
  });

});//End io.socket.on
