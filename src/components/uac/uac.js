export default class UAC {
  constructor(context) {
    this.input = context;

    this.bindEventListeners();
  }

  bindEventListeners() {
    this.input.addEventListener('input', this.handleInput.bind(this));
  }

  handleInput() {
    this.input.value = this.input.value
      .replace(/\s/g, '')
      .match(/.{1,4}/g)
      .join('  ');
  }
}
