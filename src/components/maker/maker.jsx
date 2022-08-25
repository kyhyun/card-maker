import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ authService }) => {
  const [cards, setCards] = useState({
    1: {
      id: 1,
      name: 'yononi',
      company: 'white-hand',
      theme: 'dark',
      title: 'Software Engineer',
      email: 'k29176@naver.com',
      message: '제발 취업 시켜주세요 .. 찌휴',
      fileName: 'yononi',
      fileUrl: null,
    },
    2: {
      id: 2,
      name: 'dauny',
      company: 'jong-ken-dang',
      theme: 'light',
      title: 'pharmaceutical company QC',
      email: 'jdw@naver.com',
      message: '찌찌주인',
      fileName: 'dauny',
      fileUrl: null,
    },
    3: {
      id: 3,
      name: 'chocho',
      company: 'myHome',
      theme: 'colorful',
      title: 'dog',
      email: 'mungmung@naver.com',
      message: 'urrrr wang',
      fileName: 'dog',
      fileUrl: null,
    },
  });

  const navigate = useNavigate();
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        navigate('/');
      }
    });
  });

  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
