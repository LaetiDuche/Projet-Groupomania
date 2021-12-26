const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');

const DISLIKED =0;
const LIKED = 1;

module.exports = {
  likePost: function (req, res) {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    const gifId = parsInt(req.params.gifId);

    if (gifId <= 0) {
      return res.status(400).json({ error: 'invalid parameters' });
    }

    asyncLib.waterfall([
      function (done) {
        models.Gif.findOne({
          where: { id: gifId }
        })
          .then(function (gifFound) {
            done(null, gifFound);
          })
          .catch(function (err) {
            return res.status(500).json({ error: 'unable to verify gif' });
          });
      },

      function (gifFound, done) {
        if (gifFound) {
          models.User.findOne({
            where: { id: userId }
          })
            .then(function (userFound) {
              done(null, gifFound, userFound);
            })
            .catch(function (err) {
              return res.status(500).json({ error: 'unable to verify user' });
            });
        } else {
          res.status(404).json({ 'error': 'post already liked' });
        }
      },
      function (gifFound, userFound, done) {
        if (userFound) {
          models.Like.findOne({
            where: {
              userId: userId,
              gifId: gifId
            }
          })
            .then(function (userAlreadyLiked) {
              done(null, gifFound, userFound, userAlreadyLiked);
            })
            .catch(function (err) {
              return res.status(500).json({ 'error': 'unable to verify is user already liked' });
            });
        } else {
          res.status(404).json({ 'error': 'user not exist' });
        }
      },
      function (gifFound, userFound, userAlreadyLiked, done) {
        if (!userAlreadyLiked) {
          gifFound.addUser(userFound)
            .then(function (alreadyLikeFound) {
              done(null, gifFound, userFound, userAlreadyLiked);
            })
            .catch(function (err) {
              return res.status(500).json({ 'error': 'unable to set user reaction' });
            });
        } else {
          res.status(409).json({ 'error': 'gif already liked' });
        }
      },
      function (gifFound, userFound, done) {
        gifFound.update({
          likes: gifFound.likes + 1,
        })
          .then(function () {
            done(gifFound);
          })
          .catch(function (err) {
            res.status(500).json({ 'error': 'cannot update gif like counter' });
          });
      },
    ],
      function (gifFound) {
        if (gifFound) {
          return res.status(201).json(gifFound);
        } else {
          return res.status(500).json({ 'error': 'cannot update gif' });
        }
      });
    },
     
 

  dislikePost: function (req, res) {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    const gifId = parsInt(req.params.gifId);

    if (gifId <= 0) {
      return res.status(400).json({ error: 'invalid parameters' });
    }

    asyncLib.waterfall([
      function (done) {
        models.Gif.findOne({
          where: { id: gifId }
        })
          .then(function (gifFound) {
            done(null, gifFound);
          })
          .catch(function (err) {
            return res.status(500).json({ error: 'unable to verify gif' });
          });
      },

      function (gifFound, done) {
        if (gifFound) {
          models.User.findOne({
            where: { id: userId }
          })
            .then(function (userFound) {
              done(null, gifFound, userFound);
            })
            .catch(function (err) {
              return res.status(500).json({ error: 'unable to verify user' });
            });
        } else {
          res.status(404).json({ 'error': 'post already liked' });
        }
      },
      function (gifFound, userFound, done) {
        if (userFound) {
          models.Like.findOne({
            where: {
              userId: userId,
              gifId: gifId
            }
          })
            .then(function (userAlreadyLikedFound) {
              done(null, gifFound, userFound, userAlreadyLikedFound);
            })
            .catch(function (err) {
              return res.status(500).json({ 'error': 'unable to verify is user already liked' });
            });
        } else {
          res.status(404).json({ 'error': 'user not exist' });
        }
      },
      function (gifFound, userFound, userAlreadyLikedFound, done) {
        if (!userAlreadyLikedFound) {
          gifFound.addUser(userFound, { isLiked: DISLIKED})
            .then(function (alreadyLikeFound) {
              done(null, gifFound, userFound);
            })
            .catch(function (err) {
              return res.status(500).json({ 'error': 'unable to set user reaction' });
            });
        } else {
          if(userAlreadyLikedFound.isLike === LIKED){
            userAlreadyLikedFound.update({
              isLike: DISLIKED,
            })
            .then(function(){
              done(null, gifFound, userFound);
            })
            .catch(function(err){
              res.status(500).json({'error': 'cannot update user reaction'});
            });
          }else{
            res.status(409).json({ 'error': 'gif already disliked' });
          }
        }
      },
      function (gifFound, userFound, done) {
        gifFound.update({
          likes: gifFound.likes - 1,
        })
          .then(function () {
            done(gifFound);
          })
          .catch(function (err) {
            res.status(500).json({ 'error': 'cannot update gif like counter' });
          });
      },
    ],
      function (gifFound) {
        if (gifFound) {
          return res.status(201).json(gifFound);
        } else {
          return res.status(500).json({ 'error': 'cannot update gif' });
        }
      });
  }
}
