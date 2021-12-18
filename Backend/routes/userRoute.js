//Importations des fichiers et création des chemins des URI pour le signup et login des users

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usersCtrl');
const auth = require('../utils/jwt.utils');

router.post('/users/register',userCtrl.register);
router.post('/users/login', userCtrl.login);
router.get('/users/:id', auth, userCtrl.getUserProfile);
router.put('/users/:id', auth, userCtrl.updateUserProfile);
router.delete('/users/:id', auth, userCtrl.deleteUserProfile);

module.exports = router;