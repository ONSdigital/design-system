import fetch from 'js/abortable-fetch';

export default class Feedback {
  constructor(buttons) {
    this.details = document.querySelector('.js-feedback');

    if (this.details) {
      this.id = this.details.getAttribute('id');

      buttons.forEach(button => button.addEventListener('click', this.openFeedback.bind(this)));

      this.form = this.details.querySelector('.js-feedback-form');
      this.textarea = this.details.querySelector('.js-feedback-textarea');
      this.name = this.details.querySelector('.js-feedback-name');
      this.email = this.details.querySelector('.js-feedback-email');
      this.pageUrl = this.details.querySelector('.js-feedback-email');
      this.pageUrl = this.details.querySelector('.js-feedback-page-url');
      this.pagTitle = this.details.querySelector('.js-feedback-page-title');
      this.button = this.details.querySelector('.js-feedback-send');

      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }

  openFeedback() {
    if (this.details) {
      const summary = this.details.querySelector('.js-collapsible-summary');

      if (!this.details.open) {
        summary.click();
      }

      // Focus the summary item for screen readers
      setTimeout(() => {
        summary.blur();
        summary.focus();
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const body = new FormData(this.form);

    this.setFieldsEditability(false);

    fetch(this.form.action, {
      method: 'POST',
      body,
      credentials: 'include',
    })
      .then(this.onSuccess.bind(this))
      .catch(this.onError.bind(this));
  }

  onSuccess() {
    const thankYouMessage = document.createElement('p');
    thankYouMessage.id = `${this.id}-thanks`;
    thankYouMessage.setAttribute('aria-live', 'assertive');
    thankYouMessage.innerText = this.form.getAttribute('data-thank-you');

    this.details.parentNode.insertBefore(thankYouMessage, this.details.nextSibling);

    this.details.remove();
  }

  onError(response) {
    alert(this.form.getAttribute('data-error-message').replace('{x}', response.status));
    this.setFieldsEditability(true);
  }

  setFieldsEditability(enabled) {
    const fields = [this.textarea, this.name, this.email, this.button];
    fields.forEach(element => {
      if (element !== null) {
        element.disabled = !enabled;
      }
    });

    this.button.classList[enabled ? 'remove' : 'add']('is-loading');
  }
}
