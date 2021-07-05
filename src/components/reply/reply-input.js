export default class ReplyInput {
  constructor(context) {
    this.context = context;
    this.input = this.context.querySelector('.input');
    this.button = this.context.querySelector('.btn');

    this.enableDisableButton(this.input);

    this.input.addEventListener('input', this.enableDisableButton.bind(this));
  }

  enableDisableButton() {
    console.log(this.input.value);
    if (this.input.value.trim() != '') {
      this.button.disabled = false;
      this.button.classList.remove('btn--disabled');
    } else {
      this.button.disabled = true;
      this.button.classList.add('btn--disabled');
    }
  }
}
