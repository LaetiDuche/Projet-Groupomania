'use strict';
module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gifId: {
        allowNull: false,
				type: Sequelize.STRING,
        refrences: {
          model: 'Gif',
          key: 'id'
        }
			},
      comments: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Comment',
          key:'id'
        }
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      likes: {
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
  down:  (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};