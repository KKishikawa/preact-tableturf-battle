import { useState } from 'preact/hooks';

import { render, screen, act } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';

import { BaseDialog, TRANSITION_DURATION } from '@/utils/dialog/dialog';

const pause = (ms: number) => new Promise((res) => setTimeout(res, ms));

test('render dialog', async () => {
  const user = userEvent.setup();
  const closeHandler = vitest.fn();
  let closeCounter = 0;
  const beforeCloseHandler = vitest.fn();
  let beforeCloseCounter = 0;

  const body = <div>example body</div>;
  const [isHide, setHide] = useState(true);

  render(
    <BaseDialog
      isHide={isHide}
      setHide={setHide}
      option={{
        title: '',
        body,
        buttons: [
          {
            label: 'OK',
            primary: true,
            action(_, closeFunc) {
              closeFunc(true);
            },
          },
          {
            label: 'cancel',
            action(_, closeFunc) {
              closeFunc(false);
            },
          },
        ],
        onClose: beforeCloseHandler,
      }}
      close={closeHandler}
    />
  );
  expect(closeHandler).not.toBeCalled();
  expect(beforeCloseHandler).not.toBeCalled();
  const bodyEl = screen.getByText('example body');
  expect(bodyEl).toBeInTheDocument();
  await act(async () => {
    const closeButton = await screen.findByLabelText('Close', {
      selector: 'button',
    });
    await user.click(closeButton);
  });
  await pause(TRANSITION_DURATION);
  expect(closeHandler).toBeCalledTimes(++closeCounter);
  expect(beforeCloseHandler).toBeCalledTimes(++beforeCloseCounter);

  await act(async () => {
    const closeButton = await screen.findByText('OK', {
      selector: 'button',
    });
    await user.click(closeButton);
  });
  await pause(TRANSITION_DURATION);
  expect(closeHandler).toBeCalledTimes(++closeCounter);
  expect(beforeCloseHandler).toBeCalledTimes(beforeCloseCounter);

  await act(async () => {
    const closeButton = await screen.findByText('cancel', {
      selector: 'button',
    });
    await user.click(closeButton);
  });
  await pause(TRANSITION_DURATION);
  expect(closeHandler).toBeCalledTimes(++closeCounter);
  expect(beforeCloseHandler).toBeCalledTimes(++beforeCloseCounter);
});
