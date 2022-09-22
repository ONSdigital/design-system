export default class RadioWithFieldset {
  constructor(context) {
    this.context = context;
    this.radios = [...context.closest('.ons-radios__items').querySelectorAll('.ons-js-radio')];
    this.childInputs = [...this.context.querySelectorAll('input')];
    this.selectAllChildrenInput = this.context.querySelector('.ons-js-select-all-children');

    if (this.selectAllChildrenInput) {
      this.selectAllChildrenInput.addEventListener('change', this.checkChildInputsOnSelect.bind(this));
    } else {
      this.radios.forEach(radio => radio.addEventListener('change', this.uncheckChildInputsOnDeselect.bind(this)));
    }
  }

  checkChildInputsOnSelect() {
    this.childInputs.forEach(input => {
      input.checked = this.selectAllChildrenInput.checked === true ? true : false;
    });
  }

  uncheckChildInputsOnDeselect() {
    const isOther = this.radios.find(radio => radio.classList.contains('ons-js-other'));
    if (isOther && isOther.checked === false) {
      this.childInputs.forEach(input => {
        input.checked = false;
      });
    }
  }
}
