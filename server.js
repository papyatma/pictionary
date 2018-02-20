
// Faire sur NodeJS pour que le server.js se reexecute automatiquement à chaque modification

// +------------------------+
// | npm install -g nodemon |
// | nodemon server.js      |
// +------------------------+

const PORT = 9000;
const express = require('express');
const session	=	require('express-session');
const app = express();
const http = require('http');
const socketIo = require('socket.io');

app.use(session({secret: 'LdfsfhKirbfg',saveUninitialized: true,resave: true}));

app.use('/',express.static(__dirname + '/app'));

const bodyParser=require('body-parser');

const authenticateController=require('./controllers/authenticate-controller');
const registerController=require('./controllers/register-controller');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/* route to handle login and registration */
app.post('/register',registerController.register);
app.post('/authenticate',authenticateController.authenticate);

app.get('/api/game',function(req,res){
  //console.log('jeu');

  if (!req.session || !req.session.authenticated) {
    res.status(403).end('Forbidden');
  }
  res.json(req.session.results);

});

//app.listen(PORT);

let server = http.createServer(app);
let io = socketIo.listen(server);
server.listen(9000);

let line_history = [];

// event-handler for new incoming connections
io.on('connection', function (socket) {

   // first send the history to the new client
   for (var i in line_history) {
      socket.emit('draw_line', { line: line_history[i] } );
   }

   // add handler for message type "draw_line".
   socket.on('draw_line', function (data) {
      // add received line to history
      line_history.push(data.line);
      // send line to all clients
      io.emit('draw_line', { line: data.line });
   });
});


console.log(`-----------------------------
| The root folder is: '${__dirname}/app'
| You can access the application at: http://localhost:${PORT}
------------------------------------------`);
