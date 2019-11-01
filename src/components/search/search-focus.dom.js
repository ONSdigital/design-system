import domready from 'js/domready';

async function initialise() {
  const focusInputEl = [...document.querySelectorAll('.js-search-focus')];

  if (focusInputEl.length) {
    const FocusInput = (await import('./search-focus')).default;

    focusInputEl.forEach(input => new FocusInput(input));
  }
}

domready(initialise);
