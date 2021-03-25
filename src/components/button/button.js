let i = 0;
export default class SubmitButton {
  constructor(button, submitType) {
    this.button = button;
    this.form = [...document.getElementsByTagName('form')][0];
    this.submitType = submitType;

    if (this.submitType == 'loader') {
      if (this.form.length) {
        this.form.addEventListener('submit', this.loaderButton.bind(this));
      } else {
        this.button.addEventListener('click', this.loaderButton.bind(this));
      }
    } else if (this.submitType == 'timer') {
      if (this.form.length) {
        this.form.addEventListener('submit', this.timerButton.bind(this));
      } else {
        this.button.addEventListener('click', this.timerButton.bind(this));
      }
    } else if (this.submitType == 'link') {
      this.button.addEventListener('keydown', this.linkButton.bind(this));
    }
  }

  loaderButton() {
    this.button.classList.add('is-loading');
    this.button.setAttribute('disabled', true);
  }

  timerButton(event) {
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

  linkButton(e) {
    if (e.keyCode == 32) {
      e.preventDefault();
      this.button.click();
    }
  }
}
