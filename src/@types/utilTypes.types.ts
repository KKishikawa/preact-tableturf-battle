import type { ComponentChildren } from 'preact';
// eslint-disable-next-line @typescript-eslint/ban-types
export type Builtin = Function | Date | Error | RegExp;

export type DeepReadonly<T> = T extends Builtin
  ? T
  : { readonly [key in keyof T]: DeepReadonly<T[key]> };

/** 名前付きComponentChildren */
export type NamedComponentChildren<T extends string> = {
  [P in T]?: ComponentChildren;
};

/** It is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise */
export type Comparer<T> = (a: T, b: T) => number;

/** marge comparers */
export const mergeComparers =
  <T>(...comparers: Comparer<T>[]): Comparer<T> =>
  (a, b) => {
    let inf = 0;
    for (const iterator of comparers) {
      inf = iterator(a, b);
      if (inf != 0) break;
    }
    return inf;
  };
/** swap Compare Order */
export const swapComparer =
  <T>(comparer: Comparer<T>): Comparer<T> =>
  (a, b) =>
    comparer(b, a);

export type PrependArguments<T extends unknown[], F> = F extends (
  ...args: infer U
) => infer R
  ? (...args: [...T, ...U]) => R
  : never;
