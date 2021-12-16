//Importations des fichiers et création des chemins des URI pour le signup et login des users

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usersCtrl');

router.post('/users/register',userCtrl.register);
router.post('/users/login', userCtrl.login);
router.get('/users/myProfile', userCtrl.getUserProfile);
router.put('/users/myProfile', userCtrl.updateUserProfile);

module.exports = router;