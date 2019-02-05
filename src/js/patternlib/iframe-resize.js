import { iframeResizer } from 'iframe-resizer';
import domReady from 'js/domready';

domReady(() => {
  iframeResizer(
    {
      heightCalculationMethod: 'max',
      scrolling: 'omit'
    },
    'iframe'
  );
});
