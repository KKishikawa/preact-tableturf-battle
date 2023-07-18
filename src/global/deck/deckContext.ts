import { createContext } from 'preact';
import { type Dispatch } from 'preact/hooks';

import { type IEditDeck, type IDeck } from '@/models/card';

export type DeckActions =
  | {
      type: 'add';
      payload: { value: IEditDeck };
    }
  | {
      type: 'delete';
      payload: { id: string };
    }
  | {
      type: 'replace';
      payload: { value: IEditDeck; id: string };
    }
  | {
      type: 'replaceAll';
      payload: { values: IDeck[] };
    }
  | {
      type: 'save';
    };

export const deckContext = createContext<IEditDeck[]>([]);
export const deckDispatchContext = createContext<Dispatch<DeckActions>>(
  () => undefined
);
