const classToggleWrap = 'js-password-toggle-wrap';
const classToggle = 'js-password-toggle';
const classInput = 'js-password-input';

export default class Password {
  constructor(context) {
    this.toggleWrap = context.querySelector(`.${classToggleWrap}`);
    this.toggle = this.toggleWrap.querySelector(`.${classToggle}`);
    this.input = context.querySelector(`.${classInput}`);

    this.toggle.addEventListener('change', this.handleToggleChange.bind(this));
    this.toggleWrap.classList.remove('u-d-no');
  }

  handleToggleChange() {
    this.input.type = this.toggle.checked ? 'text' : 'password';
  }
}
