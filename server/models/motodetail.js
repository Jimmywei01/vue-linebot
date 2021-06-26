'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MotoDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MotoDetail.init({
    image: DataTypes.STRING,
    motoStore: DataTypes.STRING,
    motoCatalog: DataTypes.STRING,
    engine: DataTypes.STRING,
    cc: DataTypes.STRING,
    variable: DataTypes.STRING,
    oil: DataTypes.STRING,
    brake: DataTypes.STRING,
    web: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MotoDetail',
  });
  return MotoDetail;
};