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
        foreignKey: {
          allowNull: false,
          onDelete: 'cascade',
          hooks: true
        }
      }),
      models.Gif.hasMany(models.Comment,
        { foreignKey: {
          allowNull: false,
          onDelete: 'cascade',
          hooks: true
        }
       }
        );
      models.Gif.hasMany(models.Like);
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
        references: {
          model: 'User',
          key: 'id'
        } 
      },
      title: { 
        type: DataTypes.STRING, 
        allowNull: false ,
      },
      gifs: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      likes: {
        type: DataTypes.INTEGER
      },
      comments: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Comment',
          key: 'id'
        }
      },
    },
    {
      sequelize,
      modelName: 'Gif',
    });
  return Gif;
};