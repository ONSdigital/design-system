import 'core-js/fn/promise';

export const polyfillsReadyEvent = 'polyfills-loaded';

export const awaitPolyfills = new Promise(resolve => {
  if (window.polyfillsLoaded) {
    resolve();
  } else {
    document.addEventListener('polyfills-loaded', resolve);
  }
});
