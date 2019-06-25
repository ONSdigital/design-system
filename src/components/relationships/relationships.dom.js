import Relationships from './relationships';
import domready from 'js/domready';

domready(() => {
  [...document.querySelectorAll('.js-relationships')].forEach(element => new Relationships(element));
});
