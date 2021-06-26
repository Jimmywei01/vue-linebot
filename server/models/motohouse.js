'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MotoHouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MotoHouse.init({
    image: DataTypes.STRING,
    motoStore: DataTypes.STRING,
    motoCatalog: DataTypes.STRING,
    cc: DataTypes.STRING,
    web: DataTypes.STRING,
    motoData: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'MotoHouse',
  });
  return MotoHouse;
};