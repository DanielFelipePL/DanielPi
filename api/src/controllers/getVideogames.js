const axios = require('axios');
const apikey = "d52fbea927044713acc1efed3b0d5e5f";

const getVideogames = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const offset = (page - 1) * pageSize;

    
    const apiUrl = `https://api.rawg.io/api/games?key=${apikey}&page=${page}&page_size=${pageSize}`;

    const response = await axios.get(apiUrl);
    const videogames = response.data.results.map(({ id, name, description, platforms, background_image, released, rating, genres }) => ({
      id,
      name,
      description,
      platforms,
      image: background_image,
      releaseDate: released,
      rating,
      genres
    }));

    return res.status(200).json(videogames);
  } catch (error) {
    console.error('Error al buscar videojuegos:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

module.exports = {
  getVideogames
};
