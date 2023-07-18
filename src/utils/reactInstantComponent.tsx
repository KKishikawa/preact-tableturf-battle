import { type ComponentType , render } from 'preact';

export const OVERLAY_CONTAINER_ID = 'app-modal_container';
/**
 * React Nodeを {OVERLAY_CONTAINER_ID} 内に描画します
 * @param jsx React Element
 * @param rootOption ReactDOM.createRootオプション
 * @returns アンマウント処理
 */
export function AddInstantOverlayComp<T extends Record<string, unknown>>(
  Component: ComponentType<T & { close: () => void }>,
  fcArgs: T
) {
  const container = document.createElement('div');
  const unmountFunc = () => {
    render(null, container);
    container.remove();
  };
  render(<Component close={unmountFunc} {...fcArgs} />, container);
  const overlayRoot = document.getElementById(OVERLAY_CONTAINER_ID)!;
  overlayRoot.append(container);
  return unmountFunc;
}
