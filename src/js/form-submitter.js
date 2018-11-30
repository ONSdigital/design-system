export const classForm = '.js-form-submitter';
export const classSubmissionConfirm = '.js-form-confirmation';
export const classMessage = '.js-form-message';
export const classSubmit = '.js-form-submit';
export const classHidden = 'u-hidden';

export default class FormSubmitter {
  constructor(form, confirm) {
    // This module relies on browsers having implemented
    // the FormData Interface
    // (https://developer.mozilla.org/en-US/docs/Web/API/FormData)
    // < IE10 don't have it so they get the No-JS fallback
    if (window.FormData) {
      this.form = form;
      this.registerForm(this.form);
      this.confirm = confirm;
    }
  }

  registerForm(element) {
    if (element) {
      const elSubmit = element.querySelector(classSubmit);
      this.registerSubmit(elSubmit);
    }
  }

  registerSubmit(element) {
    element.addEventListener('click', e => {
      e.preventDefault();
      this.sendForm(element);
      this.hide(this.confirm.nextElementSibling);
      this.show(this.confirm);
    });
  }

  sendForm(element) {
    const endpoint = element.dataset.endpoint;
    const form = this.form;
    const formData = new FormData(form);
    formData.append('redirect', 'false');
    fetch(endpoint, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    // NB: clearing textarea like this does not update remaining chars
    this.form.querySelector(classMessage).value = '';
  }

  hide(element) {
    element.classList.add(classHidden);
  }

  show(element) {
    element.classList.remove(classHidden);
  }
}
