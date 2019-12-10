export default class CheckRadios {
  constructor(radio, openOther) {
    this.radio = radio;
    this.openOther = openOther;
    this.input = this.openOther.querySelector('.input');

    this.input.addEventListener('focus', this.checkRadio.bind(this));
  }

  checkRadio() {
    this.radio.checked = true;
  }
}
