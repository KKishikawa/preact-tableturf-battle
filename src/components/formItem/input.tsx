import { createRef, type h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { isValidString } from '@/utils';
import { classNames } from '@/utils/classNames';

export const CustomInput = ({
  class: className,
  ...props
}: h.JSX.HTMLAttributes<HTMLInputElement>) => {
  const [hasText, changeHasTextState] = useState(false);
  const inputRef = createRef<HTMLInputElement>();
  const onClickClear = () => {
    if (!inputRef.current) return;
    inputRef.current.dispatchEvent(new Event('reset', { bubbles: true }));
  };
  useEffect(() => {
    if (!inputRef.current) return;
    const nullableForm = inputRef.current.closest('form');
    if (!nullableForm) return;
    const form = nullableForm;
    const onReset = () => {
      changeHasTextState(false);
    };
    form.addEventListener('reset', onReset);
    return () => {
      form.removeEventListener('reset', onReset);
    };
  }, [inputRef.current]);
  return (
    <div class="relative">
      <input
        {...props}
        class={classNames('form-input pr-7', className)}
        type="text"
        ref={inputRef}
        onInput={(e) => {
          changeHasTextState(isValidString(e.currentTarget.value));
        }}
        onReset={(e) => {
          e.currentTarget.value = '';
          changeHasTextState(false);
        }}
      />
      <i
        class={classNames(
          'cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 text-sm text-gray-500 dark:text-gray-100 fa fa-circle-xmark',
          { hidden: !hasText }
        )}
        onClick={onClickClear}
      ></i>
    </div>
  );
};
