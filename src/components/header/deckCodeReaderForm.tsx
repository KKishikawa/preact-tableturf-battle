import { type h } from 'preact';
import { useContext } from 'preact/hooks';

import { CustomInput } from '@/components/formItem/input';
import { cardsDispatchContext } from '@/global/cards/cardsContext';
import { deckCodeLoad } from '@/global/cards/deckCodeLoadAction';
import { isValidString } from '@/utils';
import { message } from '@/utils/message';


export const DeckCodeReaderForm = () => {
  const cardDispatcher = useContext(cardsDispatchContext);
  const formSubmitHandler = (e: h.JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input')!;
    if (!isValidString(input.value)) {
      message.error('デッキコードが指定されていません。');
      return;
    }
    deckCodeLoad(cardDispatcher, input.value);
    form.reset();
  };
  return (
    <form
      class="flex items-center w-48 mt-3 mr-3 shrink-0"
      id="form_deckCodeLoad"
      onSubmit={formSubmitHandler}
    >
      <CustomInput
        class="input_cardlist_serch rounded-r-none"
        placeholder="デッキコード読込"
      />
      <button
        class="px-3 rounded-l-none button button-primary"
        type="submit"
        title="デッキコード読み込み"
      >
        <i class="fa-solid fa-right-to-bracket"></i>
      </button>
    </form>
  );
};
