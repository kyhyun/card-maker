import React from 'react';
import styles from './header.module.css';

const Header = ({ onLogout }) => {
  return (
    <header className={styles.header}>
      {onLogout && (
        <button className={styles.logout} onClick={onLogout}>
          Logout
        </button>
      )}
      <img className={styles.headerImg} src='/images/logo.png' alt='logo' />
      <h2 className={styles.headerText}>Business Card Maker</h2>
    </header>
  );
};

export default Header;
