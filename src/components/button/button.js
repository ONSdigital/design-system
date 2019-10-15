export default class SubmitButton {
  constructor(component) {
    this.button = component;
    this.button.addEventListener('click', this.loadingButton.bind(this));
  }

  loadingButton() {
    this.button.classList.add('is-loading');
    this.button.setAttribute('disabled', true);
  }
}
