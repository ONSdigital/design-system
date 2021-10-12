import domready from '../../js/domready';

domready(async () => {
  const checkboxes = [...document.querySelectorAll('.ons-js-checkbox')];

  if (checkboxes.length) {
    const Checkboxes = (await import('./checkboxes-with-reveal')).default;

    new Checkboxes(checkboxes);
  }

  const openOther = document.querySelector('.ons-checkbox__other--open');
  if (openOther) {
    const parent = openOther.parentNode;
    const checkboxInput = parent.querySelector('.ons-checkbox__input');
    const CheckCheckbox = (await import('../radios/check-radios')).default;

    new CheckCheckbox(checkboxInput, openOther);
  }

  const otherFieldset = document.querySelector('.ons-js-other-fieldset');
  if (otherFieldset) {
    const otherCheckbox = document.querySelector('.ons-checkbox-other');
    const CheckboxWithInnerFieldset = (await import('./checkbox-with-fieldset')).default;

    new CheckboxWithInnerFieldset(otherFieldset, otherCheckbox);
  }

  const autoSelectButtons = [...document.querySelectorAll('.ons-js-auto-selector')];
  if (autoSelectButtons) {
    const CheckboxWithAutoSelect = (await import('./checkbox-with-autoselect')).default;
    autoSelectButtons.forEach(button => {
      const context = button.parentNode;
      new CheckboxWithAutoSelect(context, button);
    });
  }
});
