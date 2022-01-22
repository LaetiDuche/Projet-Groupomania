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
      models.Gif.belongsTo(models.User, {
        /* foreignKey: {
          allowNull: true,
        } */
      })
    }
  };
  Gif.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        required: true
      },
      userId: {
        type: DataTypes.INTEGER,
        required: true
      },
      title: { 
        type: DataTypes.STRING, 
        allowNull: false ,
        trim: true
      },
      gifs: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      likes: {
        type: DataTypes.INTEGER
      },
    },
    {
      sequelize,
      modelName: 'Gif',
    });
  return Gif;
};