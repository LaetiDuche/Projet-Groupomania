'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Gif);
    }
  };
  User.init(
    {
    email: {
      type: DataTypes.STRING,
      unique: true, 
      allowNull: false
    },
    username:{
      type:  DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    }, 
    isAdmin:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, 
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};