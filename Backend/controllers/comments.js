const express = require('express');
const User = require('../models').User;
const Comment = require('../models').Comment;

//Créer un commentaire
exports.createComment = (req, res, next) => {

  const commentObject = req.body;
  // Création d'un nouvel objet commentaire
  const comment = new Comment({
    ...commentObject
  });
  // Enregistrement de l'objet commentaire dans la base de données
  comment.save()
    .then(() => {
      Comment.findAll({
        where: { gifsId: req.body.gifsId }
      })
        .then((comment) => {
          res.status(200).json(comment);
        })
    })
    .catch(error => res.status(400).json({ error }));
}

//Voir tous les commentaires dans le forum
exports.getAllComments = (req, res, next) => {
  console.log("Current user id admin => " + req.user.isAdmin)
  console.log("toto")
  Comment.findAll(
    { include: User, order: [['createdAt', 'DESC']] }
  )
    .then(comment => res.status(200).json(comment))
    .catch(error => { console.log(error); res.status(400).json({ error }) });
};

//Supprimer un commentaire (admin)
exports.deleteComment = (req, res, next) => {

  console.log(req.user);

  Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};

const app = express();