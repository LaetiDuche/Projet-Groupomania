const fs = require('fs');
const express = require('express');
const Gif = require('../models').Gif;
const User = require('../models').User;
const Comment = require('../models').Comment;
/* const Like = require('../models').Like;*/

exports.createGif = (req, res) => {
  console.log(req.file)

  //Récupération de l'image pour la mettre dans le dossier images 
  const gif = new Gif({
    //...gifObject,
    userId: req.userId,
    title: req.body.title,
    gifs: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  gif.save()
    .then(() => res.status(201).json({ message: 'Gif enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

//Voir tous les messages dans le forum
exports.getAllGifs = (req, res, next) => {
  console.log("Current user id admin => " + req.user.isAdmin)
  console.log("toto allgif")

  Gif.findAll(
    {
      include: [{
        model: Comment,
          include: [ {model: User} ]       
      },
      {
        model: User
      }
    ],
      order: [['createdAt', 'DESC']]
    }
  )
    .then((gifs) => res.status(200).json(gifs))
    .catch(error => { console.log(error); res.status(400).json({ error }) });
};

exports.getOneGif = (req, res, next) => {
  console.log("getOneGif");

  Gif.findOne(
    {
      where: { id: req.params.id },
      include: [{
        model: User,
        attributes: ['id', 'username', 'photo'],

      }, {model: Comment}]
    })
    .then((gifs) => res.status(200).json(gifs))
    .catch((error) => res.status(404).json({ error }));
};

//Supprimer un message (admin)
exports.deleteGif = (req, res, next) => {
  Gif.findOne({ where: { id: req.params.id } })
    .then(gif => {
      const filename = gif.gifs.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        const paramId = parseInt(req.params.id);
        console.log(req.user);
        console.log(paramId);
        Gif.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'Gif supprimé !' }))
          .catch(error => res.status(404).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};


const app = express();