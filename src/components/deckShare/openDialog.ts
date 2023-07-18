import { openDialog } from '@/utils/dialog';

import { ShareBody } from './sharebody';

export function openShareDialog(code: string) {
  openDialog({
    title: 'デッキコード',
    body: ShareBody({ code }),
  });
}

