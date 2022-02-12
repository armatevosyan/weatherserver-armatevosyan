'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Weather', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cityName: {
        type: Sequelize.STRING
      },
      cityDt: {
        type: Sequelize.STRING
      },
      temp: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      maxTemp: {
        type: Sequelize.STRING
      },
      minTemp: {
        type: Sequelize.STRING
      },
      pressure: {
        type: Sequelize.STRING
      },
      humidity: {
        type: Sequelize.STRING
      },
      sunrise: {
        type: Sequelize.STRING
      },
      sunset: {
        type: Sequelize.STRING
      },
      windSpeed: {
        type: Sequelize.STRING
      },
      currentCityId: {
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
    await queryInterface.dropTable('Weather');
  }
};
