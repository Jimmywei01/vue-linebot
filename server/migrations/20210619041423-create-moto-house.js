'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MotoHouses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      motoStore: {
        type: Sequelize.STRING
      },
      motoCatalog: {
        type: Sequelize.STRING
      },
      cc: {
        type: Sequelize.STRING
      },
      web: {
        type: Sequelize.STRING
      },
      motoData: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('MotoHouses');
  }
};