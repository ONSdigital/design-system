import DOMReady from 'js/domready';

class Feedback {
  constructor() {
    const buttons = [...document.querySelectorAll('.js-feedback-button')];

    this.details = document.querySelector('.js-feedback');

    if (this.details) {
      buttons.forEach(button => button.addEventListener('click', this.openFeedback.bind(this)));

      this.form = this.details.querySelector('.js-feedback-form');
      this.textarea = this.details.querySelector('.js-feedback-textarea');
      this.name = this.details.querySelector('.js-feedback-name');
      this.email = this.details.querySelector('.js-feedback-email');
      this.button = this.details.querySelector('.js-feedback-send');

      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }

  openFeedback() {
    if (this.details && !this.details.open) {
      this.details.querySelector('.js-collapsible-summary').click();
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setFieldsEditability(false);

    const body = new FormData(this.form);

    const response = await fetch(this.form.action, {
      method: 'POST',
      body
    });

    if (response.ok) {
      const thankYouMessage = document.createElement('p');
      thankYouMessage.innerText = this.form.getAttribute('data-thank-you');

      this.details.parentElement.insertBefore(thankYouMessage, this.details.nextSibling);

      this.details.remove();
    } else {
      alert(this.form.getAttribute('data-error-message').replace('{x}', response.status));
      this.setFieldsEditability(true);
    }
  }

  setFieldsEditability(enabled) {
    [this.textarea, this.name, this.email, this.button].forEach(element => (element.disabled = !enabled));

    this.button.classList[enabled ? 'remove' : 'add']('is-loading');
  }
}

DOMReady(() => new Feedback());
