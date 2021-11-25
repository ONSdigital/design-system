export default class CheckRadios {
  constructor(radio, openOther) {
    this.radio = radio;
    this.openOther = openOther;
    this.input = this.openOther.querySelector('.ons-input');

    this.setInputBlurAttributes();
    this.input.addEventListener('focus', this.checkRadio.bind(this));
    this.radio.addEventListener('change', this.setInputFocusAttributes.bind(this));
    this.radio.addEventListener('blur', this.setInputBlurAttributes.bind(this));
  }

  checkRadio() {
    this.radio.checked = true;
  }

  setInputFocusAttributes() {
    this.input.tabIndex = this.radio.checked ? 0 : -1;
  }

  setInputBlurAttributes() {
    this.input.tabIndex = -1;
  }
}
