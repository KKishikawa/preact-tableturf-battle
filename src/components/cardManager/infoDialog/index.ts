import { openShareDialog } from '@/components/deckShare/openDialog';
import {
  type EditCard,
  availableInkCount,
  availableSP,
  encodeDeckCode,
} from '@/models/card';
import { openDialog } from '@/utils/dialog';

import { InfoDialog } from './infoBody';

export function openInfoDialog(cards: EditCard[]) {
  const gcountr = cards.reduce<
    [number, Map<number, number>, Map<number, number>]
  >(
    (a, b) => {
      a[0] += b.gcount;
      a[1].set(b.gcount, (a[1].get(b.gcount) ?? 0) + 1);
      a[2].set(b.sp, (a[2].get(b.sp) ?? 0) + 1);
      return a;
    },
    [
      0,
      new Map(availableInkCount.map((c) => [c, 0])),
      new Map(availableSP.map((c) => [c, 0])),
    ]
  );
  // マス数の分布
  const _gcs = [...gcountr[1]];
  const gMaxCount = Math.max(..._gcs.map((v) => v[1]));
  const gcs = _gcs
    .map((g) => ({ k: g[0], v: (g[1] * 100) / gMaxCount }))
    .sort((a, b) => a.k - b.k);
  // spの分布
  const _sp = [...gcountr[2]];
  const spMax = Math.max(..._sp.map((v) => v[1]));
  const sps = _sp
    .map((g) => ({ k: g[0], v: (g[1] * 100) / spMax }))
    .sort((a, b) => a.k - b.k);

  const onClickShare = () => {
    openShareDialog(encodeDeckCode(cards.map((c) => c.n)));
  };
  openDialog({
    title: 'デッキ情報',
    body: InfoDialog({
      count: cards.length,
      gcount: gcountr[0],
      gcs,
      sps,
      onClickShare,
    }),
  });
}
