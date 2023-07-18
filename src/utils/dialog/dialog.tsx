import { type h } from 'preact';
import { useCallback, type StateUpdater } from 'preact/hooks';

import { classNames } from '@/utils/classNames';

import { type DialogOption, type DialogButtonOption } from './dialog.types';

const CLOSE_DIALOG_WRAPPER_CLASS = 'opacity-0';
const CLOSE_DIALOG_CLASS = 'scale-0';

export const TRANSITION_DURATION = 200;
const transitionStyle: h.JSX.CSSProperties = {
  transitionDuration: `${TRANSITION_DURATION}ms`,
};

const DialogFooter = ({
  buttons,
  close,
}: {
  buttons?: DialogButtonOption[];
  close: (preventHandler?: boolean) => void;
}) => {
  return (
    <>
      {buttons && buttons.length > 0 && (
        <div class="modal-actions flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b lg:p-6 dark:border-gray-600">
          {buttons.map((button, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                if (button.action === 'close') {
                  close();
                  return;
                }
                button.action?.(e, close);
              }}
              class={classNames(
                'button px-3 py-2 rounded-md lg:px-5 lg:py-2.5 lg:rounded-lg modal-action',
                button.primary ? 'button-primary' : 'button-alt'
              )}
            >
              {button.icon && <i class={classNames('mr-2', button.icon)}></i>}
              {button.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export const BaseDialog = ({
  isHide,
  setHide,
  option: { buttons, body, onClose, title },
  close,
}: {
  isHide: boolean;
  setHide: StateUpdater<boolean>;
  option: DialogOption;
  close: () => void;
}) => {
  const onCloseFunc = useCallback((preventHandler?: boolean) => {
    setHide(true);
    window.setTimeout(close, 200);
    if (!preventHandler && onClose) {
      onClose();
    }
  }, []);
  const onClickDialog = useCallback<
    h.JSX.MouseEventHandler<HTMLElement>
  >(() => {
    onCloseFunc();
  }, []);

  return (
    <>
      <div
        class={classNames('absolute inset-0 pointer-events-auto', {
          hidden: isHide,
        })}
        onClick={onClickDialog}
      ></div>
      <div
        tabIndex={-1}
        aria-hidden="true"
        class={classNames(
          'absolute inset-0 z-50 overflow-y-auto transition-opacity bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
          { [CLOSE_DIALOG_WRAPPER_CLASS]: isHide }
        )}
        style={transitionStyle}
      >
        <div tabIndex={-1} aria-hidden="true" class="flex flex-col h-full">
          <div class="flex-shrink basis-1/5"></div>
          <div class="p-4">
            <div
              class={classNames(
                'modal-body max-w-2xl mx-auto transition-transform bg-white rounded-lg shadow pointer-events-auto dark:bg-gray-700',
                { [CLOSE_DIALOG_CLASS]: isHide }
              )}
              style={transitionStyle}
            >
              {isHide || (
                <>
                  <div class="flex items-start justify-between p-3 border-b rounded-t lg:p-4 dark:border-gray-600">
                    <h3 class="text-base font-medium text-gray-900 lg:text-xl dark:text-white">
                      {title}
                    </h3>
                    <button
                      type="button"
                      aria-label="Close"
                      class="inline-flex items-center justify-center ml-auto text-sm text-center text-gray-400 bg-transparent rounded-lg w-7 h-7 modal-close hover:bg-gray-200 hover:text-gray-900 lg:text-base lg:w-8 lg:h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="defaultModal"
                      onClick={onClickDialog}
                    >
                      <i aria-hidden="true" class="fa fa-xmark"></i>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div class="p-4 overflow-y-auto text-sm leading-relaxed text-gray-500 lg:text-base lg:p-6 dark:text-gray-400">
                    {body}
                  </div>
                  <DialogFooter buttons={buttons} close={onCloseFunc} />
                </>
              )}
            </div>
          </div>
          <div class="flex-shrink basis-3/5"></div>
        </div>
      </div>
    </>
  );
};
