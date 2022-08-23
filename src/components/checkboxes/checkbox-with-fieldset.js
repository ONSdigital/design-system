export default class CheckboxWithFieldset {
  constructor(fieldset, checkboxes) {
    this.fieldset = fieldset;
    this.checkboxes = checkboxes;
    this.fieldsetParent = fieldset.closest('.ons-checkbox');
    this.selectAllChildrenInput = this.fieldsetParent.querySelector('.ons-js-select-all-children');
    this.childInputs = [...this.fieldset.querySelectorAll('input')];

    if (this.selectAllChildrenInput) {
      this.selectAllChildrenInput.addEventListener('change', this.checkChildInputsOnSelect.bind(this));
    } else {
      this.checkboxes.forEach(checkbox => checkbox.addEventListener('change', this.uncheckChildInputsOnDeselect.bind(this)));
    }
  }

  checkChildInputsOnSelect() {
    this.childInputs.forEach(input => {
      input.checked = this.selectAllChildrenInput.checked === true ? true : false;
    });
  }

  uncheckChildInputsOnDeselect() {
    const isOther = this.checkboxes.find(checkbox => checkbox.classList.contains('ons-js-other'));
    if (isOther && isOther.checked === false) {
      this.childInputs.forEach(input => {
        input.checked = false;
      });
    }
  }
}
