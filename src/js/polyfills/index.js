// This must be included for dynamic imports to work on IE
import 'core-js/fn/promise';
// This must be included for CustomEvent to work on IE
import 'mdn-polyfills/CustomEvent';

export const polyfillsReadyEvent = 'polyfills-loaded';

const promises = [];

if (!Array.prototype.includes) {
  promises.push(import('core-js/modules/es7.array.includes'));
  console.log('Array#includes polyfill loaded');
}

if (!Array.prototype.find) {
  promises.push(import('core-js/modules/es6.array.find'));
  console.log('Array#find polyfill loaded');
}

if (!Array.from) {
  promises.push(import('core-js/modules/es6.array.from'));
  console.log('Array#from polyfill loaded');
}


if (!Object.assign) {
  promises.push(import('core-js/fn/object/assign'));
  console.log('Object#assign polyfill loaded');
}

if (!window.Symbol) {
  promises.push(import('core-js/fn/symbol'));
  console.log('Symbol polyfill loaded');
}

if (!Element.prototype.append) {
  promises.push(import('mdn-polyfills/Node.prototype.append'));
  console.log('Node#append polyfill loaded');
}

if(!Element.prototype.remove) {
  promises.push(import('mdn-polyfills/Node.prototype.remove'));
  console.log('Node#remove polyfill loaded');
}

Promise.all(promises).then(() => {
  const event = new CustomEvent(polyfillsReadyEvent);
  document.dispatchEvent(event);
  window.polyfillsLoaded = true;
});
