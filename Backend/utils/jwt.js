/* const jwt = require('jsonwebtoken');
require('dotenv').config({path: './.env'});

module.exports = {
  generateTokenUser: function(userData){
    return jwt.sign({
      userId: userData.id,
      isAdmin: userData.isAdmin
    },
    process.env.SECRET_TOKEN,
    { expiresIn: '24h'})
  },

  parseAuthorization: function(authorization){
    return (authorization != null) ? authorization.replace('bearer', ''): null;
  },

  getUserId: function(authorization){
    const userId = -1;
    const token = module.exports.parseAuthorization(authorization);

    if(token != null){
      try{
        const jwtToken = jwt.verify(token, process.env.SECRET_TOKEN);
        if(jwtToken != null)
          userId = jwtToken.userId;
      }catch(err){
      }
    }
    return userId;
  }
} */



//Option 2

const jwt = require('jsonwebtoken');
require('dotenv').config({path: './.env'});

module.exports = (req, res, next) =>{
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    //On compare l'id de l'utilisateur pour vérifier son identité
    
      //Si l'id est incorrecte
    if (req.body.userId && req.body.userId !== userId){
      throw 'User id non valable !';

      //Si l'id est bon, l'uilisateur est connecté
    }else{
      next();
    }
  }catch(error){
    res.status(401).json({error: error | 'Requete non authantifiée !'});
  }
};