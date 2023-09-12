import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }

    
    axios.get(`http://localhost:3001/videogames/search/${query}`)
      .then((response) => {
        
        onSearch(response.data);
      })
      .catch((error) => {
        console.error('Error al buscar videojuegos:', error);
      });
  }, [query, onSearch]);

  return (
    <div className={styles.container}>
      <input
      className={styles.input}
      type="text"
      placeholder="Buscar videojuegos..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <div className={styles.search}></div>
    </div>
    
  );
}

export default SearchBar;
