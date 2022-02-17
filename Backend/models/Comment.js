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
      /*
      models.User.belongsToMany(models.Gif,{
        through: models.Comment,
        foreignKey: 'userId',
        otherKey: 'gifsId'
      });
      models.Gif.belongsToMany(models.User,{
        through: models.Comment,
        foreignKey: 'gifsId',
        otherKey: 'userId'
      });
      */
      models.Comment.belongsTo(models.User, {
         foreignKey: {
          allowNull: false,
        }
       }),
       models.Comment.belongsTo(models.Gif, {
         foreignKey: {
          allowNull: false,
        }
       })
    }
  };
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      required: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gifsId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, 
  {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};