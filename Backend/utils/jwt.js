const jwt = require('jsonwebtoken');
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
}