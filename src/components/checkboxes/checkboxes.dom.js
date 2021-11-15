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

    const other = document.querySelector('.ons-js-other');
    if (other) {
      const selectAllChildrenInput = other.classList.contains('ons-js-select-all-children');
      const otherFieldset = other.parentNode.querySelector('.ons-js-other-fieldset');

      if (otherFieldset) {
        const CheckboxWithInnerFieldset = (await import('./checkbox-with-fieldset')).default;

        new CheckboxWithInnerFieldset(otherFieldset, checkboxes, selectAllChildrenInput);
      }
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
