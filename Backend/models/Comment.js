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
      models.Comment.belongsTo(models.Gif,{
        foreignKey: 'gifId',
        onDelete: 'cascade'
      }),
      models.Comment.belongsTo(models.User,{
        foreignKey: 'userId',
        onDelete: 'cascade'
      })
    }
  };
  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
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