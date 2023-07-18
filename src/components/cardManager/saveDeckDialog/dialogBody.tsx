import { createRef, type h } from 'preact';
import { useEffect } from 'preact/hooks';

import { CustomInput } from '@/components/formItem/input';
import { type IEditDeck } from '@/models/card';
import { isValidString } from '@/utils';

export function DialogBody({
  deckId,
  decks,
  onSubmit,
}: {
  deckId: string | null;
  decks: IEditDeck[];
  onSubmit: (e: h.JSX.TargetedEvent<HTMLFormElement>) => void;
}) {
  const formRef = createRef<HTMLFormElement>();
  useEffect(() => {
    if (!formRef.current) return;
    const form = formRef.current;

    const input = form.querySelector('#input_deck_name') as HTMLInputElement;
    const inputHandler = () => {
      input.dataset.input = '1';
      input.removeEventListener('input', inputHandler);
    };
    input.addEventListener('input', inputHandler);

    const radios = [
      ...form.querySelectorAll('[name="saveTo"]'),
    ] as HTMLInputElement[];
    radios.forEach((r) => {
      r.onchange = function () {
        if (!r.checked) return;
        if (isValidString(input.value) && isValidString(input.dataset.input))
          return;
        const deckName = radio.dataset.name;
        if (deckName) {
          input.value = deckName;
          input.dispatchEvent(new Event('input'));
        }
      };
    });

    const radio = radios.find((r) => r.dataset.id === deckId) ?? radios[0];
    radio.checked = true;
    radio.dispatchEvent(new Event('change'));
  }, []);
  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <div class="mb-5">
        <label for="input_deck_name" class="form-label form-label-input">
          デッキ名
        </label>
        <CustomInput
          id="input_deck_name"
          type="text"
          class="form-input"
          placeholder="デッキ名"
        />
      </div>
      <label class="flex items-center ml-2">
        <input type="radio" name="saveTo" class="form-radio peer" value="" />
        <span class="form-label form-label-radio peer-checked:text-blue-600 dark:peer-checked:text-blue-500">
          <i class="mr-1 fa fa-plus"></i>新規保存
        </span>
      </label>
      {decks.length > 0 && (
        <>
          <div class="mt-3 form-label">上書き</div>
          <div class="ml-1 overflow-y-auto max-h-36">
            {decks.map((deck) => (
              <label key={deck.id} class="flex items-center p-1">
                <input
                  type="radio"
                  name="saveTo"
                  data-id={deck.id}
                  data-name={deck.t}
                  class="form-radio deck-radio-item peer"
                />
                <div class="form-label form-label-radio peer-checked:text-blue-600 dark:peer-checked:text-blue-500">
                  <div class="mr-1">{deck.t}</div>
                  <div class="text-xs">({deck.d})</div>
                </div>
              </label>
            ))}
          </div>
        </>
      )}
    </form>
  );
}
