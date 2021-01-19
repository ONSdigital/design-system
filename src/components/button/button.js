let i = 0;
export const classPatternLibForm = 'js-patternlib-form';
export default class SubmitButton {
  constructor(button, submitType) {
    this.submitButton = button;
    this.formEl = [...document.getElementsByTagName('form')][0];
    this.patternLibForm = this.formEl.classList.contains(classPatternLibForm) ? true : false;
    this.submitType = submitType;

    if (this.submitType == 'loader') {
      this.submitButton.addEventListener('click', this.loaderButton.bind(this));
    } else if (this.submitType == 'timer') {
      this.submitButton.addEventListener('click', this.timerButton.bind(this));
    }
  }

  loaderButton() {
    this.submitButton.classList.add('is-loading');
    this.submitButton.setAttribute('disabled', true);
    this.submitForm();
  }

  timerButton(event) {
    if (this.submitButton.tagName === 'A') {
      i++;
      if (i > 1) {
        event.preventDefault();
      }
    } else {
      this.submitButton.setAttribute('disabled', true);
    }
    this.submitForm();
    setTimeout(() => {
      this.submitButton.removeAttribute('disabled');
      i = 0;
    }, 1000);
  }

  submitForm() {
    if (this.formEl && this.formEl.length && !this.patternLibForm) {
      this.formEl.submit();
    } else {
      return;
    }
  }
}
