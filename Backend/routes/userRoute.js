//Importations des fichiers et création des chemins des URI pour le signup et login des users

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usersCtrl');

router.post('/users/register',userCtrl.register);
router.post('/users/login', userCtrl.login);

module.exports = router;