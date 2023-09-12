import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function GameDetail() {
  const [game, setGame] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
   
    axios.get(`http://localhost:3001/videogames/${id}`)
      .then((response) => {
        setGame(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del juego:', error);
      });
  }, [id]); 

  if (!game) {
  
    return <div>Cargando...</div>;
  }

  const platformNames = game.platforms.map((platform) => platform.platform.name);

  const genreNames = game.genres.map((genre) => genre.name);

  return (
    <div>
      <h2>{game.name}</h2>
      <img src={game.image} alt={game.name} />
      <p>Descripción: {game.description || 'No disponible'}</p>
      <p>Plataformas: {platformNames.join(', ') || 'No especificadas'}</p>
      <p>Fecha de lanzamiento: {game.releaseDate}</p>
      <p>Calificación: {game.rating}</p>
      <p>Géneros: {genreNames.join(', ') || 'No especificados'}</p>
    </div>
  );
}

export default GameDetail;
