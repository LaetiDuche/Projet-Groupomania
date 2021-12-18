//Enregister les gif des utilisateurs dans le dossier gifs avec des extensions spécifiques

const multer = require('multer');

//Extensions des images acceptées
const MIME_TYPES = {
  'gifs/gif': 'gif',
};

//Enregistrement des images dans le dossier
const storage = multer.diskStorage({
  destination: (req, file, callback) =>{
    callback(null, 'gifs')
  },
  filename: (req, file, callback) =>{
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage}).single('gif');