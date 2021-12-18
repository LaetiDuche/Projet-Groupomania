'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      gifId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        refrences: {
          model: 'Gifs',
          key: 'id'
        }
      },

      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        refrences:{
          model: 'Users',
          key: 'id'
        }
      },

      isLike : {
        allowNull: false,
        type: Sequelize.INTEGER
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Likes');
  }
};