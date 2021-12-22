const Gif = require('../models');
/* const jwtUtils = require('../utils/jwt'); */

exports.likeGif = (req, res, next) => {
  const idUser = req.body.userId;
  const like = req.body.like;

  //Sélection d'une sauce
  Gif.findOne({ _id: req.params.id })
    .then(gif => {

      switch (like) {
        //Si like
        case 1:
          //Ajout d'un like à la sauce, mis en relation entre l'id de l'user et le like,  mise à jour
          Gif.updateOne({ _id: req.params.id }, { $inc: { likes: +1 }, $push: { usersLiked: idUser } })
            .then(() => res.status(200).json({ message: 'Like ajouté !' }))
            .catch(error => res.status(400).json({ error }));
          break;

        //Si dislike
        case -1:
          //Ajout d'un dislike à la sauce et mis en relation entre l'id de l'user et le dislike, mise à jour
          Gif.updateOne({ _id: req.params.id }, { $inc: { dislikes: +1 }, $push: { usersDisliked: idUser } })
            .then(() => res.status(200).json({ message: 'Dislike ajouté !' }))
            .catch(error => res.status(400).json({ error }));
          break;

        //Suppression du dislike
        case 0:
          if (gif.usersDisliked.includes(idUser)) {
            Gif.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: idUser } })
              .then(() => res.status(200).json({ message: 'Dislike supprimé' }))
              .catch(error => res.status(400).json({ error }));
          } else {

            //Suppression du like
            Gif.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: idUser } })
              .then(() => res.status(200).json({ message: 'Like supprimé' }))
              .catch(error => res.status(400).json({ error }));
          }
          break;
      }
    })
    .catch(error => res.status(404).json({ error }));
}