import { useContext } from 'preact/hooks';

import { cardsDispatchContext } from '@/global/cards/cardsContext';
import { RARITY, type EditCard } from '@/models/card';

export function Card({
  isInList,
  card,
}: {
  isInList: boolean;
  card: EditCard;
}) {
  const cardDispatcher = useContext(cardsDispatchContext);
  const onClickAdd = () => {
    cardDispatcher({
      type: 'select',
      payload: {
        add: [card.n],
      },
    });
  };
  const onClickDel = () => {
    cardDispatcher({
      type: 'select',
      payload: {
        del: [card.n],
      },
    });
  };
  const nameScaleStyle =
    card.scale == null
      ? ''
      : `--tw-scale-x:${card.scale};--tw-scale-y:${card.scale};`;
  return (
    <li
      data-card_rarity={card.r}
      class="cardlist_table_row"
      data-selected={isInList && card.selected ? '1' : ''}
    >
      <div class="cardlist_table_item card_grid">
        <div class="grid__wrapper">
          <img draggable={false} width={97} height={97} src={card.imgUri} />
        </div>
      </div>
      <div class="cardlist_table_item card_no" title="ナンバー">
        <div class="flex items-center">
          {isInList && (
            <i class="hidden icon-check fa-regular fa-circle-check"></i>
          )}
          <span></span>
          <span class="value">{card.n}</span>
        </div>
      </div>
      <div class="cardlist_table_item card_gridcount" title="マス数">
        {card.gcount}
      </div>
      <div class="cardlist_table_item card_sp" title="スペシャルポイント">
        <div class="inline-block sp-fill"></div>
        <i class="mx-1 fa fa-xmark"></i>
        <span>{card.sp}</span>
      </div>
      <div class="cardlist_table_item card_rarity" title="レア度">
        <div class="rarity_label">
          <span>{RARITY[card.r]}</span>
        </div>
      </div>
      <div class="cardlist_table_item card_name" title="カード名">
        <span style={nameScaleStyle}>{card.ja}</span>
      </div>
      <div class="cardlist_table_item card_action">
        {isInList && (
          <button
            class="button-add button button-xs button-primary"
            title="デッキに追加"
            onClick={onClickAdd}
          >
            <i class="fa fa-plus"></i>
          </button>
        )}
        <button
          class="button-delete button button-xs button-danger"
          title="デッキから削除"
          onClick={onClickDel}
        >
          <i class="fa fa-trash-can"></i>
        </button>
      </div>
    </li>
  );
}
