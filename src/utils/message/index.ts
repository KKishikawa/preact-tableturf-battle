import { AddInstantOverlayComp } from '../reactInstantComponent';

import { messageClass, type MessageClass } from './classStyleSetting';
import { Message } from './message';

const MESSAGE_DURATION = 3000;

function showMsgBase(
  message: string,
  styleInfo: MessageClass,
  duration = MESSAGE_DURATION
) {
  AddInstantOverlayComp(Message, {
    message,
    styleInfo,
    duration,
  });
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace message {
  /** infoメッセージを表示する */
  export function info(message: string) {
    showMsgBase(message, messageClass.info);
  }
  /** successメッセージを表示する */
  export function success(message: string) {
    showMsgBase(message, messageClass.success);
  }
  /** errorメッセージを表示する */
  export function error(message: string) {
    showMsgBase(message, messageClass.error);
  }
  /** warnメッセージを表示する */
  export function warn(message: string) {
    showMsgBase(message, messageClass.warn);
  }
}
