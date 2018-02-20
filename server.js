
// Faire sur NodeJS pour que le server.js se reexecute automatiquement à chaque modification

// +------------------------+
// | npm install -g nodemon |
// | nodemon server.js      |
// +------------------------+

const PORT = 9000;
const express = require('express');
const mysql  = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(
	'/',
	express.static(__dirname + '/app')
);

app.use(
	'/node_modules',
	express.static(__dirname + '/node_modules')
	
);


let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0000',
  database : 'pictionarytrue'
});

module.exports = connection;

connection.connect();

/** INSERONS LES DONNEES DANS PLAYERS**/

app.post('/insert/players', function(req, res)
{
  let valuePlayer = 
  {
     'username': req.body.username,
     'email': req.body.email,
     'password': req.body.password,
     'compteurwin': req.body.compteurwin,
     'compteurlost': req.body.compteurlost,
  };
    let sql  = 'INSERT INTO players SET?';

    console.log(valuePlayer);

    connection.query(sql,valuePlayer, function(err){
       if(err){
           res.json({"Error": true, "Message": err});
       } else {
           res.json({"Error": false, "Message": "Success"})
       }
    });
});

/** INSERONS LES DONNEES DANS PARITE**/

app.post('/insert/partie', function(req, res)
{
	let valuePartie = 
	{
     "idplayers01": req.body.idplayers01,
     "idplayers02": req.body.idplayers02,
     "roleplayers": req.body.roleplayers
	};

    let sql  = 'INSERT INTO partie SET?';
    console.log( valuePartie);

    connection.query(sql,valuePartie, function(err){
       if(err){
           res.json({"Error": true, "Message": err});
       } else {
           res.json({"Error": false, "Message": "Success"})
       }
    });
});

/** INSERONS LES DONNEES DANS POINTS**/

app.post('/insert/points', function(req, res)
{
  let valuePoint = 
  {
     "x": req.body.x,
     "y": req.body.y,
     "couleur": req.body.couleur,
     "taille": req.body.taille
  };

    let sql  = 'INSERT INTO points SET?';
    console.log( valuePoint);

    connection.query(sql,valuePoint, function(err){
       if(err){
           res.json({"Error": true, "Message": err});
       } else {
           res.json({"Error": false, "Message": "Success"})
       }
    });
});


/** RECUPERONS LES DONNEES DE PLAYERS **/


app.get('/players', function(req, res)
{
  let data = 
  {
     'username': req.body.username,
     'email': req.body.email,
  };
    let sql  = 'SELECT username, email from players';

        connection.query(sql, data, function(err, rows) {
            if (err) {
                throw err;
            } else {
                console.log(' voilà les players: ',rows);
                  res.status(200).send(rows);
            }
        });
});



app.listen(PORT);

console.log(`-----------------------------
| The root folder is: '${__dirname}/app'
| You can access the application at: http://localhost:${PORT}
------------------------------------------`);
