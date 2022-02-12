'use strict';
const {
  Model
} = require('sequelize');
// const {User} = require('../models')
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  };
  Favorite.init({
    cityWeatherData: {
      type: DataTypes.STRING
    },
    currentCityId: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};
