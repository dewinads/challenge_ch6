'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Biodata.belongsTo(models.UserGame, {
        foreignKey: "userGamesId",
        as: "userGame",
      });
    }
  }
  Biodata.init({
    fullName: DataTypes.STRING,
    address: DataTypes.TEXT,
    gender: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    userGameId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Biodata',
  });
  return Biodata;
};