const { DataTypes } = require('sequelize');

module.exports = (conn) => {
  const Genres = conn.define('Genres', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Genres;
};
