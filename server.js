
// Faire sur NodeJS pour que le server.js se reexecute automatiquement à chaque modification

// +------------------------+
// | npm install -g nodemon |
// | nodemon server.js      |
// +------------------------+

// modules
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 9000;

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/', express.static(__dirname + '/app'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  console.log("server OK");
});

http.listen(PORT, function(){
  console.log('listening on :' + PORT);
});

io.on('connection', function(socket) {
  socket.on('Point', function(point) {
    console.log('message recu au serveur: ', point);
    io.send(point);
  });
});
