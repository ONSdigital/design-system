import { iframeResizer } from 'iframe-resizer';

import domready from '../domready';

function resize() {
  iframeResizer(
    {
      autoResize: true,
      heightCalculationMethod: 'max',
      scrolling: 'omit',
    },
    '.ons-patternlib-example__iframe--resize',
  );
}

domready(() => {
  setTimeout(function() {
    resize();
  }, 1000);
});
