export default class CheckboxWithFieldset {
  constructor(fieldset, inputs) {
    this.fieldset = fieldset;
    this.inputs = inputs;
    this.inputs.forEach(input => input.addEventListener('change', this.uncheckChildInputs.bind(this)));
    this.childInputs = [...this.fieldset.querySelectorAll('input')];
  }

  uncheckChildInputs() {
    const isOther = this.inputs.find(input => input.classList.contains('ons-js-other'));
    if (isOther && isOther.checked === false) {
      this.childInputs.forEach(input => {
        input.checked = false;
      });
    }
  }
}
