export default class ReplyInput {
  constructor(context) {
    this.context = context;
    this.input = this.context.querySelector('.input');
    this.button = this.context.querySelector('.btn');

    this.input.addEventListener('change', enableDisableButton(this.input, this.button));
    this.input.addEventListener('oninput', enableDisableButton(this.input, this.button));
    this.input.addEventListener('onpropertychange', enableDisableButton(this.input, this.button));
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
