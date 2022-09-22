import domready from '../../js/domready';

domready(async () => {
  const checkboxes = [...document.querySelectorAll('.ons-js-checkbox')];

  if (checkboxes.length) {
    const Checkboxes = (await import('./checkboxes-with-reveal')).default;
    new Checkboxes(checkboxes);

    const openOther = document.querySelector('.ons-checkbox__other--open');
    if (openOther) {
      const checkboxInput = openOther.parentNode.querySelector('.ons-checkbox__input');
      const CheckCheckbox = (await import('../radios/check-radios')).default;

      new CheckCheckbox(checkboxInput, openOther);
    }

    const otherFieldsets = [...document.querySelectorAll('.ons-js-other-fieldset-checkbox')];
    if (otherFieldsets) {
      const CheckboxWithInnerFieldset = (await import('./checkbox-with-fieldset')).default;
      otherFieldsets.forEach(otherFieldset => {
        const context = otherFieldset.closest('.ons-checkbox');
        new CheckboxWithInnerFieldset(context);
      });
    }

    const autoSelectButtons = [...document.querySelectorAll('.ons-js-auto-selector')];
    if (autoSelectButtons) {
      const CheckboxWithAutoSelect = (await import('./checkbox-with-autoselect')).default;
      autoSelectButtons.forEach(button => {
        const context = button.parentNode;
        const insideReveal = context.parentNode.parentNode.querySelector('.ons-js-other');
        new CheckboxWithAutoSelect(context, button, insideReveal);
      });
    }
  }
});
