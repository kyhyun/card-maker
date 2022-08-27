import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ authService, FileInput, cardRepository }) => {
  const location = useLocation();
  const locationState = location?.state;
  const navigate = useNavigate();
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(locationState && locationState.id);

  const onLogout = () => {
    authService.logout();
  };

  // async 사용자가 로그인 된 경우 해당 id의 데이터를 계속 유지하기 위해 추적할 수 있도록 처리
  useEffect(() => {
    if (!userId) { // 사용자 아이디가 없다면 그대로 빈 값 반환
      return;
    }
    const stopSync = cardRepository.syncCards(userId, (cards) => {
      setCards(cards);
    });
    return () => stopSync();

    // 데이터가 업데이트 될 때마다, 2번째 인자의 콜백 함수를 계속 호출해서 카드의 컴포넌트를 업데이트 해준다.
  }, [userId]);

  // 사용자 카드가 업데이트 될 때마다, 사용자 id를 이용해서 카드가 사용자 아이디 별로 생성될 수 있도록 처리해야함
  // 로그인을 할 때 history에 id를 전달
  // 전달된 history의 location 안의 state에 사용자 id를 Maker 컴포넌트안에 state로 저장

  useEffect(() => {
    // 정보가 변경돨 때 콜백 함수가 호출이 되기 때문에 그에 따라 변경돠는 setUserId를 해주어야 함
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
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
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
