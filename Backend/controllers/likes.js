//Importations des fichiers 

const express = require('express');
const Like = require('../models').Like;
const User = require('../models').User;
const Gif = require('../models').Gif;

exports.getLikes = (req, res, next) => {
  Like.findAll({include: User, where: {
    gifId: req.body.gifId}})
    .then(likes => {
        console.log(likes);
        res.status(200).json({data: likes});
    })
    .catch(error => res.status(400).json({ error }));
};

exports.postLike = (req, res, next) => {
  const likeObject = req.body;
    Like.findAll({where: {
      gifId: req.body.gifId,
      /* userId: req.body.userId */
      }})
      .then(likes => {
        if(likes.length === 0) {
          const like = new Like({
            ...likeObject
          });
          // Enregistrement de l'objet like dans la base de données
          like.save()
          .then(() => {
            Like.findAll({
              where: {gifId: req.body.gifId}
            }).then(likes => {
              res.status(200).json({ like: likes.length});
            })
          })
          .catch(error => res.status(400).json({ error }));
        } else {
          Like.destroy({ where: {
            gifId: req.body.gifId,
            /* userId: req.body.userId */ }})
            .then(() => {
              Like.findAll({
                where: {gifId: req.body.gifId}
              }).then(likes => {
                res.status(200).json({ like: likes.length});
              })
            })
            .catch(error => res.status(400).json({ error }));
        }
      }
    )
}

const app = express();