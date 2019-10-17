export default class SubmitButton {
  constructor(button, form) {
    this.button = button;
    this.form = form;
    console.log(form);
    this.form.addEventListener('submit', this.submitButton.bind(this));
  }

  submitButton() {
    this.button.classList.add('is-loading');
    this.button.setAttribute('disabled', true);
  }
}
