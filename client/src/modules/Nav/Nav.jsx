import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {
  const indicatorRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const indicator = indicatorRef.current;
    const items = itemsRef.current;

    function handleIndicator(el) {
      items.forEach(item => {
        item.classList.remove(styles['is-active']);
        item.removeAttribute('style');
      });

      indicator.style.width = `${el.offsetWidth}px`;
      indicator.style.left = `${el.offsetLeft}px`;
      indicator.style.backgroundColor = el.getAttribute('active-color');

      el.classList.add(styles['is-active']);
      el.style.color = el.getAttribute('active-color');
    }

    items.forEach((item) => {
      item.addEventListener('click', (e) => handleIndicator(e.target));
      item.classList.contains(styles['is-active']) && handleIndicator(item);
    });

    return () => {
      items.forEach(item => {
        item.removeEventListener('click', (e) => handleIndicator(e.target));
      });
    };
  }, []);

  return (
    <div>
      <nav className={styles.nav}>
        <NavLink to='/home' className={`${styles['nav-item']} ${styles['is-active']}`} active-color="crimson" ref={(el) => itemsRef.current[0] = el}>Home</NavLink>

        <NavLink to='/about' className={styles['nav-item']} active-color="rebeccapurple" ref={(el) => itemsRef.current[3] = el}>About</NavLink>

        <NavLink to='/create' className={styles['nav-item']} active-color="rebeccapurple" ref={(el) => itemsRef.current[5] = el}>Create</NavLink>

        <span className={styles['nav-indicator']} ref={indicatorRef}></span>
      </nav>
    </div>
  );
};

export default Nav;



