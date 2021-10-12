export default class CheckboxWithFieldset {
  constructor(fieldset, input) {
    this.fieldset = fieldset;
    this.input = input;
    this.childInputs = [...this.fieldset.querySelectorAll('input')];
    this.input.addEventListener('change', this.uncheckChildInputs.bind(this));
  }

  uncheckChildInputs() {
    if (this.input.checked === false) {
      this.childInputs.forEach(input => {
        input.checked = false;
      });
    }
  }
}
