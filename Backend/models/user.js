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
      models.User.hasMany(models.Gif, 
        { onDelete: 'cascade',
          hooks: true
       }
        );
      models.User.hasMany(models.Comment,
        { onDelete: 'cascade' }
        );
      models.User.hasMany(models.Like, 
        { onDelete: 'cascade' }
      );
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
    photo:{
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    likes: {
      type: DataTypes.INTEGER
    },
    gifId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Gif',
        key: 'id'
      }
    },
    comments: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Comment',
        key: 'id'
      }
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