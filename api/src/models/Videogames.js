const { DataTypes } = require('sequelize');

module.exports = (conn) => {
  const Videogames = conn.define('Videogames', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Plataformas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaLanzamiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Rating: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
    },
  });

  return Videogames;
};
