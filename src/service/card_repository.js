import { firebaseDatabase } from './firebase';

class CardRepository {
  syncCards(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`${userId}/cards`);
    ref.on('value', (snapshot) => {
      const value = snapshot?.val();
      value && onUpdate(value);
    });
    return () => {
      // cleanUp 으로 컴포넌트가 unmount 됐을 때, 호출되는 함수로 메모리 등의 정리를 수행
      ref.off();
    };
  }

  saveCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).set(card);
  }
  removeCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).remove();
  }
}

export default CardRepository;
