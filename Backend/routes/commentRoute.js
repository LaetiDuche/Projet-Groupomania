//Importations des fichiers et création des chemins des URI pour les commentaires 

const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comments');
const auth = require('../utils/jwt');

router.get('/:id', auth,  commentCtrl.getAllComments);
router.post('/:id', auth,  commentCtrl.createComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;