import domready from 'js/domready';

domready(async () => {
  const radios = [...document.querySelectorAll('.js-radio')];

  if (radios.length) {
    const Radios = (await import('components/checkboxes/checkboxes')).default;

    new Radios(radios);
  }
});
