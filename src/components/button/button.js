export default class SubmitButton {
  constructor(button, form, submitType) {
    this.button = button;
    this.form = form;
    this.submitType = submitType;
    if (this.submitType == 'loader') {
      this.form.addEventListener('submit', this.loaderButton.bind(this));
    } else if (this.submitType == 'timer') {
      this.form.addEventListener('submit', this.timerButton.bind(this));
    }
  }

  loaderButton() {
    this.button.classList.add('is-loading');
    this.button.setAttribute('disabled', true);
  }

  timerButton() {
    this.button.setAttribute('disabled', true);
    setTimeout(
      () => {
        button.removeAttribute('disabled');
      },
      1000,
      this.button,
    );
  }
}
