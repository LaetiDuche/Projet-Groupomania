//Créer un compte utilisateur, se connecter à son compte, modifier son profil
//Supprimer son compte

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models').User;
require('dotenv').config({ path: './.env' });

//Création d'un nouvel utilisateur email et le mot de pass crypté
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        isAdmin: false
      });
      user
        .save()
        .then((user) => {
          if (user) {
            res.status(201).json({ message: 'Utilisateur crée !' });
          }
        })
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error })
    });
};

//Se connecter à son compte
exports.login = (req, res) => {
  //Vérification si l'utilisateur existe 
  User.findOne(
      { where: { email: req.body.email } }
    )
    .then((user) => {
      if (!user) {
        return req.status(401).json({ error: 'Utilisateur introuvable !' });
      }
      //Vérification du bon mot de passe de l'utilisateur
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return req.status(401).json({ error: 'Mot de pass incorrect !' });
          }
          //On lui attribue un jeton token pour 24H , session connectée pour 24h
          res.status(200).json({
            message: 'Utilisateur connecté !',
            userId: user.id,
            isAdmin: user.isAdmin,
            email: user.email,
            username: user.username,
            token: jwt.sign(
              { userId: user.id },
              process.env.SECRET_TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error })
    });
};

//Aller sur son profil
exports.getUserProfile = (req, res, next) => {
  User.findOne(
    { where: { id: req.params.id } }
  )
    .then(user => res.status(200).json({ username: user.username }))
    .catch(error => res.status(404).json({ error }));
};

//Modifer son profil , modifier son username
exports.updateUserProfile = (req, res, next) => {
  const id = req.params.id;
  const username = req.body.username;
  User.update(
    { username: username },
    { where: { id: id } }
  )
    .then(() => res.status(200).json({ message: 'Profil modifié !' }))
    .catch(error => res.status(400).json({ error }));
}

//Supprimer son compte
exports.deleteUserProfile = (req, res) => {
  const id = req.params.id;
  console.log(req.user);
  User.destroy(
    { where: { id: id } }
  )
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
    .catch(error => res.status(400).json({ error }))
    .catch(error => res.status(500).json({ error }));
}
