import fetch from 'js/abortable-fetch';

export default class Feedback {
  constructor(buttons) {
    this.collapsible = document.querySelector('.js-feedback');

    if (this.collapsible) {
      this.id = this.collapsible.getAttribute('id');

      buttons.forEach(button => button.addEventListener('click', this.openFeedback.bind(this)));

      this.form = this.collapsible.querySelector('.js-feedback-form');
      this.textarea = this.collapsible.querySelector('.js-feedback-textarea');
      this.name = this.collapsible.querySelector('.js-feedback-name');
      this.email = this.collapsible.querySelector('.js-feedback-email');
      this.pageUrl = this.collapsible.querySelector('.js-feedback-email');
      this.pageUrl = this.collapsible.querySelector('.js-feedback-page-url');
      this.pagTitle = this.collapsible.querySelector('.js-feedback-page-title');
      this.button = this.collapsible.querySelector('.js-feedback-send');

      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }

  openFeedback() {
    if (this.collapsible) {
      const collapsibleHeader = this.collapsible.querySelector('.js-collapsible-heading');

      if (!this.collapsible.open) {
        collapsibleHeader.click();
      }

      // Focus the collapsibleHeader item for screen readers
      setTimeout(() => {
        collapsibleHeader.blur();
        collapsibleHeader.focus();
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

    this.collapsible.parentNode.insertBefore(thankYouMessage, this.collapsible.nextSibling);

    this.collapsible.remove();
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
  }
}
