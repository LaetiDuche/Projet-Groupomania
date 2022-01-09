/* const models = require('../models').gif; */
/* const asyncLib = require('async'); */
const jwtUtils = require('../utils/jwt');
const fs = require('fs');
const express = require('express');
const Gif = require('../models').Gif;

//Créer un gif
exports.createGif = (req, res) => {

  /* const headerAuth = req.headers['authorization']; */
 /*  const userId = jwtUtils.getUserId(headerAuth); */
  /* const title = req.body.title; */
  /* const gif = req.file.filename; */
  /* const userId = req.user; */

  //Récupération de l'image pour la mettre dans le dossier images et activation des boutons likes
  const gif = new Gif({
    gif: `${req.protocol}://${req.get('host')}/gifs/${req.file.filename}`,
    title: req.body.title,
    /* id: userId, */
    userId: req.body.user
  });
  gif.save()
    .then(() => res.status(201).json({ message: 'Gif enregistré !' }))
    .catch(error => res.status(400).json({ error }));

};





/* if (title == null || gif == null) {
  return res.status(400).json({ error: 'missing parameters' });
}

const newGif = Gif.create({
  gif: `${req.protocol}://${req.get('host')}/gifs/${req.file.filename}`,
  id: userId,
  title: title,
   attachment: attachment,
  userId: userId
})
  .then(function (newGif) {
    return res.status(201).json(
      {
        message: 'Gif publié !',
        'gifId': newGif.id
      })
  })
  .catch(function (err) {
    return res.status(500).json({ 'error': 'cannot create gif' })
  })

} */

//Voir tous les gifs
exports.getAllGifs = (req, res, next) => {
  Gif.findAll(
    { order: [['createdAt', 'DESC']] }
  )
    .then(gifs => res.status(200).json(gifs))
    .catch(error => res.status(400).json({ error }));
}

//Supprimer un gif
exports.deleteGif = (req, res, next) => {
  const id = req.body.id;

  models.Gif.destroy({ where: { id: id } })
    .then(() => res.status(200).json({ message: 'Gif supprimé' }))
    .catch(error => res.status(500).json({ error }));
}

const app = express();