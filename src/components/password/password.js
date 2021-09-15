const classToggleWrap = 'ons-js-password-toggle-wrap';
const classToggle = 'ons-js-password-toggle';
const classInput = 'ons-js-password-input';

export default class Password {
  constructor(context) {
    this.toggleWrap = context.querySelector(`.${classToggleWrap}`);
    this.toggle = this.toggleWrap.querySelector(`.${classToggle}`);
    this.input = context.querySelector(`.${classInput}`);

    this.toggle.addEventListener('change', this.handleToggleChange.bind(this));
    this.toggleWrap.classList.remove('ons-u-d-no');
  }

  handleToggleChange() {
    this.input.type = this.toggle.checked ? 'text' : 'password';
  }
}
