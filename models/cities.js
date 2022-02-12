'use strict';
const {
  Model
} = require('sequelize');
const {User} = require('../models')
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  };
  City.init({
    cityName: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};