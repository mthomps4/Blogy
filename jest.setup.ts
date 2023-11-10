// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { TextDecoder, TextEncoder } from 'text-encoding';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
