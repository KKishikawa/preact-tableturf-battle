import { type ComponentChildren, type h } from 'preact';
import { useState, useMemo, useContext } from 'preact/hooks';

import { type NamedComponentChildren } from '@/@types/utilTypes.types';
import { CustomInput } from '@/components/formItem/input';
import { cardsDispatchContext } from '@/global/cards/cardsContext';
import { type EditCard } from '@/models/card';
import { isValidString } from '@/utils';
import { classNames } from '@/utils/classNames';
import { toInt } from '@/utils/convert';
import { dialog } from '@/utils/dialog';
import { message } from '@/utils/message';

import { Card } from './card';
import {
  getSortComparer,
  sortOptions,
  type CardFilterOption,
  getFilterPredicate,
} from './cardFilterSort';
import { SaveDeckDialog } from './saveDeckDialog';

const layoutButtonsInfo = [
  {
    type: 'grid',
    title: 'グリッド表示',
    icon: 'fa-solid fa-table-cells-large',
  },
  {
    type: 'table',
    title: 'リスト表示',
    icon: 'fa-solid fa-list',
  },
];

function BaseCardList({
  isList,
  cards,
  filterOpt,
  children,
}: {
  isList: boolean;
  cards: EditCard[];
  filterOpt?: CardFilterOption;
  children: NamedComponentChildren<
    'title' | 'HeaderPrepend' | 'HeaderActions' | 'HeaderBottom'
  >;
}) {
  const [layoutState, setLayoutState] = useState('grid');
  const [orderType, setOrderType] = useState('0');
  const onClickLayoutSwitch: h.JSX.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    const layoutName = e.currentTarget.dataset['button_type']!;
    setLayoutState(layoutName);
  };
  const filterSortedCards = useMemo(
    () =>
      cards
        .filter(getFilterPredicate(filterOpt))
        .sort(getSortComparer(orderType)),
    [cards, filterOpt, orderType]
  );
  return (
    <div
      class={classNames('table__wrapper', { 'card-list-container': isList })}
    >
      <div class="table-caption-title">
        <div class="flex flex-wrap items-center -mt-2 -ml-2">
          <span class="table-title-text">{children.title}</span>
          {children.HeaderPrepend}
          <div class="font-normal">
            <div class="mt-2 ml-2 w-36">
              <select
                class="form-input table-sort"
                value={orderType}
                onChange={(e) => setOrderType(e.currentTarget.value)}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div class="flex">{children.HeaderActions}</div>
          <div class="flex justify-end flex-auto ml-1">
            <div class="mt-3 button-toggle" role="group">
              {layoutButtonsInfo.map((info) => (
                <button
                  key={info.type}
                  type="button"
                  data-button_type={info.type}
                  class={classNames('button button-sm button-default', {
                    'button-active': info.type == layoutState,
                  })}
                  title={info.title}
                  onClick={onClickLayoutSwitch}
                >
                  <i class={info.icon}></i>
                </button>
              ))}
            </div>
          </div>
        </div>
        {children.HeaderBottom}
      </div>
      <div class="cardlist_table" tabIndex={-1} data-layout={layoutState}>
        <div class="cardlist_table_head">
          <div class="text-center col-no">
            <span class="xl:hidden">No.</span>
            <span class="hidden xl:inline">ナンバー</span>
          </div>
          <div class="text-center col-gridcount">マス数</div>
          <div class="text-center col-sp">
            <span class="xl:hidden">SP</span>
            <span class="hidden xl:inline">
              スペシャル
              <br />
              ポイント
            </span>
          </div>
          <div class="text-center col-rarity">
            <span class="hidden sm:inline md:hidden lg:inline">レア度</span>
          </div>
          <div class="col-name">名前</div>
          <div class="col-action"></div>
        </div>
        <ul class="cardlist_table_body">
          {filterSortedCards.map((card) => (
            <Card key={card.n} isInList={isList} card={card} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CardList({
  cards,
  children,
}: {
  cards: EditCard[];
  children: ComponentChildren;
}) {
  const [expanded, setExpanded] = useState(false);
  const [optState, setOptState] = useState<CardFilterOption>({});
  const onChangeFormData = (form: HTMLFormElement) => {
    const newOpt: CardFilterOption = {};
    function trySetNewOpt<K extends keyof CardFilterOption>(
      key: K,
      value: CardFilterOption[K]
    ) {
      if (value != null) newOpt[key] = value;
    }
    trySetNewOpt(
      'name',
      (form.querySelector('.input_cardlist_serch') as HTMLInputElement).value
    );
    (
      [
        { id: 'min-grid', p: 'ming' },
        { id: 'max-grid', p: 'maxg' },
        { id: 'min-sp', p: 'minsp' },
        { id: 'max-sp', p: 'maxsp' },
      ] as const
    ).forEach((elInfo) => {
      const input = form.querySelector(`#${elInfo.id}`) as HTMLInputElement;
      if (isValidString(input.value))
        trySetNewOpt(elInfo.p, toInt(input.value));
    });
    setOptState(newOpt);
  };
  const onSubmitForm: h.JSX.GenericEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onChangeFormData(e.currentTarget);
  };
  const onRestForm: h.JSX.GenericEventHandler<HTMLFormElement> = (e) => {
    const form = e.currentTarget;
    setTimeout(() => {
      // run after bubbling is finished
      onChangeFormData(form);
    });
  };
  return (
    <BaseCardList isList={true} cards={cards} filterOpt={optState}>
      {{
        title: children,
        HeaderPrepend: <div class="flex-auto" style="max-width: 16px"></div>,
        HeaderBottom: (
          <div
            class={classNames('mt-2 md:mt-3 expandable-wrapper', {
              expand: expanded,
            })}
          >
            <form
              class="expandable cardlist_serch !overflow-hidden flex flex-wrap items-end"
              onSubmit={onSubmitForm}
              onReset={onRestForm}
            >
              <div class="flex flex-wrap mb-3 -ml-3">
                <div class="flex items-center mt-2 ml-6" title="マス数">
                  <div class="p-3 mt-2 mr-5 text-xs gridcount">
                    <div class="absolute text-xs font-normal -translate-x-1/2 left-1/2 -top-4 whitespace-nowrap">
                      マス数
                    </div>
                  </div>
                  <div class="w-12">
                    <label
                      for="min-grid"
                      class="mb-1 text-xs form-label form-label-input"
                    >
                      最小
                    </label>
                    <input
                      id="min-grid"
                      type="number"
                      class="p-1 form-input text-end"
                    />
                  </div>
                  <span class="mx-2 mt-5">～</span>
                  <div class="w-12">
                    <label
                      for="max-grid"
                      class="mb-1 text-xs form-label form-label-input"
                    >
                      最大
                    </label>
                    <input
                      id="max-grid"
                      type="number"
                      class="p-1 form-input text-end"
                    />
                  </div>
                </div>
                <div
                  class="flex items-center mt-2 ml-6"
                  title="スペシャルポイント"
                >
                  <div class="relative p-px mx-2 mt-2 sp-fill">
                    <div class="absolute text-xs font-normal -translate-x-1/2 left-1/2 -top-5 whitespace-nowrap">
                      sp
                    </div>
                  </div>
                  <div class="w-12 ml-3">
                    <label
                      for="min-sp"
                      class="mb-1 text-xs form-label form-label-input"
                    >
                      最小
                    </label>
                    <input
                      id="min-sp"
                      type="number"
                      class="p-1 form-input text-end"
                    />
                  </div>
                  <span class="mx-2 mt-5">～</span>
                  <div class="w-12">
                    <label
                      for="max-sp"
                      class="mb-1 text-xs form-label form-label-input"
                    >
                      最大
                    </label>
                    <input
                      id="max-sp"
                      type="number"
                      class="p-1 form-input text-end"
                    />
                  </div>
                </div>
              </div>
              <div class="flex mb-3 ml-3">
                <div
                  class="flex items-center"
                  onReset={(e) =>
                    onChangeFormData(e.currentTarget.closest('form')!)
                  }
                >
                  <CustomInput
                    class="input_cardlist_serch rounded-r-none"
                    placeholder="カード名"
                  />
                  <button
                    class="px-3 rounded-l-none button button-primary"
                    type="submit"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                </div>
                <button
                  type="reset"
                  class="self-end ml-5 mr-1 whitespace-nowrap button_search_clear button button-alt button-xs"
                >
                  クリア
                </button>
              </div>
            </form>
            <div class="mt-1 -mx-2 -mb-2 md:-mx-4 md:-mb-4">
              <button
                type="button"
                class="block w-full text-center button-default expand-button"
                onClick={() => setExpanded((prev) => !prev)}
              >
                <span class="mr-2 text-sm">詳細検索</span>
                <i class="fa-solid fa-caret-down"></i>
              </button>
            </div>
          </div>
        ),
      }}
    </BaseCardList>
  );
}

export function DeckCards({
  cards,
  children,
}: {
  cards: EditCard[];
  children: ComponentChildren;
}) {
  const [isDialogHide, setDialogHideState] = useState(true);
  const cardDispatcher = useContext(cardsDispatchContext);
  const onClickSave = () => {
    setDialogHideState(false);
  };
  const onClickClear = () => {
    dialog
      .confirm({
        title: 'デッキ内容のクリア',
        body: '編集中のデッキの内容をクリアしますか？',
      })
      .then((isOk) => {
        if (isOk) {
          cardDispatcher({ type: 'clear' });
          message.success('編集中のデッキをクリアしました。');
        }
      });
  };
  return (
    <BaseCardList isList={false} cards={cards}>
      {{
        title: children,
        HeaderPrepend: (
          <div class="mx-3 mt-3" title="デッキ情報">
            <button
              type="button"
              id="button-deck-info"
              class="button button-sm button-default"
            >
              <i class="w-3 fa fa-circle-info"></i>
            </button>
          </div>
        ),
        HeaderActions: (
          <>
            <button
              type="button"
              title="デッキを保存"
              class="self-center mt-2 ml-3 button button-primary button-sm"
              onClick={onClickSave}
            >
              <i class="fa-solid fa-floppy-disk"></i>
              <span class="hidden ml-2 xl:inline">保存</span>
            </button>
            <button
              type="button"
              title="デッキを空にする"
              class="self-center mt-2 ml-1 button button-sm button-danger"
              onClick={onClickClear}
            >
              <i class="fa-solid fa-ban"></i>
            </button>
            <SaveDeckDialog
              isHide={isDialogHide}
              setHide={setDialogHideState}
            />
          </>
        ),
      }}
    </BaseCardList>
  );
}
