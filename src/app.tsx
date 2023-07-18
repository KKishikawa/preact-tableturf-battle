import { CardManager } from '@/components/cardManager';
import { DeckManager } from "@/components/deckManager"
import { Header } from '@/components/header';
import { GlobalProviders } from '@/global/globalProviders';

const App = () => {
  return (
    <GlobalProviders>
      <Header />
      <main class="m-4">
        <DeckManager />
        <CardManager />
      </main>
    </GlobalProviders>
  );
};

export default App;
