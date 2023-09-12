const axios = require('axios');
const { Genres } = require('../db'); 

const apikey = "d52fbea927044713acc1efed3b0d5e5f";

const getGenres = async (req, res) => {
  try {
  
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${apikey}`);
    console.log("Respuesta de la API:", response.data);

    const genresData = response.data.results.map((genre) => ({
      Nombre: genre.name,
      ID: genre.id,
    }));

    for (const genre of genresData) {
      const existingGenre = await Genres.findOne({ where: { ID: genre.ID } });
      if (!existingGenre) {
        await Genres.create(genre);
      }
    }

    res.json(genresData);
  } catch (error) {
    console.error("Error al obtener los géneros:", error);
    res.status(500).json({ error: "Hubo un error al obtener los géneros." });
  }
}

module.exports = {
  getGenres,
};
