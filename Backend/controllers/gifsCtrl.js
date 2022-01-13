const fs = require('fs');
const express = require('express');
const Gif = require('../models').Gif;


//Créer un gif
exports.createGif = (req, res) => {
  console.log(req.file)

  //Récupération de l'image pour la mettre dans le dossier images 
  const gif = new Gif({
    //...gifObject,
  
    gifs: `${req.protocol}://${req.get('host')}/images/gifs/${req.file.filename}`,
    title: "", //req.body.title,
    userId: req.headers.authorization,
    likes: 0,
  });
  gif.save()
    .then(() => res.status(201).json({ message: 'Gif enregistré !' }))
    .catch(error => res.status(400).json({ error }));
    
};

//Voir tous les gifs
exports.getAllGifs = (req, res, next) => {
  Gif.findAll(
    { order: [['createdAt', 'DESC']] }
  )
    .then(gifs => res.status(200).json(gifs))
    .catch(error => res.status(400).json({ error }));
};

//Supprimer un gif
exports.deleteGif = (req, res, next) => {
  Gif.findOne({ id: req.params.id })
  .then(gif => {
    const filename = gif.gifs.split('/images/gifs/')[1];
    fs.unlink(`images/gifs/${filename}`, () => {
      Gif.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'Gif supprimé !' }))
        .catch(error => res.status(404).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};

const app = express();