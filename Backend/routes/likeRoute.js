//Importations des fichiers et création des chemins des URI pour le signup et login des users

const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/likesCtrl');
const auth = require('../utils/jwt.utils');

router.post('/gifs/:gifId/vote/like', auth, likesCtrl.likePost);
router.post('/gifs/:gifId/vote/dislike', auth, likesCtrl.dislikePost);

module.exports = router;