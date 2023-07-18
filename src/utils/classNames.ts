/**
 * 指定した内容をもとにclassName文字列を出力する
 * 引数の種類
 *  ・string / number 静的なclassNameとして出力
 *  ・Array 各itemに対してclassNames関数を再帰的に実行する
 *  ・object valueの結果がtrueと評価される場合にそのkeyをclassNameとして出力
 * 各引数の評価結果にスペースが含まれている場合は、複数のclassNameとなる
 * (スペース文字を含む一つのclassNameとして扱うにはスペースのエスケープが必要)
 */
export function classNames(...args: unknown[]) {
  const classes: (string | number)[] = [];

  args.forEach((arg) => {
    if (!arg) return;
    switch (typeof arg) {
      case 'string':
      case 'number':
        classes.push(arg);
        return;
      case 'object':
        if (Array.isArray(arg)) {
          const inner = classNames(...arg);
          if (inner) {
            classes.push(inner);
          }
          return;
        }
        Object.entries(arg).forEach(([key, val]) => {
          if (Object.hasOwn(arg, key) && val) {
            classes.push(key);
          }
        });
        return;
    }
  });

  return classes.join(' ');
}
