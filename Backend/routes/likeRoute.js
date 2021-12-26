//Importations des fichiers et création des chemins des URI pour le signup et login des users

const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/likes');
const auth = require('../utils/jwt');

router.post('/:id/like',  likesCtrl.likeGif);
/* router.post('/gifs/:gifId/vote/dislike',  likesCtrl.dislikePost); */

module.exports = router;