//Importations des fichiers et création des chemins des URI pour les likes
const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/likes');
const auth = require('../utils/jwt');

// Routes
router.post('/:id/like', auth, likeCtrl.likeGif);

router.get('/', likeCtrl.getAllLikes);
router.post('/', likeCtrl.createLike);

module.exports = router;