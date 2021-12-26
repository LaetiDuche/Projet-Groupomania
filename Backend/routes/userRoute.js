//Importations des fichiers et création des chemins des URI pour le signup et login des users

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
/* const auth = require('../utils/jwt.utils'); */

router.post('/signup',userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getUserProfile);
router.put('/:id', userCtrl.updateUserProfile);
router.delete('/', userCtrl.deleteUserProfile);



module.exports = router;