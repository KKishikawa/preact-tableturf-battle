import type { ComponentChildren, h } from 'preact';

export type DialogOption = {
  title?: string;
  body?: ComponentChildren;
  buttons?: DialogButtonOption[];
  onClose?: () => void;
};

export type DialogButtonOption = {
  primary?: boolean;
  label: string;
  icon?: string;
  action?:
    | ((
        e: h.JSX.TargetedEvent<HTMLButtonElement>,
        closeFunc: (preventHandler?: boolean) => void
      ) => void)
    | 'close';
};

type PromptOption = {
  title?: string;
  body?: ComponentChildren;
};
export type ComfirmOption = PromptOption & {
  okLabel?: string;
  cancelLabel?: string;
};
export type AlertOption = PromptOption & {
  closeLabel?: string;
};
