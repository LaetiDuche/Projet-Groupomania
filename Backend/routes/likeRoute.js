const express = require('express');

const router = express.Router();
const likeCtrl = require('../controllers/likes');
const auth = require('../utils/jwt');

// Routes
/* router.get('/:id', auth, likeCtrl.getLikes);
router.get('/:id', auth, likeCtrl.getOneLike); */
/* router.post('/:id/like', auth, likeCtrl.likeGif); */
router.put('/:id/like', auth, likeCtrl.likeGif);

module.exports = router;