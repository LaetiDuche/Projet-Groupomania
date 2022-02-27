const express = require('express');
const User = require('../models').User;
const Comment = require('../models').Comment;
const Gif = require('../models').Gif;

//Créer un commentaire
exports.createComment = (req, res, next) => {
  console.log(req.body)
  /*  const commentObject = req.body; */
  // Création d'un nouvel objet commentaire
  const comment = new Comment({
    userId: req.body.userId,
    gifId: req.params.id,
    comments: req.body.comments,
  });
  // Enregistrement de l'objet commentaire dans la base de données

  comment.save()
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
    .catch(error => res.status(400).json({ error }));

  /* comment.save()
    .then(() => {
      Comment.findAll({
        where: { gifId: req.params.id }
      })
        .then((comment) => {
          res.status(200).json(comment);
        })
    })
    .catch((error) => res.status(400).json({ error })); */
}

//Voir tous les commentaires dans le forum
exports.getAllComments = (req, res, next) => {
  /* console.log("Current user id admin => " + req.user.isAdmin) */
  console.log("toto comment")
  Comment.findAll(
    {
      include: [{
        model: User,
        attributes: ['id', 'username', 'photo'],

        include: [{
          model: Gif,
          attributes: ['id']
        }],
        order: [['createdAt', 'DESC']],
      }],
      /* include: [{
        model: Gif,
        attributes: ['id']
      }], */
      /* order: [['createdAt', 'DESC']], */
    }
  )
    .then((comments) => res.status(200).json(comments))
    .catch((error) => { console.log(error); res.status(400).json({ error }) });
};

exports.getOneComment = (req, res, next) => {
  console.log("getOneComment");

  Comment.findOne(
    {
      where: {
        id: req.params.id
      },
      include: [{
        model: User,
        attributes: ['id', 'username', 'photo']
      }],
    })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => res.status(404).json({ error }));
};

//Supprimer un commentaire (admin)
exports.deleteComment = (req, res, next) => {

  console.log(req.user);

  Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};

const app = express();