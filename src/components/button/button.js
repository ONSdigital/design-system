export default class Button {
  constructor(submitButton) {
    submitButton.className += ' btn--loader is-loading';
    this.disabled = submitButton.getAttribute('disabled') === 'true';
  }
}
