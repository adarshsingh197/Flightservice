"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City, {
        foreignKey: "cityId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Airport.init(
    {
      name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },

      code: {
        unique: true,
        type: DataTypes.STRING,
      },

      address: {
        unique: true,
        type: DataTypes.STRING,
      },

      cityId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Airport",
    }
  );
  return Airport;
};
