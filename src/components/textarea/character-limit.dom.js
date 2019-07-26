import domready from 'js/domready';

async function initialise() {
  const limitedInputs = [...document.querySelectorAll('.js-charlimit-input')];

  if (limitedInputs.length) {
    const CharLimit = (await import('./character-limit')).default;

    limitedInputs.forEach(input => new CharLimit(input));
  }
}

domready(initialise);
