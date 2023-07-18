import { type ComponentChildren } from 'preact';
import { useEffect, useReducer } from 'preact/hooks';

import {
  saveToLS,
  type IEditDeck,
  generateDeckId,
  loadFromLS,
} from '@/models/card';

import {
  deckContext,
  deckDispatchContext,
  type DeckActions,
} from './deckContext';

const deckReducer = (state: IEditDeck[], action: DeckActions): IEditDeck[] => {
  switch (action.type) {
    case 'add': {
      const newState = state.concat();
      newState.push(action.payload.value);
      return newState;
    }
    case 'delete': {
      const idx = state.findIndex((d) => d.id === action.payload.id);
      if (idx > -1) {
        const newState = state.concat();
        newState.splice(idx, 1);
        return newState;
      }
      return state;
    }
    case 'replaceAll':
      return action.payload.values.map((deck) => ({
        ...deck,
        id: generateDeckId(),
      }));
    case 'replace': {
      const idx = state.findIndex((d) => d.id === action.payload.id);
      if (idx > -1) {
        const newState = state.concat();
        newState.splice(idx, 1, action.payload.value);
        return newState;
      }
      return state;
    }
    case 'save': {
      saveToLS(state);
      return state;
    }
    default:
      return state;
  }
};

export const DeckProvider = ({ children }: { children: ComponentChildren }) => {
  const [decks, dispatch] = useReducer(deckReducer, []);
  useEffect(() => {
    const data = loadFromLS();
    dispatch({ type: 'replaceAll', payload: { values: data } });
  }, []);
  return (
    <deckContext.Provider value={decks}>
      <deckDispatchContext.Provider value={dispatch}>
        {children}
      </deckDispatchContext.Provider>
    </deckContext.Provider>
  );
};
