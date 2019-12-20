let clearAlertAnnounced;
export default class ClearRadios {
  constructor(inputs, button, otherInput) {
    this.inputs = inputs;
    this.button = button;
    this.otherInput = otherInput;
    this.ariaElement = document.querySelector('.js-clear-radio-alert');
    this.clearAlert = this.ariaElement.getAttribute('data-clear');
    this.clearedAlert = this.ariaElement.getAttribute('data-cleared');

    this.inputs.forEach(input => input.addEventListener('click', this.setClearAttributes.bind(this)));
    this.button.addEventListener('click', this.clearRadios.bind(this));
    this.checkRadios();

    if (this.otherInput) {
      const parent = this.otherInput.parentNode;
      this.otherField = parent.querySelector('.input');
      this.otherField.addEventListener('focus', this.setClearAttributes.bind(this));
    }

    clearAlertAnnounced = false;
  }

  checkRadios() {
    this.inputs.forEach(input => {
      if (input.checked) {
        this.setClearAttributes();
      }
    });
  }

  setClearAttributes() {
    this.button.classList.remove('u-db-no-js_enabled');
    if (clearAlertAnnounced === false) {
      this.ariaElement.innerHTML = this.clearAlert;
      clearAlertAnnounced = true;
    }
  }

  clearRadios() {
    this.button.classList.add('u-db-no-js_enabled');

    this.ariaElement.innerHTML = this.clearedAlert;
    clearAlertAnnounced = false;

    if (this.otherField) {
      this.otherField.value = '';
    }
  }
}
