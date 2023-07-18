import  { type h } from 'preact';
import { useState, useEffect, useCallback } from 'preact/hooks';

import { classNames } from '@/utils/classNames';
import { useSetTimeout } from '@/utils/useSetTimeout';

import { closeMessageClass , type MessageClass } from './classStyleSetting';


export const TRANSITION_DURATION = 300;
const transitionStyle: h.JSX.CSSProperties = {
  transitionDuration: `${TRANSITION_DURATION}ms`,
};

export const Message = ({
  message,
  styleInfo,
  duration,
  close,
}: {
  message: string;
  styleInfo: MessageClass;
  duration: number;
  close: () => void;
}) => {
  const [isHide, setHide] = useState(true);
  const onCloseFunc = useCallback(() => {
    setHide(true);
    window.setTimeout(close, TRANSITION_DURATION);
  }, []);
  const [startCloseTimer, clearCloseTimer] = useSetTimeout(
    onCloseFunc,
    duration
  );
  const onClickCloseHandler = useCallback(() => {
    clearCloseTimer();
    onCloseFunc();
  }, []);

  useEffect(() => {
    setHide(false);
    startCloseTimer();
  }, []);

  return (
    <div
      class={classNames(
        `relative z-50 w-full max-h-full mt-4 transition-all ease-out -my-1.2`,
        { [closeMessageClass]: isHide }
      )}
      style={transitionStyle}
    >
      <div
        class={classNames(
          'flex w-5/6 max-w-lg p-3 mx-auto text-sm break-all rounded-lg pointer-events-auto',
          styleInfo.bodyClass
        )}
      >
        <div class="flex items-center flex-shrink-0 w-5 h-5 mr-3 text-base">
          <i aria-hidden="true" class={styleInfo.icon}></i>
        </div>
        <div>{message}</div>
        <button
          type="button"
          class={classNames(
            'inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ml-auto text-base rounded-lg -mx-1.5 -my-1.5 focus:ring-2 p-1.5',
            styleInfo.dismiss
          )}
          aria-label="Close"
          onClick={onClickCloseHandler}
        >
          <span class="sr-only">Close</span>
          <i class="fa fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};
