'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          onDelete: 'cascade',
          hooks: true
        }
      });
      models.Comment.belongsTo(models.Gif, {
        foreignKey: {
          allowNull: false,
          onDelete: 'cascade',
          hooks: true
        }
      });
      /* models.Comment.hasMany(models.Gif); */

      /* models.User.belongsToMany(models.Gif,{
        through: models.Comment,
        foreignKey: 'userId',
        otherKey: 'gifId'
      });
      models.Gif.belongsToMany(models.User,{
        through: models.Comment,
        foreignKey: 'gifId',
        otherKey: 'userId'
      }); */


      /*  models.Comment.belongsTo(models.Gif, {
         foreignKey: {
          allowNull: false,
        }
       }) */
    }
  };
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      required: true
    },
    /* userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    gifId: {
      type: DataTypes.STRING,
      references: {
        model: 'Gif',
        key: 'id'
      }
    }, */
    comments: {
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