
// Faire sur NodeJS pour que le server.js se reexecute automatiquement à chaque modification

// +------------------------+
// | npm install -g nodemon |
// | nodemon server.js      |
// +------------------------+

const PORT = 9000;
const express = require('express');
const WebSocketServer = require("ws").Server;
ws = new WebSocketServer( { port: 9000 } );

const app = express();

app.use('/',express.static(__dirname + '/app'));

app.listen(PORT);

console.log(`-----------------------------
| The root folder is: '${__dirname}/app'
| You can access the application at: http://localhost:${PORT}
------------------------------------------`);

ws.on('connection', function (ws) {
  console.log("Browser connected online...")

  ws.on("message", function (str) {
    var ob = JSON.parse(str);
    let data = JSON.stringify(ob);
    ws.send(data);
  })

  ws.on("close", function() {
    console.log("Browser gone.")
  })
});
