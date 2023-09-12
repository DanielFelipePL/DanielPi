const axios = require('axios');
const apikey = "d52fbea927044713acc1efed3b0d5e5f";

const getVideogameById = (req, res) => {
    const { id } = req.params;
    axios.get(`https://api.rawg.io/api/games/${id}?key=${apikey}`)
      .then((response) => {
        const videogame =  {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          platforms: response.data.platforms,
          image: response.data.background_image,
          releaseDate: response.data.released,
          rating: response.data.rating,
          genres: response.data.genres
        };
  
        if (videogame.name) {
          return res.status(200).json(videogame);
        } else {
          return res.status(404).send('No se encontró el videojuego.');
        }
      })
      .catch((error) => res.status(500).send(error.message));
  };


module.exports = {
    getVideogameById
};