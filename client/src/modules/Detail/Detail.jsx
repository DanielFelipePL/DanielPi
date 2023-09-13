import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';

function GameDetail() {
  const [game, setGame] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/videogames/${id}`)
      .then((response) => {
        setGame(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del juego:', error);
      });
  }, [id]);

  if (!game) {
    return <div className={styles.gameDetailContainer}>Cargando...</div>;
  }

  const platformNames = game.platforms.map((platform) => platform.platform.name);

  const genreNames = game.genres.map((genre) => genre.name);

  return (
    <div className={styles.gameDetailContainer}>
      <h2>{game.name}</h2>
      <img src={game.image} alt={game.name} className={styles.gameImage} />
      <p>
        <strong>Descripción:</strong> {game.description || <span className={styles.noDataMessage}>No disponible</span>}
      </p>
      <p>
        <strong>Plataformas:</strong> {platformNames.join(', ') || <span className={styles.noDataMessage}>No especificadas</span>}
      </p>
      <p>
        <strong>Fecha de lanzamiento:</strong> {game.releaseDate || <span className={styles.noDataMessage}>No especificada</span>}
      </p>
      <p>
        <strong>Calificación:</strong> {game.rating || <span className={styles.noDataMessage}>No especificada</span>}
      </p>
      <p>
        <strong>Géneros:</strong> {genreNames.join(', ') || <span className={styles.noDataMessage}>No especificados</span>}
      </p>
    </div>
  );
}

export default GameDetail;
