'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /*
      models.User.belongsToMany(models.Gif,{
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'gifId'
      });
*/
      /*models.Gif.belongsToMany(models.User,{
        through: models.Like,
        foreignKey: 'gifId',
        otherKey: 'userId'
      });*/

      models.Like.belongsTo(models.User,{
        foreignKey: 'userId'/* ,
        as: 'user' */
      });

      models.Like.belongsTo(models.Gif,{
        foreignKey: 'gifId'/* ,
        as: 'gif' */
      });
    }
  };
  Like.init({
    gifId: {
      type:DataTypes.INTEGER,
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
    /* liked: DataTypes.INTEGER */
  },
   {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};