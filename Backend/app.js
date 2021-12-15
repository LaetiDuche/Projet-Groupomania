const express = require('express');
const app = express();
const path = require('path');
const { Sequelize } = require('sequelize');

require('dotenv').config({path: './.env'});

//Importations des routes
const userRoute = require('./routes/userRoute');


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
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(express.json());
app.use('/api/auth', userRoute);

module.exports = sequelize;
module.exports = app;
