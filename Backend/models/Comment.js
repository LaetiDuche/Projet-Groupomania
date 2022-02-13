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
         foreignKey: 'userId',
       }),
       models.Comment.belongsTo(models.Gif, {
         foreignKey: 'gifsId'
       })
    }
  };
  Comment.init({
    userId: DataTypes.INTEGER,
    gifsId: DataTypes.INTEGER,
    /* username: DataTypes.STRING, */
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};