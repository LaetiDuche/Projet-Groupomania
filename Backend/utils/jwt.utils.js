const jwt = require('jsonwebtoken');
require('dotenv').config({path: './.env'});

module.exports = {
  generateTokenUser: function(userData){
    return jwt.sign({
      userId: userData.id,
      isAdmin: userData.isAdmin
    },
    SECRET_TOKEN,{
      expiresIn: '24h'
    })
  }
}