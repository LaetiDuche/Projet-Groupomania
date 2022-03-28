//Importations des fichiers et création des chemins des URI pour le signup et login des users

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const multer = require('../utils/multer_config');
const authJwt = require('../utils/jwt');
/* const jwt = require('jsonwebtoken'); */

/*User*/ 
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

/*Profil user*/ 
/* router.post('/', authJwt, multer, userCtrl.createUserProfil); */
router.get('/:id', authJwt, userCtrl.getUserProfile);
router.put('/:id/profil',authJwt, multer, userCtrl.updateUserProfile);
router.delete('/:id',authJwt,  userCtrl.deleteUserProfile);

module.exports = router;