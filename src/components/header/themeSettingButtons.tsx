import { type h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { toDark, toLight, toSystem } from '@/utils/appTheme';
import { classNames } from '@/utils/classNames';

const settingStateClassName = 'theme-settig--is-setting';

export const ThemeSettingButtons = () => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const onClickSettingHandler = (
    e: h.JSX.TargetedMouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setSelectorOpen((prev) => !prev);
  };
  const toDarkHandler = () => {
    toDark(true);
    setSelectorOpen(false);
  };
  const toLightHandler = () => {
    toLight(true);
    setSelectorOpen(false);
  };
  const toSystemHandler = () => {
    toSystem();
    setSelectorOpen(false);
  };
  useEffect(() => {
    if (selectorOpen) {
      const selectorCloser = () => {
        setSelectorOpen(false);
      };
      document.addEventListener('click', selectorCloser);
      return () => {
        document.removeEventListener('click', selectorCloser);
      };
    }
  }, [selectorOpen]);

  return (
    <div class="relative flex justify-end h-10 mt-3 shrink-0 w-11">
      <div
        class={classNames('absolute right-0 top-px', {
          [settingStateClassName]: selectorOpen,
        })}
      >
        <button
          onClick={onClickSettingHandler}
          id="themeSettingButton"
          type="button"
          class="relative flex items-center button button-sm button-default"
          title="テーマの変更"
        >
          <i class="w-4 h-4 fa-solid fa-circle-half-stroke"></i>
          <span class="theme-setting-label">テーマ変更</span>
        </button>
        <div id="themeButtonGroup" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={toLightHandler}
            title="ライトモード"
            type="button"
            class="flex items-center mt-1 pointer-events-auto button button-sm button-default"
          >
            <i class="w-4 h-4 fa-regular fa-sun"></i>
            <span class="theme-setting-label">ライト</span>
          </button>
          <button
            onClick={toDarkHandler}
            title="ダークモード"
            type="button"
            class="flex items-center mt-1 pointer-events-auto button button-sm button-default"
          >
            <i class="w-4 h-4 fa-solid fa-moon"></i>
            <span class="theme-setting-label">ダーク</span>
          </button>
          <button
            onClick={toSystemHandler}
            title="システム設定を使用"
            type="button"
            class="flex items-center mt-1 pointer-events-auto button button-sm button-default"
          >
            <i class="w-4 h-4 fa-solid fa-computer"></i>
            <span class="theme-setting-label">システム</span>
          </button>
        </div>
      </div>
    </div>
  );
};
