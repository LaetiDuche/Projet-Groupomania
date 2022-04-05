// CRUD des commentaires , create, read, et delete pour l'admin

const express = require('express');
const User = require('../models').User;
const Comment = require('../models').Comment;
const Gif = require('../models').Gif;

//Créer un commentaire
exports.createComment = (req, res, next) => {
  console.log(req.body)

  // Création d'un nouvel objet commentaire
  const comment = new Comment({
    userId: req.userId,
    gifId: req.params.id,
    comments: req.body.comments,
  });

  // Enregistrement de l'objet commentaire dans la base de données
  comment.save()
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
    .catch(error => res.status(400).json({ error }));
}

//Voir tous les commentaires dans le forum
exports.getAllComments = (req, res, next) => {
  console.log("get comments")

  Comment.findAll(
    {
      include: [
        { model: User,
          attributes: ['id', 'username', 'photo']
         },
        { model: Gif,
          attributes: ['id', 'gifs', 'title', 'userId']
        }
      ],
      order: [['createdAt', 'DESC']],
    })
    .then(comment => res.status(200).json(comment))
    .catch((error) => { console.log(error); res.status(400).json({ error }) });
};

//Voir un seul commentaire 
exports.getOneComment = (req, res, next) => {
  console.log("getOneComment");

  Comment.findOne(
    {
      where: {
        id: req.params.id
      },
    })
    .then(comment => { res.status(200).json(comment) })
    .catch(error => res.status(404).json({ error }));
};

//Supprimer un commentaire (admin)
exports.deleteComment = (req, res, next) => {

  Comment.findOne({ where: { id: req.params.id } })

  const paramId = parseInt(req.params.id);
  console.log(req.user);
  console.log(paramId);
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
    .catch(error => res.status(404).json({ error }));
};

const app = express();