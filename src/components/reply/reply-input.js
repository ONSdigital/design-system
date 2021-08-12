export default class ReplyInput {
  constructor(context) {
    this.context = context;
    this.input = this.context.querySelector('.ons-input');
    this.button = this.context.querySelector('.ons-btn');

    this.enableDisableButton(this.input);

    this.input.addEventListener('input', this.enableDisableButton.bind(this));
  }

  enableDisableButton() {
    if (this.input.value.trim() != '') {
      this.button.disabled = false;
      this.button.classList.remove('ons-btn--disabled');
    } else {
      this.button.disabled = true;
      this.button.classList.add('ons-btn--disabled');
    }
  }
}
