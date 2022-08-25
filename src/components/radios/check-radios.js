export default class CheckRadios {
  constructor(radio, openOther) {
    this.radio = radio;
    this.openOther = openOther;
    this.input = this.openOther.querySelector('.ons-input');
    this.input.tabIndex = -1;

    this.setInputBlurAttributes();
    this.input.addEventListener('focus', this.checkRadio.bind(this));
    this.radio.addEventListener('change', this.setInputFocusAttributes.bind(this));
    this.radio.addEventListener('focus', this.setInputFocusAttributes.bind(this));
    if (this.radio.type == 'radio') {
      this.input.addEventListener('blur', this.setInputBlurAttributes.bind(this));
    }
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
