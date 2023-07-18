import { DeckCodeReaderForm } from './deckCodeReaderForm';
import { SiteInfoButton } from './siteInfoButton';
import { ThemeSettingButtons } from './themeSettingButtons';

export const Header = () => {
  return (
    <nav class="px-2 pb-3 bg-blue-300 border-gray-200 dark:bg-indigo-900">
      <div class="container flex flex-wrap items-center px-3 mx-auto">
        <span class="mt-3 text-xl font-medium dark:text-white">
          <span class="mr-2">非公式</span>
          <span>ナワバトラーデッキビルダー</span>
        </span>
        <SiteInfoButton />
        <div class="flex-auto"></div>
        <div class="flex items-center">
          <DeckCodeReaderForm />
          <ThemeSettingButtons />
        </div>
      </div>
    </nav>
  );
};
