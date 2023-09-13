import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css';

function Home() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1); // Página actual
  const [pageSize] = useState(15); // Tamaño de página fijo
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(''); // Filtro de género
  const [sortBy, setSortBy] = useState(''); // Orden alfabético
  const [genres, setGenres] = useState([]); // Lista de géneros

  const loadGames = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`
      );
      setGames(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de videojuegos:', error);
    }
  }, [page, pageSize, sortBy]);

  useEffect(() => {
    loadGames(); // Llama a la función loadGames dentro del useEffect
  }, [loadGames]);

  useEffect(() => {
    // Obtener la lista de géneros
    axios.get('http://localhost:3001/genres')
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de géneros:', error);
      });
  }, []);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleGenreChange = (event) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
  };

  const handleSortChange = (event) => {
    const sortOption = event.target.value;
    setSortBy(sortOption);
  };

  const filteredGames = () => {
    let filtered = searchResults.length > 0 ? searchResults : games;

    if (selectedGenre) {
      filtered = filtered.filter((game) =>
        game.genres.some((genre) => genre.name === selectedGenre)
      );
    }

    if (sortBy === 'asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  };

  return (
    <div className={styles.search}>
      <SearchBar
        onSearch={handleSearch}
      />
      <div>
        <h2>Videojuegos</h2>

        {/* Filtros y orden */}
        <div className={styles.filters}>
          <div className={styles.filterGender}>
            <label htmlFor="genre">Filtrar por género:</label>
            <select
              id="genre"
              value={selectedGenre}
              onChange={handleGenreChange}
            >
              <option value="">Todos</option>
              {genres.map((genre) => (
                <option key={genre.ID} value={genre.Nombre}>
                  {genre.Nombre}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterAZ}>
            <label htmlFor="sortBy">Ordenar alfabéticamente:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="">Sin orden</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
        </div>

        <div className={styles.gameList}>
          {filteredGames().map((game) => (
            <div key={game.id} className={styles.card}>
              <Link to={`/detail/${game.id}`}>
                <img src={game.image} alt={game.name} className={styles.img} />
                <h3>{game.name}</h3>
              </Link>
              <p>
                Géneros: {game.genres ? game.genres.map((genre) => genre.name).join(', ') : 'No especificados'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Controles de paginación */}
      <div className={styles.pagination}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={games.length < pageSize}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Home;
