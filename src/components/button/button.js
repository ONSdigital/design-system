let i = 0;
export default class SubmitButton {
  constructor(button, submitType) {
    this.button = button;
    this.form = [...document.getElementsByTagName('form')][0];
    this.submitType = submitType;

    if (this.submitType == 'loader') {
      this.button.addEventListener('click', this.loaderButton.bind(this));
    } else if (this.submitType == 'timer') {
      this.button.addEventListener('click', this.timerButton.bind(this));
    }
  }

  loaderButton() {
    if (this.form && this.form.length) {
      this.form.submit();
    }
    this.button.classList.add('is-loading');
    this.button.setAttribute('disabled', true);
  }

  timerButton(event) {
    if (this.form && this.form.length) {
      this.form.submit();
    }
    if (this.button.tagName === 'A') {
      i++;
      if (i > 1) {
        event.preventDefault();
      }
    } else {
      this.button.setAttribute('disabled', true);
    }
    setTimeout(
      button => {
        button.removeAttribute('disabled');
        i = 0;
      },
      1000,
      this.button,
    );
  }
}
