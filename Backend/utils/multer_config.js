//Enregister les gif des utilisateurs dans le dossier gifs avec des extensions spécifiques

const multer = require('multer');

//Extensions des images  acceptées
const MIME_TYPES = {
  'images/gifs/gif': 'gif',
  'images/gifs/png': 'png',
  'images/gifs/jpg': 'jpg',
  'images/gifs/jpeg': 'jpeg',
  'images/profil/png': 'png',
  'images/profil/jpg': 'jpg',
  'images/profil/jpeg': 'jpeg'
};

//Enregistrement des images
const storage = multer.diskStorage({
  destination: (req, file, callback) =>{
    callback(null, 'images/gifs')
    callback(null, 'images/profil')
  },
  filename: (req, file, callback) =>{
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage}).single('gif');
module.exports = multer({storage}).single('photo');


