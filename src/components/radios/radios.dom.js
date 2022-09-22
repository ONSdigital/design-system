import domready from '../../js/domready';

domready(async () => {
  const radios = [...document.querySelectorAll('.ons-js-radio')];

  if (radios.length) {
    const Radios = (await import('../checkboxes/checkboxes-with-reveal')).default;

    new Radios(radios);

    const button = document.querySelector('.ons-js-clear-btn');
    const otherInput = document.querySelector('.ons-radio__other');
    if (button) {
      const ClearRadios = (await import('./clear-radios')).default;

      new ClearRadios(radios, button, otherInput);
    }

    const openOther = document.querySelector('.ons-radio__other--open');
    if (openOther) {
      const parent = openOther.parentNode;
      const radioInput = parent.querySelector('.ons-radio__input');
      const CheckRadios = (await import('./check-radios')).default;

      new CheckRadios(radioInput, openOther);
    }

    const otherFieldsets = [...document.querySelectorAll('.ons-js-other-fieldset-radio')];
    if (otherFieldsets) {
      const RadioWithInnerFieldset = (await import('./radio-with-fieldset')).default;
      otherFieldsets.forEach(otherFieldset => {
        const context = otherFieldset.closest('.ons-radio');
        new RadioWithInnerFieldset(context);
      });
    }
  }
});
