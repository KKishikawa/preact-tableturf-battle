import { createContext } from 'preact';
import { type Dispatch } from 'preact/hooks';

import { type EditCard } from '@/models/card';

export type CardsActions =
  | {
      type: 'loadDeck';
      payload: { cards: number[]; id?: string };
    }
  | {
      type: 'select';
      payload: { add?: number[]; del?: number[] };
    }
  | {
      type: 'clear';
    }
  | { type: 'setid'; payload: { id: string } }
  | {
      type: 'init';
    }
  | { type?: never };
export type CardsState = {
  id: string | null;
  initilized: boolean;
  editor: EditCard[];
  deck: EditCard[];
};
export const cardsContextInitState: CardsState = {
  id: null,
  initilized: false,
  editor: [],
  deck: [],
};
export const cardsContext = createContext<CardsState>(cardsContextInitState);
export const cardsDispatchContext = createContext<Dispatch<CardsActions>>(
  () => undefined
);
