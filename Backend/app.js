const express = require('express');
/* const { Server } = require('http');
const mysql = require("mysql2"); */

const path = require('path');
const { Sequelize } = require('sequelize');
const cors = require('cors');

require('dotenv').config({path: './.env'});
const helmet = require('helmet');

//Importations des routes
const userRoute = require('./routes/userRoute');
const gifRoute = require('./routes/gifRoute');
/* const likeRoute = require('./routes/likeRoute'); */

const app = express();

//Connection à la base de donnée
const sequelize = new Sequelize(process.env.NAME_DB, process.env.USERNAME_DB, process.env.PASS_DB , {
  dialect: process.env.DIALECT_DB,
  host: 'localhost',
  logging: false,
 });

 try {
   sequelize.authenticate();
  console.log('Connecté à la base de données !');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}


//Sécurisation des requetes multi origine 

//TEST SERVER
/* app.get('/', function(req, res){
  res.setHeader('Content-type', 'text/html');
  res.status(200).send('<h1>Bonjour sur mon server </h1>');
}); */

app.use(cors());
//Sécurisation des requetes multi origine
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.urlencoded({extended: true,limit: '70mb', parameterLimit: 700000 }));
app.use(express.json({ limit: '70mb' }));

app.use('/api/forum', gifRoute);
/* app.use('/api/likes', likeRoute); */
app.use('/api/users', userRoute);

module.exports = sequelize;
module.exports = app;
