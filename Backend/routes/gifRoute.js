//Importations des fichiers et création des chemins des URI pour les gifs

const express = require('express');
const router = express.Router();

const gifsCtrl = require('../controllers/gifsCtrl');
const auth = require('../utils/jwt.utils');
const multer = require('../utils/multer_config')

router.post('/gifs/new/', auth, multer, gifsCtrl.createGif);
router.get('/gifs/', auth, multer, gifsCtrl.listGifs);

module.exports = router;