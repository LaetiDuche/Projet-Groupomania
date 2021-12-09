const express = require('express');
const app = express();
const path = require('path');
const Sequelize = require('sequelize');
const mysql2 = require('mysql2');

require('dotenv').config({path: './.env'});

//Importations des routes
const gifsRoutes = require('./routes/gifs');
const userRoutes = require('./routes/user');

//Connection à la base de donnée Mysql
const sequelize = new Sequelize(process.env.CONNECT_DB);
try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
  sequelize.query(process.env.NAME_DB)
  .then(([results, metadata]) => {
    console.log('Base de données créée !');
  })
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
};

//Sécurisation des requetes multi origine 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Importation du dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());

app.use('/api/gifs', gifsRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;