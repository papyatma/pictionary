
// Faire sur NodeJS pour que le server.js se reexecute automatiquement à chaque modification

// +------------------------+
// | npm install -g nodemon |
// | nodemon server.js      |
// +------------------------+

const PORT = 9000;
const express = require('express');
const session	=	require('express-session');
const app = express();

app.use('/',express.static(__dirname + '/app'));

const bodyParser=require('body-parser');

const authenticateController=require('./controllers/authenticate-controller');
const registerController=require('./controllers/register-controller');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/* route to handle login and registration */
app.post('/register',registerController.register);
app.post('/authenticate',authenticateController.authenticate);

app.listen(PORT);

console.log(`-----------------------------
| The root folder is: '${__dirname}/app'
| You can access the application at: http://localhost:${PORT}
------------------------------------------`);
