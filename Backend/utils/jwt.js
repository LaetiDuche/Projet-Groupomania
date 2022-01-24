const jwt = require('jsonwebtoken');
require('dotenv').config({path: './.env'});

module.exports = (req, res, next) =>{
  
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    req.userId = userId

    //On compare l'id de l'utilisateur pour vérifier son identité
    
      //Si l'id est incorrecte
    if (req.body.userId && req.body.userId !== userId){
      console.log("toto1")
      throw 'User id non valable !';

      //Si l'id est bon, l'uilisateur est connecté
    }else{
      console.log("toto2")
      next();
    }
  }catch(error){
    console.log("toto3")
    res.status(401).json({error: error | 'Requete non authantifiée !'});
  }
};