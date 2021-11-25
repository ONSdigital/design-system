let i = 0;
export default class SubmitButton {
  constructor(button, submitType) {
    this.button = button;
    this.form = this.button.closest('form');
    this.submitType = submitType;

    if (this.submitType == 'loader') {
      if (this.form && this.form.length) {
        this.form.addEventListener('submit', this.loaderButton.bind(this));
      } else {
        this.button.addEventListener('click', this.loaderButton.bind(this));
      }
    } else if (this.submitType == 'timer') {
      if (this.form && this.form.length) {
        this.form.addEventListener('submit', this.timerButton.bind(this));
      } else {
        this.button.addEventListener('click', this.timerButton.bind(this));
      }
    } else if (this.submitType == 'link') {
      this.button.addEventListener('keydown', this.linkButton.bind(this));
    }
  }

  loaderButton(event) {
    const loaderButtonEl = event.submitter ? event.submitter : this.button;
    loaderButtonEl.classList.add('ons-is-loading');
    loaderButtonEl.setAttribute('disabled', true);
  }

  timerButton(event) {
    const timerButtonEl = event.submitter ? event.submitter : this.button;
    if (timerButtonEl.tagName === 'A') {
      i++;
      if (i > 1) {
        event.preventDefault();
      }
    } else {
      timerButtonEl.setAttribute('disabled', true);
    }
    setTimeout(
      timerButtonEl => {
        timerButtonEl.removeAttribute('disabled');
        i = 0;
      },
      1000,
      timerButtonEl,
    );
  }

  linkButton(e) {
    if (e.keyCode == 32) {
      e.preventDefault();
      this.button.click();
    }
  }
}
