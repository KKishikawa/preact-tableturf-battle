import { type ComponentChildren } from 'preact';
import { useEffect, useReducer } from 'preact/hooks';

import { toEditCard, getCardList, loadFromQuery } from '@/models/card';

import {
  cardsContext,
  cardsContextInitState,
  cardsDispatchContext,
  type CardsActions,
  type CardsState,
} from './cardsContext';
import { deckCodeLoad } from './deckCodeLoadAction';

const cardReducer = (state: CardsState, action: CardsActions): CardsState => {
  if (action.type === 'init' || !state.initilized) {
    const newState: CardsState = {
      initilized: true,
      id: null,
      editor: getCardList().c.map((v) => toEditCard(v)),
      deck: [],
    };
    return action.type === 'init' ? newState : cardReducer(newState, action);
  }
  switch (action.type) {
    case 'loadDeck': {
      const cleared = cardReducer(state, { type: 'clear' });
      cleared.id = action.payload.id ?? null;
      return cardReducer(cleared, {
        type: 'select',
        payload: {
          add: action.payload.cards,
        },
      });
    }
    case 'select': {
      if (!action.payload.add && !action.payload.del) return state;
      let newList = state.deck.concat(
        action.payload.add?.map((n) => {
          const card = state.editor.find((c) => c.n === n)!;
          card.selected = true;
          return card;
        }) ?? []
      );
      if (action.payload.del) {
        const dels = action.payload.del;
        dels.forEach((n) => {
          const card = state.editor.find((c) => c.n === n)!;
          card.selected = false;
        });
        newList = newList.filter((c) => !dels.includes(c.n));
      }
      return {
        ...state,
        editor: state.editor.concat(),
        deck: newList,
      };
    }
    case 'setid':
      return {
        ...state,
        id: action.payload.id,
      };
    case 'clear': {
      const cards = state.editor.concat();
      cards.forEach((c) => (c.selected = false));
      return {
        ...state,
        id: null,
        editor: cards,
        deck: [],
      };
    }
    default:
      return state;
  }
};
export const CardsProvider = ({
  children,
}: {
  children: ComponentChildren;
}) => {
  const [cards, dispatch] = useReducer(cardReducer, cardsContextInitState);
  useEffect(() => {
    // run after module loaded
    const code = loadFromQuery();
    if (code) {
      deckCodeLoad(dispatch, code);
    } else {
      dispatch({});
    }
  }, []);
  return (
    <cardsContext.Provider value={cards}>
      <cardsDispatchContext.Provider value={dispatch}>
        {children}
      </cardsDispatchContext.Provider>
    </cardsContext.Provider>
  );
};
