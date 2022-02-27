//Importations des fichiers et création des chemins des URI pour les gifs

const express = require('express');
const router = express.Router();
const gifCtrl = require('../controllers/gifs');
const auth = require('../utils/jwt');
const multer = require('../utils/multer_config');
/* const likeCtrl = require('../controllers/likes'); */

router.get('/:id', auth,  gifCtrl.getOneGif);
router.get('/', auth,  gifCtrl.getAllGifs);
router.post('/', auth , multer,  gifCtrl.createGif);
router.delete('/:id', auth, gifCtrl.deleteGif);

/* router.post('/:id/like', auth, likeCtrl.likeGif); */



module.exports = router;