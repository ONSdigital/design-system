export default class ReplyInput {
  constructor(context) {
    this.context = context;
    this.input = this.context.querySelector('.input');
    this.button = this.context.querySelector('.btn');

    this.enableDisableButton(this.input, this.button);

    this.input.addEventListener('change', this.enableDisableButton(this.input, this.button));
    this.input.addEventListener('input', this.enableDisableButton(this.input, this.button));
    this.input.addEventListener('onpropertychange', this.enableDisableButton(this.input, this.button));
  }

  enableDisableButton(input, button) {
    if (input.value.trim() != '') {
      button.disabled = false;
      button.classList.remove('btn--disabled');
    } else {
      button.disabled = true;
      button.classList.add('btn--disabled');
    }
  }
}
