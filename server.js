
let listeDesMots = [
"Canard",
"Vache",
"Chat",
"Pompiers",
"Maison",
"Immeuble",
"Voiture",
"Camion",
"Ile",
"Plage",
"Coquillage",
"Coquillette",
"Spaghetti",
"Fleur",
"Telephone",
"Enveloppe",
"Nenuphar",
"Hexagone",
"Pyramide",
"Escarpin",
"Escalator",
"Escalier",
"Escargot",
"Lierre",
"Vase",
"Antenne",
"Surfeur",
"Bouton",
"Fauteuil",
"Clavier",
"Autoradio",
"Tournevis",
"Punaise",
"Lumiere",
"Horloge",
"Pedalo",
"Tennis",
"Football",
"Golf",
"Avion",
"Barque",
"Rame",
"Etang",
"Lac",
"Parachute",
"Deltaplane",
"Elastique",
"Ours",
]

let scoreGagne = 0;
let scorePerdu = 0;

const PORT = 9001;
const express = require('express');
const session	=	require('express-session');
const app = express();
const http = require('http');
const socketIo = require('socket.io');

app.use('/',express.static(__dirname + '/app'));

//app.listen(PORT);



let server = http.createServer(app);
let io = socketIo.listen(server);
server.listen(9000);

let point_history = [];

// event-handler for new incoming connections
io.on('connection', function (socket) {
  // first send the history to the new client
  for (var i in point_history) {
    socket.emit('point', point_history[i] );
  }

  // Reception d'un point
  socket.on('Point', function (data) {
    // add received line to history
    console.log("data Debut");
    console.log(data);
    console.log("data Fin");
    if (data != "Gagné" && data != "Perdu") {
      point_history.push(data);
    }
    // send line to all clients
    io.emit('Point', data);
  });

  socket.on('Mot', function () {

     io.emit('Mot', listeDesMots[Math.floor(Math.random() * (listeDesMots.length - 1 +1)) + 1]);
  });

  socket.on('Perdu', function () {
    scorePerdu += 1;
    console.log("scorePerdu = " + scorePerdu);
    io.emit('Perdu', scorePerdu);
  });

  socket.on('Gagne', function () {
    scoreGagne += 1;
    console.log("scoreGagne = " + scoreGagne);
    io.emit('Gagne', scoreGagne);
  });

  socket.on('InitScore', function () {
    scoreGagne = 0;
    scorePerdu = 0;
    console.log("scoreGagne = " + scoreGagne);
    io.emit('Gagne', scoreGagne);
    io.emit('Perdu', scorePerdu);
  });

  socket.on('InitCompteurTemps', function () {
    io.emit('InitCompteurTemps', scoreGagne);
  });

  socket.on('InverserActeur', function () {
    io.emit('InverserActeur');
  });

});


console.log(`-----------------------------
| The root folder is: '${__dirname}/app'
| You can access the application at: http://localhost:${PORT}
------------------------------------------`);
