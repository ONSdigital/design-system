import UAC from './uac';
import domready from 'js/domready';

domready(() => {
  [...document.querySelectorAll('.js-uac')].forEach(element => new UAC(element));
});
