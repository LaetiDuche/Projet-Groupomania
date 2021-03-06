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
        foreignKey: 'userId',
        onDelete: 'Cascade'
      }),
      models.Gif.hasMany(models.Comment, {
        onDelete: 'Cascade'
      });
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
        allowNull: false ,
        required: true,
      },
      title: { 
        type: DataTypes.STRING, 
        allowNull: false ,
      },
      gifs: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
    },
    {
      sequelize,
      modelName: 'Gif',
    });
  return Gif;
};

