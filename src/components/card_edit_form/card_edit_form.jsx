import React, { useRef } from 'react';
import styles from './card_edit_form.module.css';
import Button from '../button/button';

const CardEditForm = ({ FileInput, card, updateCard, deleteCard }) => {
  const nameRef = useRef();
  const companyRef = useRef();
  const themeRef = useRef();
  const titleRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const { name, company, theme, title, email, message, fileName } = card;

  const onSubmit = () => {
    deleteCard(card);
  };

  const onChange = (e) => {
    if (e.currentTarget.value === null) {
      return;
    }
    e.preventDefault();
    updateCard({
      ...card,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onFileChange = (file) => {
    updateCard({
      ...card,
      fileName: file.name,
      fileUrl: file.url,
    });
  };

  return (
    <section className={styles.cardEditForm}>
      <form className={styles.form}>
        <input ref={nameRef} className={styles.input} type='text' name='name' value={name} onChange={onChange} />
        <input
          ref={companyRef}
          className={styles.input}
          type='text'
          name='company'
          value={company}
          onChange={onChange}
        />
        <select ref={themeRef} className={styles.select} name='theme' value={theme} onChange={onChange}>
          <option value='dark'>dark</option>
          <option value='light'>light</option>
          <option value='colorful'>colorful</option>
        </select>
        <input ref={titleRef} className={styles.input} type='text' name='title' value={title} onChange={onChange} />
        <input ref={emailRef} className={styles.input} type='text' name='email' value={email} onChange={onChange} />
        <textarea
          ref={messageRef}
          className={styles.textarea}
          name='message'
          value={message}
          onChange={onChange}
        ></textarea>
        <div className={styles.fileInput}>
          <FileInput name={fileName} onFileChange={onFileChange} />
        </div>
        <Button className={styles.button} name='Delete' onClick={onSubmit} />
      </form>
    </section>
  );
};

export default CardEditForm;
