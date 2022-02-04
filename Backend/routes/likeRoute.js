const express = require('express');

const router = express.Router();
const likeCtrl = require('../controllers/likes');

// Routes
router.get('/', likeCtrl.getLikes);
router.post('/', likeCtrl.postLike);

module.exports = router;