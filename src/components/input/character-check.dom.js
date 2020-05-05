import domready from 'js/domready';

async function initialise() {
  const checkedWrapper = [...document.querySelectorAll('.js-char-check')];

  if (checkedWrapper.length) {
    const CharCheck = (await import('./character-check')).default;

    checkedWrapper.forEach(input => new CharCheck(input));
  }
}

domready(initialise);
