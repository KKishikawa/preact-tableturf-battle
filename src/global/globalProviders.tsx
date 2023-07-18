import type { ComponentChildren } from 'preact';

import { CardsProvider } from './cards/cardsProvider';
import { DeckProvider } from './deck/deckProvider';

export function GlobalProviders({ children }: { children: ComponentChildren }) {
  return (
    <DeckProvider>
      <CardsProvider>{children}</CardsProvider>
    </DeckProvider>
  );
}
