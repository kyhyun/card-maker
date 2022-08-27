import React, { useRef, useState, memo } from 'react';
import styles from './image_file_input.module.css';

const ImageFileInput = memo(({ imageUploader, name, onFileChange }) => {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const onChange = async (e) => {
    setLoading(true);
    const uploaded = await imageUploader.upload(e.currentTarget.files[0]);
    setLoading(false);
    onFileChange({
      name: uploaded.original_filename,
      url: uploaded.url,
    });
  };

  return (
    <div className={styles.container}>
      <input type='file' accept='image/*' name='file' ref={inputRef} className={styles.fileInput} onChange={onChange} />
      {!loading && (
        <button className={`${styles.button} ${!name || styles.pink}`} onClick={onButtonClick}>
          {name || 'No file'}
        </button>
      )}
      {loading && <div className={styles.loading}></div>}
    </div>
  );
});

export default ImageFileInput;
