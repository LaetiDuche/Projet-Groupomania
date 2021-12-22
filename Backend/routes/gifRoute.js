//Importations des fichiers et création des chemins des URI pour les gifs

const express = require('express');
const router = express.Router();

const gifCtrl = require('../controllers/gifsCtrl');
const likeCtrl = require('../controllers/likes');
const auth = require('../utils/jwt');
const multer = require('../utils/multer_config')

router.get('/',  gifCtrl.getAllGifs);
router.post('/', multer,  gifCtrl.createGif);
router.delete('/', gifCtrl.deleteGif);
router.post('/:id/like', likeCtrl.likeGif);

module.exports = router;