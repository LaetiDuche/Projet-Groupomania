//Importations des fichiers et création des chemins des URI pour le signup et login des users

const express = require('express');
const router = express.Router();
const gifsCtrl = require('../controllers/gifsCtrl');

router.post('/gifs/new/', gifsCtrl.createGif);
router.get('/gifs/', gifsCtrl.listGifs);
module.exports = router;