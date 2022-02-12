'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Weather extends Model {

    static associate(models) {
      // define association here
    }
  };
  Weather.init({
    cityName: {
      type: DataTypes.STRING
    },
    cityDt: {
      type: DataTypes.STRING
    },
    temp: {
      type: DataTypes.STRING
    },
    icon: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    maxTemp: {
      type: DataTypes.STRING
    },
    minTemp: {
      type: DataTypes.STRING
    },
    pressure: {
      type: DataTypes.STRING
    },
    humidity: {
      type: DataTypes.STRING
    },
    sunrise: {
      type: DataTypes.STRING
    },
    sunset: {
      type: DataTypes.STRING
    },
    windSpeed: {
      type: DataTypes.STRING
    },
    currentCityId: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Weather',
  });
  return Weather;
};
