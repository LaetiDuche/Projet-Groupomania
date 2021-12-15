const bcrypt = require('bcrypt');
/* const jwt = require('jsonwebtoken'); */
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');

module.exports = {
  register : function(req, res){
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if(email == null || username == null || password == null){
      return res.status(400).json({'error': 'missing params'});
    }

    models.User.findOne({
      attributes: ['email'],
      where: {email: email}
    })
    .then(function(userFound){
      if(!userFound){
        bcrypt.hash(password,5,function(err, bcryptedPassword){
          const newUser = models.User.create({
            email: email,
            username: username,
            password: bcryptedPassword,
            isAdmin: 0
          })
          .then(function(newUser){
            return res.status(201).json({
              'userId': newUser.id
            })
          })
          .catch(function(err){
            return res.status(500).json({
              'error': 'cannot add user'
            });
          });
        });
      }else{
        return res.status(409).json({'error': 'user already exist'});
      }
    })
    .catch(function(err){
      return res.status(500).json({'error':'unable to verify user'});
    });
  },


  login : function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    if(email == null || password == null){
      return res.status(400).json({'error': 'missing params'});
    }
    models.User.findOne({
      where: {email: email}
    })
    .then(function(userFound){
      if(userFound){
        bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
          if(resBycrypt){
            return res.status(200).json({
              'userId': userFound.id,
              'token': jwtUtils.generateTokenUser(userFound)
            });
          }
        })
      }else{
        return res.status(404).json({'error': 'user not exist in DB'});
      }
    })
    .catch(function(err){
      return res.status(500).json({'error': 'unable to verify user'});
    });
  }
}