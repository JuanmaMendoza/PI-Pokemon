const { DataTypes, Sequelize } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Type', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  { timestamps: false }
  )
}