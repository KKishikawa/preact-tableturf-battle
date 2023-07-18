/** ダークモードに変更する */
export function toDark(save?: boolean) {
  document.documentElement.classList.add('dark');
  if (save) localStorage.theme = 'dark';
}
/** ライトモードに切り替える */
export function toLight(save?: boolean) {
  document.documentElement.classList.remove('dark');
  if (save) localStorage.theme = 'light';
}
export function toSystem() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toDark();
  } else {
    toLight();
  }
  localStorage.removeItem('theme');
}

{
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    toDark();
  } else {
    toLight();
  }
}
