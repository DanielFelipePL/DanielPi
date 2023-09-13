const { Genres, Videogames } = require('../db');

const createVideoGame = async (req, res) => {
  const { name, Descripcion, Plataformas, Imagen, FechaLanzamiento, Rating, genre } = req.body;

  try {
    const vgFind = await Videogames.findOne({ where: { name } });

    if (vgFind) {
      throw new Error('Ya existe este videojuego');
    }

    let genres;

    if (Array.isArray(genre)) {
      // Si genre es un arreglo, úsalo directamente
      genres = genre.map((g) => g.trim());
    } else if (typeof genre === 'string') {
      // Si genre es una cadena, divídelo en comas y limpia los espacios
      genres = genre.split(',').map((g) => g.trim());
    } else {
      throw new Error('El formato de género no es válido');
    }

    const genreInstances = await Promise.all(
      genres.map(async (genreName) => {
        let genreInstance = await Genres.findOne({ where: { Nombre: genreName } });

        if (!genreInstance) {
          genreInstance = await Genres.create({ Nombre: genreName });
        }

        return genreInstance;
      })
    );

    // Convierte el array de plataformas en una cadena separada por comas
    const plataformasString = Array.isArray(Plataformas) ? Plataformas.join(', ') : Plataformas;

    const videogame = await Videogames.create({
      name,
      Descripcion,
      Plataformas: plataformasString, // Almacena como cadena
      Imagen,
      FechaLanzamiento,
      Rating,
    });

    await videogame.setGenres(genreInstances);

    return res.status(201).json({ message: 'Videojuego creado exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear el videojuego' });
  }
};

module.exports = {
  createVideoGame,
};
