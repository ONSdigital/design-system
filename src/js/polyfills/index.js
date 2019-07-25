// This must be included for dynamic imports to work on IE
import 'core-js/fn/promise';
// This must be included for CustomEvent to work on IE
import 'mdn-polyfills/CustomEvent';

import { polyfillsReadyEvent } from './await-polyfills';

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

if (!String.prototype.includes) {
  promises.push(import('core-js/modules/es6.string.includes'));
  console.log('String#includes polyfill loaded');
}

if (!window.Symbol) {
  promises.push(import('core-js/fn/symbol'));
  console.log('Symbol polyfill loaded');
}

if (!Element.prototype.append) {
  promises.push(import('mdn-polyfills/Node.prototype.append'));
  console.log('Node#append polyfill loaded');
}

if (!Element.prototype.remove) {
  promises.push(import('mdn-polyfills/Node.prototype.remove'));
  console.log('Node#remove polyfill loaded');
}

if (!Element.prototype.closest) {
  promises.push(import('mdn-polyfills/Element.prototype.closest'));
  console.log('Element#closest polyfill loaded');
}

if (!String.prototype.padStart) {
  promises.push(import('core-js/fn/string/pad-start'));
  console.log('String#padStart polyfill loaded');
}

if (!String.prototype.trimStart) {
  promises.push(import('core-js/fn/string/trim-start'));
  console.log('String#trimStart polyfill loaded');
}

if (!(window.Request && 'signal' in new Request(''))) {
  promises.push(import('./abortable-fetch'));
  console.log('fetch and AbortController polyfills loaded');
}

if (!window.URLSearchParams) {
  promises.push(import('url-search-params-polyfill'));
  console.log('URLSearchParams polyfill loaded');
}

Promise.all(promises).then(() => {
  const event = new CustomEvent(polyfillsReadyEvent);
  document.dispatchEvent(event);
  window.polyfillsLoaded = true;
});
