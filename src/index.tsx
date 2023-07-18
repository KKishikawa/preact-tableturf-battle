import { render } from 'preact';

import App from '@/app';

import '@/styles/style.pcss';
import '@/utils/appTheme';

const rootDOM = document.getElementById('app') as HTMLElement;

render(<App />, rootDOM);
