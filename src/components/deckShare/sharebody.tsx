import { type h } from 'preact';

import { createShareURL } from '@/models/card';
import { message } from '@/utils/message';

export function ShareBody({ code }: { code: string }) {
  const url = createShareURL(code);
  const onClickCopy = async (
    e: h.JSX.TargetedMouseEvent<HTMLButtonElement>
  ) => {
    const button = e.currentTarget;
    const input = button.previousSibling as HTMLInputElement;
    const text = input.value;
    await navigator.clipboard.writeText(text);
    message.success(`${button.dataset.copy}をコピーしました。`);
  };
  return (
    <div>
      <div class="mb-4 text-xs">
        デッキURLをブラウザで開くと、デッキの内容がデッキ編集画面に読み込まれます。
      </div>
      <div>
        <label class="form-label form-label-input">デッキコード</label>
        <div class="relative">
          <input
            class="w-full pr-12 form-input"
            type="text"
            readonly
            value={code}
          />
          <button
            data-copy="デッキコード"
            class="absolute top-0 bottom-0 right-0 px-3 rounded-l-none button button-primary"
            type="button"
            onClick={onClickCopy}
          >
            <i class="fa-regular fa-copy"></i>
          </button>
        </div>
      </div>
      <div class="mt-3">
        <label class="form-label form-label-input">デッキURL</label>
        <div class="relative">
          <input
            class="w-full pr-12 form-input"
            type="text"
            readonly
            value={url}
          />
          <button
            data-copy="url"
            class="absolute top-0 bottom-0 right-0 px-3 rounded-l-none button button-primary"
            type="button"
            onClick={onClickCopy}
          >
            <i class="fa-regular fa-copy"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
