import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CreateVideoGameForm.module.css';

const CreateVideoGameForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    Descripcion: '',
    Imagen: '',
    Plataformas: [],
    FechaLanzamiento: '',
    Rating: '',
    genre: [],
  });

  const [genres, setGenres] = useState([]);
  const [platformOptions] = useState([
    'PC',
    'PlayStation',
    'PlayStation 4',
    'PlayStation 5',
    'Xbox',
    'Xbox One',
    'Xbox Series S/X',
    'iOS',
    'Android',
    'Apple Macintosh',
    'Linux',
    'Nintendo',
    'Web',
  ]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtener géneros desde el servidor local
    axios.get('http://localhost:3001/genres')
      .then((response) => {
        setGenres(response.data);
      })
      .catch((err) => {
        setError('Error al cargar los géneros.');
        console.error(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePlatformChange = (e) => {
    const selectedPlatform = e.target.value;
    const isPlatformSelected = formData.Plataformas.includes(selectedPlatform);
    
    setFormData((prevData) => ({
      ...prevData,
      Plataformas: isPlatformSelected
        ? prevData.Plataformas.filter((platform) => platform !== selectedPlatform)
        : [...prevData.Plataformas, selectedPlatform],
    }));
  };

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    const isGenreSelected = formData.genre.includes(selectedGenre);

    setFormData((prevData) => ({
      ...prevData,
      genre: isGenreSelected
        ? prevData.genre.filter((genre) => genre !== selectedGenre)
        : [...prevData.genre, selectedGenre],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envía los datos al servidor local para crear el videojuego
    axios.post('http://localhost:3001/createvideogame', formData)
      .then((response) => {
        console.log('Videojuego creado exitosamente:', response.data);
        // Restablece el formulario o realiza otras acciones necesarias después de la creación.
      })
      .catch((err) => {
        setError('Error al crear el videojuego.');
        console.error(err);
      });
  };

  return (
    <div className={styles.formContainer}>
      <h2>Crear un nuevo videojuego</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className={styles.label}>
          Nombre:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className={styles.inputField}
        />

        <label htmlFor="Descripcion" className={styles.label}>
          Descripción:
        </label>
        <textarea
          id="Descripcion"
          name="Descripcion"
          value={formData.Descripcion}
          onChange={handleInputChange}
          required
          className={styles.textareaField}
        />

        <label htmlFor="Imagen" className={styles.label}>
          Imagen URL:
        </label>
        <input
          type="url"
          id="Imagen"
          name="Imagen"
          value={formData.Imagen}
          onChange={handleInputChange}
          required
          className={styles.inputField}
        />

        <label htmlFor="Plataformas" className={styles.label}>
          Plataformas:
        </label>
        <select
          id="Plataformas"
          name="Plataformas"
          multiple
          value={formData.Plataformas}
          onChange={handlePlatformChange}
          className={`${styles.selectField} ${styles.multiSelect}`}
        >
          {platformOptions.map((platform) => (
            <option
              key={platform}
              value={platform}
              selected={formData.Plataformas.includes(platform)}
            >
              {platform}
            </option>
          ))}
        </select>

        <label htmlFor="FechaLanzamiento" className={styles.label}>
          Fecha de Lanzamiento:
        </label>
        <input
          type="date"
          id="FechaLanzamiento"
          name="FechaLanzamiento"
          value={formData.FechaLanzamiento}
          onChange={handleInputChange}
          required
          className={styles.inputField}
        />

        <label htmlFor="Rating" className={styles.label}>
          Rating:
        </label>
        <input
          type="number"
          id="Rating"
          name="Rating"
          min="1"
          max="10"
          step="0.1"
          value={formData.Rating}
          onChange={handleInputChange}
          required
          className={styles.inputField}
        />

        <label htmlFor="genre" className={styles.label}>
          Géneros:
        </label>
        <select
          id="genre"
          name="genre"
          multiple
          value={formData.genre}
          onChange={handleGenreChange}
          className={`${styles.selectField} ${styles.multiSelect}`}
        >
          {genres.map((genre) => (
            <option
              key={genre.ID}
              value={genre.Nombre}
              selected={formData.genre.includes(genre.Nombre)}
              className={formData.genre.includes(genre.Nombre) ? styles.selectedOption : ''}
            >
              {genre.Nombre}
            </option>
          ))}
        </select>

        <button type="submit" className={styles.button}>
          Crear Videojuego
        </button>
      </form>
    </div>
  );
};

export default CreateVideoGameForm;
