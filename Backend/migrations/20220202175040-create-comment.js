'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gifsId: {
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
        references:{
          model: 'Users',
          key:'id'
        }
      },
      comment: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Comments');
  }
};