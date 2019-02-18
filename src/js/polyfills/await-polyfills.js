import { polyfillsReadyEvent } from './index';

export const awaitPolyfills = new Promise(resolve => {
  if (window.polyfillsLoaded) {
    resolve();
  } else {
    document.addEventListener(polyfillsReadyEvent, resolve);
  }
});
