import React, { memo } from 'react';
import styles from './button.module.css';

const Button = memo(({ name, onClick }) => {
  return (
    <div className={styles.button} onClick={onClick}>
      {name}
    </div>
  );
});

export default Button;
