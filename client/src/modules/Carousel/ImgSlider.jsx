import React, { useState, useEffect } from 'react';
import styles from './ImgSlider.module.css';
import ImgCallOfDutyBlackOpsColdWar from '../../images/ImgCallOfDutyBlackOpsColdWar.png';
import ImgCyberpunk2077 from '../../images/ImgCyberpunk2077.png';
import ImgMinecraft from '../../images/ImgMinecraft.png';
import ImgHogwartsLegacy from '../../images/ImgHogwartsLegacy.png';
import ImgMortalKombat1 from '../../images/ImgMortalKombat1.png';

const images = [
  ImgCallOfDutyBlackOpsColdWar,
  ImgCyberpunk2077,
  ImgMinecraft,
  ImgHogwartsLegacy,
  ImgMortalKombat1,
];

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles['image-slider']}>
      <img
        className={styles['image']} 
        
        src={images[currentImageIndex]}
        alt={`Imagen ${currentImageIndex + 1}`}
      />
    </div>
  );
};

export default ImageSlider;
