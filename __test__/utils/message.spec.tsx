import { render, screen, act } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';

import { messageClass } from '@/utils/message/classStyleSetting';
import { Message, TRANSITION_DURATION } from '@/utils/message/message';

const pause = (ms: number) => new Promise((res) => setTimeout(res, ms));

test('render info message', async () => {
  const user = userEvent.setup();
  const closeHandler = vitest.fn();
  const messageBody = 'テスト';

  render(
    <Message
      duration={5000}
      message={messageBody}
      styleInfo={messageClass.info}
      close={closeHandler}
    />
  );
  expect(closeHandler).not.toBeCalled();
  const bodyElement = screen.getByText(messageBody);
  expect(bodyElement).toBeInTheDocument();
  await act(async () => {
    const closeButton = await screen.findByRole('button', { name: 'Close' });
    await user.click(closeButton);
  });
  await pause(TRANSITION_DURATION);
  expect(closeHandler).toBeCalledTimes(1);
});

test('auto close message', () => {
  vitest.useFakeTimers();
  const closeHandler = vitest.fn();
  const messageBody = 'テスト';
  const duration = 5000;

  render(
    <Message
      duration={duration}
      message={messageBody}
      styleInfo={messageClass.info}
      close={closeHandler}
    />
  );
  expect(closeHandler).not.toBeCalled();
  act(() => {
    vitest.advanceTimersByTime(TRANSITION_DURATION + duration);
  });
  expect(closeHandler).toBeCalledTimes(1);
});
