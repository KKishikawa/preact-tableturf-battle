import {
  mergeComparers,
  swapComparer,
  type Comparer,
  type PrependArguments,
} from '@/@types/utilTypes.types';

import type { EditCard } from '@/models/card';

export const sortOptions = [
  { value: '0', label: 'カードNo(昇順)' },
  { value: '1', label: 'カードNo(降順)' },
  { value: '2', label: 'マス数(昇順)' },
  { value: '3', label: 'マス数(降順)' },
  { value: '4', label: 'SP数(昇順)' },
  { value: '5', label: 'SP数(降順)' },
  { value: '6', label: 'レア度(昇順)' },
  { value: '7', label: 'レア度(降順)' },
] as const;

const compare_n: Comparer<EditCard> = (a, b) => a.n - b.n;
const compare_gcount: Comparer<EditCard> = (a, b) => a.gcount - b.gcount;
const compare_sp: Comparer<EditCard> = (a, b) => a.sp - b.sp;
const compare_rarity: Comparer<EditCard> = (a, b) => a.r - b.r;

const gcountAsc: Comparer<EditCard> = mergeComparers(
  compare_gcount,
  compare_sp,
  compare_n
);
const spAsc: Comparer<EditCard> = mergeComparers(
  compare_sp,
  compare_gcount,
  compare_n
);
const rarityAsc: Comparer<EditCard> = mergeComparers(compare_rarity, compare_n);
export function getSortComparer(orderType: string): Comparer<EditCard> {
  switch (orderType) {
    case '1':
      return swapComparer(compare_n);
    case '2':
      return gcountAsc;
    case '3':
      return swapComparer(gcountAsc);
    case '4':
      return spAsc;
    case '5':
      return swapComparer(spAsc);
    case '6':
      return rarityAsc;
    case '7':
      return swapComparer(rarityAsc);
    default:
      return compare_n;
  }
}

export type CardFilterOption = {
  name?: string;
  maxg?: number;
  ming?: number;
  maxsp?: number;
  minsp?: number;
};
type CardPredicate = (card: EditCard) => boolean;

export function getFilterPredicate(opt?: CardFilterOption): CardPredicate {
  const predicates: CardPredicate[] = [];

  function addPredicate<T>(
    optParam: T,
    predicate: PrependArguments<[nonNullParam: NonNullable<T>], CardPredicate>
  ) {
    if (optParam != null) predicates.push(predicate.bind(null, optParam));
  }
  if (opt) {
    addPredicate(opt.name, (name, card) => card.ja.includes(name));
    addPredicate(opt.maxg, (maxg, card) => card.gcount <= maxg);
    addPredicate(opt.ming, (ming, card) => card.gcount >= ming);
    addPredicate(opt.maxsp, (maxsp, card) => card.sp <= maxsp);
    addPredicate(opt.minsp, (minsp, card) => card.sp >= minsp);
  }
  return (card: EditCard) => predicates.every((fn) => fn(card));
}
