import { useMemo, useContext, useState } from 'preact/hooks';

import { cardsContext } from '@/global/cards/cardsContext';
import { MAX_CARD_COUNT } from '@/models/card';
import { classNames } from '@/utils/classNames';

import { CardList, DeckCards } from './cardList';

export const CardManager = () => {
  const cardInfo = useContext(cardsContext);
  const deckInfoTitle = useMemo(() => {
    const count = cardInfo.deck.length;
    return (
      <>
        {count > MAX_CARD_COUNT ? (
          <i
            title="カードが多すぎます"
            class="fa-solid fa-triangle-exclamation text-yellow-700 dark:text-yellow-800 mr-2"
          ></i>
        ) : count == MAX_CARD_COUNT ? (
          <i class="fa-regular fa-circle-check text-green-600 dark:text-green-500 mr-2"></i>
        ) : null}
        {`デッキ (${count}/${MAX_CARD_COUNT})`}
      </>
    );
  }, [cardInfo.deck.length]);

  const tabInfo = [
    {
      value: 0,
      title: 'カードリスト',
      tabItem: <CardList cards={cardInfo.editor}>カードリスト</CardList>,
    },
    {
      value: 1,
      title: deckInfoTitle,
      tabItem: <DeckCards cards={cardInfo.deck}>{deckInfoTitle}</DeckCards>,
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div class="mt-3 tab-group-wrapper md:hidden">
        <ul class="tab-group">
          {tabInfo.map((tab) => (
            <li
              key={tab.value}
              class={classNames('tab', {
                active: activeTab === tab.value,
              })}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.title}
            </li>
          ))}
        </ul>
      </div>
      <div class="deck-tab-items">
        {cardInfo.initilized &&
          tabInfo.map((tab) => (
            <div
              key={tab.value}
              class={classNames('deck-tab-item', {
                'deck-tab-item--active': tab.value === activeTab,
              })}
            >
              {tab.tabItem}
            </div>
          ))}
      </div>
    </>
  );
};
