const axios = require('axios');
const apikey = "d52fbea927044713acc1efed3b0d5e5f";
const getVideogameByName = async (req, res) => {
  try {
    const { name } = req.params;
    const query = name.toLowerCase(); 
    const apiResponse = await axios.get(`https://api.rawg.io/api/games?key=${apikey}&search=${query}`);
    const apiGames = apiResponse.data.results;

    if (apiGames.length === 0) {
      return res.status(404).json({ message: 'No se encontraron videojuegos.' });
    }

    const first15Results = apiGames.slice(0, 15);

    const mappedResults = first15Results.map((result) => ({
      id: result.id,
      name: result.name,
      description: result.description,
      platforms: result.platforms,
      image: result.background_image,
      releaseDate: result.released,
      rating: result.rating,
      genres: result.genres
    }));

    return res.status(200).json(mappedResults);
  } catch (error) {
    console.error('Error al buscar videojuegos:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

module.exports = {
  getVideogameByName
};
