//Créer un compte utilisateur, se connecter à son compte, modifier son profil
//Supprimer son compte

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../models').User;
require('dotenv').config({ path: './.env' });

//Création d'un nouvel utilisateur, email et le mot de pass crypté
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
        return res.status(401).json({ error: 'Utilisateur introuvable !' });
      }
      //Vérification du bon mot de passe de l'utilisateur
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de pass incorrect !' });
          }
          //  Jeton token , session pour 24H 
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

// Mettre à jour son profil, modifier la photo et le username
exports.updateUserProfile = (req, res, next) => {

  console.log(req.body.username)
  const userId = req.params.id;

  User.findOne({ where: { id: userId } })
    .then((user) => {
      console.log("No Updated" + JSON.stringify(user))
      var oldFile = null;
      if (req.body.username) {
        user.username = req.body.username
      }
      if (req.file) {
        let oldFileName = user.photo.split('/images/')[1]
        oldFile = `images/${oldFileName}`
        user.photo = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
      console.log("Updated" + JSON.stringify(user))
      user.save()
        .then((user) => {
          if (oldFile) {
            fs.unlink(oldFile, () => {
              res.status(200).json({ id: user.id, username: user.username, photo: user.photo, gifId: user.gifId })
            })
          } else {
            res.status(200).json({ id: user.id, username: user.username, photo: user.photo })
          }
        })
        .catch((error) => {
          console.log(error)
          res.status(400).json({ message: `Impossible de mettre à jour le profil id=${userId}. Utilisateur non trouvé ou  req.body est vide 1!` });
        })
    })
    .catch((error) => {
      res.status(500).send({ message: "Erreur de mise à jour du profil id=" + userId });
    })
};

//Supprimer son compte (supprime user, gifs et comments d'un user)
exports.deleteUserProfile = (req, res) => {

  User.findOne({ where: { id: req.params.id } })

    .then(user => {
      const filename = user.photo.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        const paramId = parseInt(req.params.id);
        console.log(req.user);
        console.log(paramId);
        User.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'User supprimé !' }))
          .catch(error => res.status(404).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

