const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Raza', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    min_height: {
      type: DataTypes.FLOAT(2),
      allowNull: false,
    },
    max_height: {
      type: DataTypes.FLOAT(2),
      allowNull: false,
    },
    min_weight: {
      type: DataTypes.FLOAT(3),
      allowNull: false,
    },
    max_weight: {
      type: DataTypes.FLOAT(3),
      allowNull: false,
    },
    min_life_span: {
      type: DataTypes.FLOAT(3),
    },
    max_life_span: {
      type: DataTypes.FLOAT(3),
    },
    image: {
      type: DataTypes.STRING(),
    }
  }, { timestamps: false });

  sequelize.define('Temperamento', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, { timestamps: false });
};