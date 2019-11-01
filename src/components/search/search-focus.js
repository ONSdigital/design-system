export default class FocusInput {
  constructor(input) {
    this.input = input;
    this.input.addEventListener('focus', this.setFocusState.bind(this));
    this.input.addEventListener('input', this.setFocusState.bind(this));
  }

  setFocusState() {
    const value = this.input.value.length;
    this.input.classList[value > 0 ? 'add' : 'remove']('input--has-content');
  }
}
