import domready from 'js/domready';

domready(async () => {
  const checkboxes = [...document.querySelectorAll('.js-checkbox')];

  if (checkboxes.length) {
    const Checkboxes = (await import('./checkboxes')).default;

    new Checkboxes(checkboxes);
  }
});
