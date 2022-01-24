const fs = require('fs');
const express = require('express');
const Gif = require('../models').Gif;
const User = require('../models').User;
const multer = require('../utils/multer_config');
/* const app = require('./app'); */

//Créer un gif
/* exports.createGif = async (req, res) => {
 try{
  const gifData = req.file ?

  {
    ...JSON.parse(req.body.gif),
    userId: res.userId,
    title: req.body.title,
    gifs: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {
    ...req.body,
    userId: res.userId
  };
  console.log(gifData);

  let gif = await Gif.create(gifData);

  if(!gif || !title){throw "Gif enregistré"}
  res.status(201).json(gif);
 }catch(error){
  res.status(500).json({error: error || "Gif pas enregistré"})
 }

  //Récupération de l'image pour la mettre dans le dossier images 
  
    
}; */

exports.createGif = (req, res) => {
  console.log(req.file)

  //Récupération de l'image pour la mettre dans le dossier images 
  const gif = new Gif({
    //...gifObject,
    userId: req.userId,
    title: req.body.title,
    gifs: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0
  });
  gif.save()
    .then(() => res.status(201).json({ message: 'Gif enregistré !' }))
    .catch(error => res.status(400).json({ error }));
    
};

//Voir tous les messages dans le forum
exports.getAllGifs = (req, res, next) => {
  console.log("toto")
  Gif.findAll(
    { include: User, order: [['createdAt', 'DESC']] }
  )
    .then(gifs => res.status(200).json(gifs))
    .catch(error => { console.log(error); res.status(400).json({ error }) });
};

//Supprimer un message
exports.deleteGif = (req, res, next) => {
  Gif.findOne({ id: req.params.id })
  .then(gif => {
    const filename = gif.gifs.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Gif.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'Gif supprimé !' }))
        .catch(error => res.status(404).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};

const app = express();