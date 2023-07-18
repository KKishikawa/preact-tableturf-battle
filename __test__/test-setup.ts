import 'vitest-dom/extend-expect';
import '@testing-library/jest-dom';
import { expect } from 'vitest';
import * as domMatchers from 'vitest-dom/matchers';

expect.extend(domMatchers);
