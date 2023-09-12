const { Genres, Videogames } = require('../db'); 

const createVideoGame = async (req, res) => { 
  const { name, Descripcion, Plataformas, Imagen, FechaLanzamiento, Rating, genre } = req.body;

  try {
    const vgFind = await Videogames.findOne({ where: { name } });

    if (vgFind) {
      throw new Error('Ya existe este videojuego');
    }

    const idGenre = await Genres.findOne({ where: { Nombre: genre } }); 

    if (!idGenre) {
      throw new Error('El género especificado no existe en la base de datos');
    }

    const videogame = await Videogames.create({
      name,
      Descripcion,
      Plataformas,
      Imagen,
      FechaLanzamiento,
      Rating,
    });

    // Asociar el género al videojuego
    await videogame.addGenre(idGenre);

    return res.status(201).json({ message: 'Videojuego creado exitosamente' }); // Cambia el mensaje a un objeto JSON
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear el videojuego' }); // Cambia el mensaje de error a un objeto JSON y establece un código de estado 500
  }
};

module.exports = {
  createVideoGame,
};