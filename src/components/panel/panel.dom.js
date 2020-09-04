import domready from 'js/domready';
import errorPanel from './panel';

async function initaliseErrorPanel() {
  const panel = document.querySelector('.js-error-panel');
  if (panel) {
    errorPanel(panel);
  }
}

domready(initaliseErrorPanel);
