import domready from 'js/domready';
import autosize from 'autosize';

async function initialise() {
  const limitedInputs = [...document.querySelectorAll('.js-charlimit-input')];
  autosize(document.querySelectorAll('textarea'));

  if (limitedInputs.length) {
    const CharLimit = (await import('./character-limit')).default;

    limitedInputs.forEach(input => new CharLimit(input));
  }
}

domready(initialise);
