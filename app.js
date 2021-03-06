var http = require('http');
var express = require('express');
var socket = require('socket.io');

_PORT=8080;
var app = express();

var server = http.createServer(app).listen(( _PORT), function(){
  console.log("Server on http://localhost:" + _PORT);
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

app.get('/', function(request, response){

    console.log(request.body.name);
});

//Websockets
var io = socket.listen(server);
//Configure socket.io
io.configure(function(){
  io.disable('log');
});

//Init sockets
io.sockets.on('connection', function(socket){

  socket.on('init_index', function(data){
    if(data === 1){console.log('Index open');}
    else {console.log('index not connected');}
    io.sockets.emit('mensaje', 1);
});

  socket.on('init_app', function(data){
    if(data === 1){console.log('App open');}
    else {console.log('not connected to the App');}
    });

  socket.on('imageData', function(imageData){
    //console.log(imageData + "<--imageData"); 
    io.sockets.emit('base', imageData);
  }); 

  //Receiving and sending geolocation
  socket.on('geolocation', function(latitude, longitude, timestamp) {
    //console.log('Lat: ' + latitude + '--' + 'Long: ' + longitude);
    io.sockets.emit('geo', latitude, longitude, timestamp);
  });

});//End io.socket.on
