export default class CheckRadios {
  constructor(radio, openOther) {
    this.radio = radio;
    this.openOther = openOther;
    this.input = this.openOther.querySelector('.input');

    this.setInputBlurAttributes();
    this.input.addEventListener('focus', this.checkRadio.bind(this));
    this.radio.addEventListener('focus', this.setInputFocusAttributes.bind(this));
    this.radio.addEventListener('blur', this.setInputBlurAttributes.bind(this));
  }

  checkRadio() {
    this.radio.checked = true;
  }

  setInputFocusAttributes() {
    this.input.tabIndex = 0;
  }

  setInputBlurAttributes() {
    this.input.tabIndex = -1;
  }
}
