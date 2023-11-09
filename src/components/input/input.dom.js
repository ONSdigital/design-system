import domready from '../../js/domready';

domready(async () => {
  const abbrInputs = [...document.querySelectorAll('.ons-js-input-abbr')];

  if (abbrInputs.length) {
    const abbr = (await import('./input')).default;

    abbrInputs.forEach((element) => new abbr(element));
  }
});
