import { baseClass } from './typeahead.ui';
import Typeahead from './typeahead';
import domready from 'js/domready';

function initialiseTypeaheads() {
  const typeaheads = [...document.querySelectorAll(`.${baseClass}`)];

  typeaheads.forEach(typeahead => new Typeahead(typeahead));
}

domready(initialiseTypeaheads);
