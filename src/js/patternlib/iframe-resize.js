import { iframeResizer } from 'iframe-resizer';
import domReady from 'js/domready';

function resize() {
  iframeResizer(
    {
      autoResize: true,
      heightCalculationMethod: 'max',
      scrolling: 'omit',
    },
    '.patternlib-example__iframe',
  );
}

domReady(() => {
  setTimeout(function() {
    resize();
  }, 1000);
});
