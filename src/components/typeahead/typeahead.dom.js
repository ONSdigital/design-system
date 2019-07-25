import domready from 'js/domready';

async function initialiseTypeaheads() {
  const typeaheads = [...document.querySelectorAll('js-typeahead')];

  if (typeaheads.length) {
    const Typeahead = (await import('./typeahead')).default;

    typeaheads.forEach(typeahead => new Typeahead(typeahead));
  }
}

domready(initialiseTypeaheads);
