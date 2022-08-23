export default class CheckboxWithFieldset {
  constructor(fieldset) {
    this.fieldset = fieldset;
    this.fieldsetParent = fieldset.closest('.ons-checkbox');
    this.selectAllChildrenInput = this.fieldsetParent.querySelector('.ons-js-select-all-children');
    this.childInputs = [...this.fieldset.querySelectorAll('input')];

    if (this.selectAllChildrenInput) {
      this.selectAllChildrenInput.addEventListener('change', this.checkChildInputsOnSelect.bind(this));
    } else {
      this.inputs.forEach(input => input.addEventListener('change', this.uncheckChildInputsOnDeselect.bind(this)));
    }
  }

  checkChildInputsOnSelect() {
    this.childInputs.forEach(input => {
      input.checked = this.selectAllChildrenInput.checked === true ? true : false;
    });
  }

  uncheckChildInputsOnDeselect() {
    const isOther = this.inputs.find(input => input.classList.contains('ons-js-other'));
    if (isOther && isOther.checked === false) {
      this.childInputs.forEach(input => {
        input.checked = false;
      });
    }
  }
}
