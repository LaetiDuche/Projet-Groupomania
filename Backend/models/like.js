'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Gif,{
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'gifsId'
      });

      models.Gif.belongsToMany(models.User,{
        through: models.Like,
        foreignKey: 'gifsId',
        otherKey: 'userId'
      });

      models.Like.belongsTo(models.User,{
        foreignKey: 'userId',
        as: 'user'
      });

      models.Like.belongsTo(models.Gif,{
        foreignKey: 'gifsId',
        as: 'gif'
      });
    }
  };
  Like.init({
    gifsId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Gif',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    likes: {
      type: DataTypes.INTEGER
    },
    dislikes: {
      type: DataTypes.INTEGER
    },
    usersLiked: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usersDisliked: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  
  {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};