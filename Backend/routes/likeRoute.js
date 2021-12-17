//Importations des fichiers et création des chemins des URI pour le signup et login des users

const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/likesCtrl');

router.post('/gifs/:gifId/vote/like', likesCtrl.likePost);
router.post('/gifs/:gifId/vote/dislike', likesCtrl.dislikePost);

module.exports = router;