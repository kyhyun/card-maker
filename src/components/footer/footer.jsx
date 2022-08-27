import React, { memo } from 'react';
import styles from './footer.module.css';
const Footer = memo(() => {
  return (
    <div className={styles.footer}>
      <p className={styles.title}>Code Your Dream</p>
    </div>
  );
});

export default Footer;
