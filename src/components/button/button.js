export default class LoaderButton {
  constructor(button, form) {
    this.button = button;
    this.form = form;
    this.form.addEventListener('submit', this.loaderButton.bind(this));
  }

  loaderButton() {
    this.button.classList.add('is-loading');
    this.button.setAttribute('disabled', true);
  }
}
