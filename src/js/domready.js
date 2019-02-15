import { awaitPolyfills } from 'js/polyfills/await-polyfills';

const eventReady = 'DOMContentLoaded';

let callbacks = [];
let isReady = false;

const onReady = () => {
  isReady = true;
  callbacks.forEach(fn => fn.call());
  document.removeEventListener(eventReady, onReady);

  const event = new CustomEvent('onsDOMReady');

  document.dispatchEvent(event);
  window.onsDOMReady = true;
};

export default function ready(fn, ready = isReady) {
  if (ready) {
    fn.call();
  } else {
    callbacks.push(fn);
  }
}

awaitPolyfills.then(() => {
  if (['interactive', 'complete'].includes(document.readyState)) {
    onReady.call();
  } else {
    document.addEventListener(eventReady, onReady);
  }
});
