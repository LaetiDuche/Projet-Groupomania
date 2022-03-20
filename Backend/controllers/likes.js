// CRUD des likes , create read

//Importation des models
const express = require('express');
/* const Like = require('../models').Like;
const User = require('../models').User; */
const Gif = require('../models').Gif;

exports.likeGif = (req, res) => {
  try {
    const gif = Gif.findById(req.params.id);
    if (!gif.likes.includes(req.body.userId)) {
       gif.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
       gif.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};



//Gestion des likes
/* exports.likeGif = (req, res, next) => {
  console.log("toto like")
  const idUser = req.body.userId;
  const like = req.body.like; */

  //Sélection d'une gif
  /* Gif.findOne({ where: { id: req.params.id }})
    .then(gif => {

      switch (like) { */
        //Si like
       /*  case 1: */
          //Ajout d'un like à la gif, mis en relation entre l'id de l'user et le like,  mise à jour
          /* Gif.updateOne({ where: { id: req.params.id }}, { $inc: { likes: +1 }, $push: { usersLiked: idUser } })
            .then(() => res.status(200).json({ message: 'Like ajouté !' }))
            .catch(error => res.status(400).json({ error }));
          break; */

        //Si dislike
        /* case -1: */
          //Ajout d'un dislike à la gif et mis en relation entre l'id de l'user et le dislike, mise à jour
          /* Gif.updateOne({ where: { id: req.params.id }}, { $inc: { dislikes: +1 }, $push: { usersDisliked: idUser } })
            .then(() => res.status(200).json({ message: 'Dislike ajouté !' }))
            .catch(error => res.status(400).json({ error }));
          break; */

          //Suppression du dislike
        /* case 0:
          if (gif.usersDisliked.includes(idUser)) {
            Gif.updateOne({ where: { id: req.params.id }}, { $inc: { dislikes: -1 }, $pull: { usersDisliked: idUser } })
              .then(() => res.status(200).json({ message: 'Dislike supprimé' }))
              .catch(error => res.status(400).json({ error }));
          } else { */

            //Suppression du like
            /* Gif.updateOne({ where: { id: req.params.id }}, { $inc: { likes: -1 }, $pull: { usersLiked: idUser } })
              .then(() => res.status(200).json({ message: 'Like supprimé' }))
              .catch(error => res.status(400).json({ error }));
          }
          break;
      }
    })
    .catch(error => res.status(404).json({ error }));
} */











// Récupérer tous les likes
/* exports.getLikes = (req, res, next) => {
  console.log("get all Like");
  Like.findAll(
    {
      include: [{
        model: User,
        attributes: ['id', 'username', 'likes']

      }],
    })
    .then((likes) => res.status(200).json(likes))
    .catch((error) => { console.log(error); res.status(400).json({ error }) });
}; */

// Récupérer un seul like
/* exports.getOneLike = (req, res, next) => {
  console.log("getOneLike");

  Like.findOne(
    {
      where: {
        id: req.params.id
      },
      include: [{
        model: Gif,
        attributes: ['id', 'gifs', 'title', 'likes']
      }],
    })
    .then((likes) => {
      res.status(200).json(likes);
    })
    .catch((error) => res.status(404).json({ error }));
}; */

// Créer un like
/* exports.createLike = (req, res, next) => {
  console.log(req.body)
  console.log("toto like")

  const like = new Like({
    userId: req.body.id,
    gifId: req.params.id,
    likes: req.body.likes,
  });

  like.save()
    .then(() => res.status(201).json({ message: 'Like enregistré !' }))
    .catch(error => res.status(400).json({ error }));

} */
//TEST 1
  /* const likeObject = req.body;
  Like.findAll({
    where: {
      id: req.params.id,
    }
  })
  .then(likes => {
    if (likes.length === 0) {
      const like = new Like({
        ...likeObject
      });
     
      like.save()
        .then(() => {
          Like.findAll({
            where: { gifId: req.body.gifId }
          }).then(likes => {
            res.status(200).json({ like: likes.length });
          })
        })
        .catch(error => res.status(400).json({ error }));
    } else {
      Like.destroy({
        where: {
          gifId: req.body.gifId,
         
        }
      })
        .then(() => {
          Like.findAll({
            where: { gifId: req.body.gifId }
          }).then(likes => {
            res.status(200).json({ like: likes.length });
          })
        })
        .catch(error => res.status(400).json({ error }));
    }
  } 
  )*/


//TEST 2
/* exports.createLike = (req, res, next) => {
  console.log(req.body)
  console.log("toto like")
  const like = new Like({
    ...req.body,
    userId: req.body.userId,
    gifId: req.params.gifId,
    likes: req.body.likes,
  });

  Like.findOne({ where: { userId: req.body.userId, gifId: req.body.gifId } })
    .then((likes) => {
      if (!likes) {
        Like.create(like)
          .then((data) => {
            res.status(200).json({ data });
          })
          .catch(err => {
            res.status(500).send({ message: err });
          });
      } else {
        res.status(409).json({ message: `L'utilisateur a déjà liké le post.` })
      }
    })
}; */

const app = express();