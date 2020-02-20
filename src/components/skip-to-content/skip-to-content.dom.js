import domready from 'js/domready';
import skipToMain from './skip-to-content';

async function initaliseSkipToLink() {
  const link = document.querySelector('.skip__link');
  if (link) {
    skipToMain(link);
  }
}

domready(initaliseSkipToLink);
