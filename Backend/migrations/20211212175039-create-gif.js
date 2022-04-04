'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Gifs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key:'id',
          onDelete: 'Cascade',
        }
      },     
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gifs: {
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
    await queryInterface.dropTable('Gifs');
  }
};