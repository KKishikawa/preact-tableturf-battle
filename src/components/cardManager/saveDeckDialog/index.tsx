import { type h } from 'preact';
import { type StateUpdater, useContext } from 'preact/hooks';

import {
  cardsContext,
  cardsDispatchContext,
} from '@/global/cards/cardsContext';
import { deckContext, deckDispatchContext } from '@/global/deck/deckContext';
import { encodeDeckCode, generateDeckId, type IEditDeck } from '@/models/card';
import { nowYMD } from '@/utils';
import { dialog, dialogPortal } from '@/utils/dialog';
import { message } from '@/utils/message';

import { DialogBody } from './dialogBody';

export function SaveDeckDialog(openStates: {
  isHide: boolean;
  setHide: StateUpdater<boolean>;
}) {
  const decks = useContext(deckContext);
  const deckDispatcher = useContext(deckDispatchContext);
  const cardContext = useContext(cardsContext);
  const cardDispatcher = useContext(cardsDispatchContext);
  const deckId = cardContext.id;
  const cards = cardContext.deck;

  const saveAsync = async (form: HTMLFormElement): Promise<boolean> => {
    const selectedId = (form.elements.namedItem('saveTo') as RadioNodeList)
      .value;
    const genSaveInfo = (id: string): IEditDeck => {
      const cardNos = cards
        .map((c) => c.n)
        .filter((n) => n > 0)
        .sort((a, b) => a - b);
      return {
        d: nowYMD(),
        t: (form.querySelector('#input_deck_name') as HTMLInputElement).value,
        c: encodeDeckCode(cardNos),
        id,
      };
    };
    let successMsg: string;
    let newDeckId: string;
    const deckInfo = decks.find((deck) => deck.id === selectedId);
    if (deckInfo) {
      const isOk = await dialog.confirm({
        title: '上書きの確認',
        body: `${deckInfo.t}　を上書きしますが、よろしいですか？`,
      });
      if (!isOk) return false;
      newDeckId = deckInfo.id;
      const newDeckInfo = genSaveInfo(deckInfo.id);
      deckDispatcher({
        type: 'replace',
        payload: { id: deckInfo.id, value: newDeckInfo },
      });
      successMsg = '上書き保存しました。';
    } else {
      newDeckId = generateDeckId();
      const newDeckInfo = genSaveInfo(newDeckId);
      deckDispatcher({
        type: 'add',
        payload: { value: newDeckInfo },
      });
      successMsg = '保存しました。';
    }
    message.success(successMsg);
    deckDispatcher({ type: 'save' });
    cardDispatcher({ type: 'setid', payload: { id: newDeckId } });
    return true;
  };
  const onSubmit = (e: h.JSX.TargetedEvent<HTMLFormElement>) => {
    const primaryBtn = e.currentTarget
      .closest('.modal-body')!
      .querySelector('.modal-actions .button-primary') as HTMLButtonElement;
    primaryBtn.click();
  };
  return dialogPortal(openStates, {
    title: 'デッキの保存',
    body: <DialogBody decks={decks} deckId={deckId} onSubmit={onSubmit} />,
    buttons: [
      {
        label: '保存',
        primary: true,
        action(e, closeFn) {
          (async () => {
            const isFinished = await saveAsync(
              e.currentTarget.closest('.modal-body')!.querySelector('form')!
            );
            if (!isFinished) return;
            closeFn();
          })();
        },
      },
      {
        label: 'キャンセル',
        action: 'close',
      },
    ],
  });
}
