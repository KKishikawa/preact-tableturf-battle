import { type Dispatch } from 'preact/hooks';

import { type CardsActions } from '@/global/cards/cardsContext';
import { decodeDeckCode } from '@/models/card';
import { isValidString } from '@/utils';
import { message } from '@/utils/message';


export function deckCodeLoad(
  cardDispatcher: Dispatch<CardsActions>,
  code: string
) {
  if (!isValidString(code)) return;
  try {
    const cards = decodeDeckCode(code);
    if (cards.length < 1) {
      message.warn('デッキコードが正しくありません。');
    } else {
      message.success('デッキを読み込みました。');
    }
    cardDispatcher({ type: 'loadDeck', payload: { cards: cards } });
  } catch (error) {
    message.error('デッキの読み込みに失敗しました。');
  }
}
