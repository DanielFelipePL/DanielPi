import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../Carousel/ImgSlider';
import styles from './Landing.module.css';


function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <h1>Tu Fuente de Conocimiento <span className={styles.redText}>\Gamer</span></h1>

        <p className={styles.blueText} >Descubre el Mundo de los Videojuegos</p>

        <p>Explora el fascinante universo de los videojuegos. Nuestra página es tu puerta de entrada a un mundo de información detallada, noticias emocionantes y análisis expertos. ¿Listo para sumergirte en el conocimiento gamer? </p>

        <p className={styles.blueText}>¡Descubre aqui ↓!</p>
        
        <Link to="/home">
          <button>Estoy Listo</button>
        </Link>

      </div>
      <div className={styles.rightContent}>
        <ImageSlider />
      </div>
    </div>
  );
}

export default Landing;
