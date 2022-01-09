'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Gif.belongsTo(models.User,{
        foreignKey: {
          allowNull: false,
        }
      })
    }
  };
  Gif.init(
    {
    /* userId: DataTypes.INTEGER, */
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    gifs: {
      type: DataTypes.STRING,
      
    },

   /*  content: DataTypes.STRING, */
    /* likes: DataTypes.INTEGER */
  }, 
  {
    sequelize,
    modelName: 'Gif',
  });
  return Gif;
};