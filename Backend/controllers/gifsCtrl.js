const models = require('../models');
/* const asyncLib = require('async'); */
const jwtUtils = require('../utils/jwt');

//Voir tous les gifs
exports.getAllGifs = (req, res, next) => {
  models.Gif.findAll({
    order: [['createdAt', 'DESC']]
  }).then(gifs => res.status(200).json(gifs))
    .catch(error => res.status(400).json({ error }));
}

//Créer un gif
exports.createGif = (req, res) =>{
   
    const headerAuth  = req.headers['authorization'];
    const userId      = jwtUtils.getUserId(headerAuth);
    const title = req.body.title;
    const content = req.body.content;

    if(title == null || content == null){
      return res.status(400).json({error: 'missing parameters'});
    }

    if(title.length <= 2 || content.length <= 2){
      return res.status(400).json({error: 'invalid parameters'});
    }

    const newGif = models.Gif.create({
      id: userId,
      title: title,
      content: content,
      UserId: userId
    })
    .then(function(newGif){
      return res.status(201).json({ 'gifId': newGif.id})
    })
    .catch(function (err){
      return res.status(500).json({ 'error': 'cannot create gif'})
    })
    
  }

  //Supprimer un gif
  exports.deleteGif = (req, res, next) => {
    const id = req.body.id;

    models.Gif.destroy({ where: { id: id}})
    .then(() => res.status(200).json({ message: 'Gif supprimé'}))
    .catch(error => res.status(500).json({ error}));
  }

  