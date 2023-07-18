import { createPortal } from 'preact/compat';
import { useState, type StateUpdater, useEffect } from 'preact/hooks';

import {
  AddInstantOverlayComp,
  OVERLAY_CONTAINER_ID,
} from '../reactInstantComponent';

import { BaseDialog } from './dialog';
import {
  type DialogOption,
  type ComfirmOption,
  type AlertOption,
} from './dialog.types';

function Dialog(args: { option: DialogOption; close: () => void }) {
  const [isHide, setHide] = useState(true);
  useEffect(() => {
    setHide(false);
  }, []);
  return <BaseDialog isHide={isHide} setHide={setHide} {...args} />;
}

export function openDialog(option: DialogOption = {}) {
  AddInstantOverlayComp(Dialog, { option });
}
export function dialogPortal(
  openStates: {
    isHide: boolean;
    setHide: StateUpdater<boolean>;
  },
  option: DialogOption
) {
  const onClose = () => {};
  return (
    <>
      {createPortal(
        <BaseDialog
          isHide={openStates.isHide}
          setHide={openStates.setHide}
          close={onClose}
          option={option}
        />,
        document.getElementById(OVERLAY_CONTAINER_ID)!
      )}
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace dialog {
  /** OK・キャンセルダイアログを表示する。okクリックでresolve,キャンセルでreject */
  export function confirm(option: ComfirmOption) {
    return new Promise<boolean>(function (resolve) {
      openDialog({
        title: option.title,
        body: option.body,
        buttons: [
          {
            label: option.okLabel ?? 'OK',
            primary: true,
            action(_, closeFunc) {
              resolve(true);
              closeFunc(true);
            },
          },
          {
            label: option.cancelLabel ?? 'キャンセル',
            action: 'close',
          },
        ],
        onClose() {
          resolve(false);
        },
      });
    });
  }
  /** OKボタンダイアログを表示する。閉じられるとresolve */
  export function alert(options: AlertOption) {
    return new Promise<void>(function (resolve) {
      openDialog({
        title: options.title,
        body: options.body,
        buttons: [
          {
            primary: true,
            label: options.closeLabel ?? 'OK',
            action: 'close',
          },
        ],
        onClose() {
          resolve();
        },
      });
    });
  }
}
