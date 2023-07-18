import { useContext, useState } from 'preact/hooks';

import { cardsDispatchContext } from '@/global/cards/cardsContext';
import { deckContext, deckDispatchContext } from '@/global/deck/deckContext';
import { decodeDeckCode, type IEditDeck } from '@/models/card';
import { isValidString } from '@/utils';
import { classNames } from '@/utils/classNames';
import { dialog } from '@/utils/dialog';
import { message } from '@/utils/message';

import { openShareDialog } from '../deckShare/openDialog';

import { DeleteConfBody, LoadConfBody } from './confBody';

function DeckRow({
  deckInfo,
  onClickEdit,
  onClickDelete,
  onClickShare,
}: {
  deckInfo: IEditDeck;
  onClickEdit: (deck: IEditDeck) => void;
  onClickDelete: (deck: IEditDeck) => void;
  onClickShare: (deck: IEditDeck) => void;
}) {
  return (
    <tr class="deck-row">
      <td>
        <div class="deck-name">{deckInfo.t}</div>
        <div class="text-xs">
          編集: <span class="edit-date">{deckInfo.d}</span>
        </div>
      </td>
      <td class="space-x-1">
        <button
          type="button"
          title="デッキを編集する"
          class="button button-xs button-primary"
          onClick={() => onClickEdit(deckInfo)}
        >
          <i class="fa-solid fa-folder-open"></i>
        </button>
        <button
          type="button"
          title="デッキを削除する"
          class="button button-xs button-danger"
          onClick={() => onClickDelete(deckInfo)}
        >
          <i class="fa fa-trash-can"></i>
        </button>
        <button
          type="button"
          title="デッキ共有リンクを作成"
          class="button button-xs button-default"
          onClick={() => onClickShare(deckInfo)}
        >
          <i class="fa-solid fa-share-from-square"></i>
        </button>
      </td>
    </tr>
  );
}

function DeckManagerTableBody() {
  const decks = useContext(deckContext);
  const cardDispatcher = useContext(cardsDispatchContext);
  const deckDispatcher = useContext(deckDispatchContext);
  const onClickEdit = (deck: IEditDeck) => {
    dialog
      .confirm({
        title: 'デッキ読み込み',
        body: <LoadConfBody deck={deck} />,
      })
      .then((isOk) => {
        if (!isOk) return;
        cardDispatcher({
          type: 'loadDeck',
          payload: { cards: decodeDeckCode(deck.c), id: deck.id },
        });
        message.success('デッキを読み込みました。');
      })
      .catch((e) => {
        console.log(e);
        message.error('デッキの読み込みに失敗しました。');
      });
  };
  const onClickDelete = (deck: IEditDeck) => {
    dialog
      .confirm({
        title: 'デッキ削除',
        body: <DeleteConfBody deck={deck} />,
      })
      .then((isOk) => {
        if (!isOk) return;
        deckDispatcher({ type: 'delete', payload: { id: deck.id } });
        message.success('削除しました。');
      })
      .catch((e) => {
        console.log(e);
        message.error('削除処理に失敗しました。');
      });
  };
  const onClickShare = (deck: IEditDeck) => {
    if (isValidString(deck.c)) {
      openShareDialog(deck.c);
    } else {
      message.error('選択したデッキにはカードが含まれていません。');
    }
  };
  return (
    <>
      {decks.length > 0 ? (
        decks.map((deck) => (
          <DeckRow
            key={deck.id}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            onClickShare={onClickShare}
            deckInfo={deck}
          />
        ))
      ) : (
        <tr class="nocontent">
          <td colSpan={2}>作成済みのものはありません。</td>
        </tr>
      )}
    </>
  );
}

export function DeckManager() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      class={classNames('p-0 mt-3 overflow-hidden card expandable-wrapper', {
        expand: expanded,
      })}
    >
      <div class="max-w-4xl mx-auto expandable">
        <div id="created_decks" class="m-5 table__wrapper">
          <table class="table">
            <colgroup>
              <col />
              <col class="w-40" />
            </colgroup>
            <tbody>
              <DeckManagerTableBody />
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <button
          type="button"
          class="block w-full text-center button-default expand-button"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <span class="form-label">作成済みデッキ</span>
          <i class="fa-solid fa-caret-down"></i>
        </button>
      </div>
    </div>
  );
}
