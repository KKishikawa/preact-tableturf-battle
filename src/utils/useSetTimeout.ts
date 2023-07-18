import { useCallback, useRef } from 'preact/hooks';

export const useSetTimeout = (func: () => void, duration: number) => {
  const idRef = useRef<number | null>(null);
  const startCount = useCallback(() => {
    if (idRef.current !== null) return;
    idRef.current = window.setTimeout(func, duration);
  }, []);
  const stopCount = useCallback(() => {
    if (idRef.current === null) return;
    window.clearTimeout(idRef.current);
  }, []);
  return [startCount, stopCount];
};
