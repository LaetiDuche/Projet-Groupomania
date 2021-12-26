//Créer un compte utilisateur, se connecter à son compte, modifier son profil
//Supprimer son compte

const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt');
const User = require('../models/User');
require('dotenv').config({ path: './.env' });
/* const asyncLib = require('async'); */

//Vérification des champs email et password avec regex
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d).{4,8}$/;

//Création d'un nouvel utilisateur email et le mot de pass crypté
exports.signup = (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  //S'il manque un paramètre
  if (email == null || username == null || password == null) {
    return res.status(400).json({ 'error': 'missing params' });
  }

  //L'username doit être compris entre 5 et 12 caractères
  if (username.length >= 13 || username.length <= 4) {
    return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12) ' });
  }

  //Regex email
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 'error': 'email is not valid) ' });
  }

  //Regex mot de passe
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ 'error': 'password is not valid (length 4 - 8 with one number))' });
  }

  //Hachage du mot de passe
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
},

  //Se connecter à son compte
  exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email == null || password == null) {
      return res.status(400).json({ 'error': 'missing params' });
    }

    //Vérification si l'utilisateur existe 
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return req.status(401).json({ error: 'Utilisateur introuvable !' });
        }
        //Vérification du bon mot de passe de l'utilisateur
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return req.status(401).json({ error: 'Mot de pass incorrect !' });
            }
            //On lui attribue un jeton token pour 24H , session connectée pour 24h
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.SECRET_TOKEN,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  },

  //Aller sur son profil
  exports.getUserProfile = (req, res) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });

    User.findOne({
      attributes: ['id', 'email', 'username'],
      where: { id: userId }
    })
      .then(function (user) {
        if (user) {
          res.status(201).json(user);
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      })
      .catch(function (err) {
        res.status(500).json({ 'error': 'cannot fetch user' });
      });
  },

  //Modifer son profil , modifier son username
  exports.updateUserProfile = (req, res) => {

    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const username = req.body.username;

    asyncLib.waterfall([
      function (done) {
        models.User.findOne({
          attributes: ['id', 'username'],
          where: { id: userId }
        })
          .then(function (userFound) {
            done(null, userFound);
          })
          .catch(function (err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
      },
      function (userFound, done) {
        if (userFound) {
          userFound.update({
            username: (username ? username : userFound.username)
          })
            .then(function () {
              done(userFound);
            })
            .catch(function (err) {
              res.status(500).json({ 'error': 'cannot update user' });
            });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function (userFound) {
      if (userFound) {
        return res.status(201).json(userFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update user profile' });
      }
    });
  },

  //Supprimer son compte
  exports.deleteUserProfile = (req, res) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const id = req.body.id;

    //Supprimer tous ses gifs et son compte utilisateur
    models.Gif.destroy({ where: { id: userId } })
      .then(() => models.User.destroy({ where: { id: id } }))
      .then(() => res.status(200).json({ message: 'User deleted' }))
      .catch(error => res.status(400).json({ error }))
      .catch(error => res.status(500).json({ error }));


  }
