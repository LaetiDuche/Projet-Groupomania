const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');

module.exports = {
  createGif: function (req, res) {
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

    asyncLib.waterfall([
      function(done){
        models.User.findOne({
          where: {id: userId}
        })
        .then(function(userFound){
          done(null, userFound);
        })
        .catch(function(err){
          return res.status(500).json({error: 'unable to verify user'});
        });
      },
      function(userFound, done){
        if(userFound){
          models.Gif.create({
            title: title,
            content: content,
            likes: 0,
            UserId: userFound.id
          })
          .then(function(newGif){
            done(newGif);
          });
        }else{
          return res.status(404).json({error: 'user not found'});
        }
      },
    ], function(newGif){
      if(newGif){
        return res.status(201).json(newGif);
      }else{
        return res.status(500).json({error: 'cannot post gif'});
      }
    });
  },

  listGifs: function(req,res){
    const fields = req.query.fields;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const order = req.query.order;

    models.Gif.findAll({
      order: [(order != null) ? order.split(':') : ['title', 'ASC']],
      attributes: (fields != '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: [{
        model: models.User,
        attributes: ['username']
      }]
    })
    .then(function(gifs){
      if(gifs){
        res.status(200).json(gifs);
      }else{
        res.status(404).json({"error": 'no gifs found'});
      }
    })
    .catch(function(err){
      console.log(err);
      res.status(500).json({"error": 'invalid fields'});
    });
  }
}