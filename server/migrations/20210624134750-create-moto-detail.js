'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MotoDetails', {
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
      engine: {
        type: Sequelize.STRING
      },
      cc: {
        type: Sequelize.STRING
      },
      variable: {
        type: Sequelize.STRING
      },
      oil: {
        type: Sequelize.STRING
      },
      brake: {
        type: Sequelize.STRING
      },
      web: {
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
    await queryInterface.dropTable('MotoDetails');
  }
};