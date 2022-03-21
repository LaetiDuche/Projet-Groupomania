//Créer un compte utilisateur, se connecter à son compte, modifier son profil
//Supprimer son compte

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
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
        isAdmin: 0,
        photo: false
      });
      user
        .save()
        .then((user) => {
          if (user) {
            return res.status(201).json({ message: 'Utilisateur crée !' });
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
            photo: user.photo,
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
    .then(user => res.status(200).json({ id: user.id, username: user.username, photo: user.photo }))
    .catch(error => res.status(404).json({ error }));
};

//Modifer son profil , modifier son username et sa photo profil
exports.updateUserProfile = (req, res, next) => {
  /* console.log(req.file) */
  const userId = req.userId;
  const userObject = req.file ?
    {
      ...req.body.User,
      photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body };

  User.findOne({ where: { id: userId } })
    .then((user) => {
      const imageUpdated = User.photo;
      if (user.id == userId) {
        if (userObject.photo && userObject.photo != User.photo && imageUpdated != 'user-profile.jpg') {
          fs.unlink(`images/${imageUpdated}`, () => {
            user.update(userObject)
              .then(updateDB => {
                if (updateDB == 1) {
                  res.status(200).json({ message: "Profil enregistré avec succés 1." });
                } else {
                  res.status(400).json({ message: `Impossible de mettre à jour le profil id=${userId}. Utilisateur non trouvé ou  req.body est vide 1!` });
                }
              })
              .catch(function () {
                res.status(500).send({ message: "Erreur de mise à jour du profil id=" + userId });
              });
          })
        }
        User.update(userObject, { where: { id: userId } })
          .then(updateDB => {
            if (updateDB == 1) {
              res.status(200).json({ message: "Profil enregistré avec succés 2." });
            } else {
              res.status(400).json({ message: `Impossible de mettre à jour le profil id=${userId}. Utilisateur non trouvé ou req.body est vide 2!` });
            }
          })
          .catch(function () {
            res.status(500).send({ message: "Erreur de mise à jour du profil id=" + userId });
          });
      }
    })
};

//Supprimer son compte
exports.deleteUserProfile = (req, res) => {

  User.findOne({ id: req.params.id })

    .then(user => {
      const filename = user.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        User.deleteOne({ id: req.params.id })
          .then(() => res.status(200).json({ message: 'User supprimé !' }))
          .catch(error => res.status(404).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
