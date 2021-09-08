import domready from '../../js/domready';

domready(async () => {
  const checkboxes = [...document.querySelectorAll('.ons-js-checkbox')];

  if (checkboxes.length) {
    const Checkboxes = (await import('./checkboxes')).default;

    new Checkboxes(checkboxes);
  }

  const openOther = document.querySelector('.ons-checkbox__other--open');
  if (openOther) {
    const parent = openOther.parentNode;
    const checkboxInput = parent.querySelector('.ons-checkbox__input');
    const CheckCheckbox = (await import('../radios/check-radios')).default;

    new CheckCheckbox(checkboxInput, openOther);
  }
});
