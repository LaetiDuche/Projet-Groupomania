'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here

      /* models.User.belongsToMany(models.Gif, {
        through: models.Comment,
        foreignKey: 'gifId ',
        otherKey: 'userId'
      }),

      models.Gif.belongsToMany(models.User, {
        through: models.Comment,
        foreignKey: 'userId',
        otherKey: 'gifId'
      }) */

      models.Comment.belongsTo(models.Gif,{
        foreignKey: 'gifId',
         as: 'gif'
      }),
      models.Comment.belongsTo(models.User,{
        foreignKey: 'userId',
         /* as: 'user' */
      })
    }
  };
  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
    }
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
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};