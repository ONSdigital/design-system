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
    if (this.formEl && this.formEl.length && !this.patternLibForm) {
      this.formEl.submit();
    }
    this.button.classList.add('is-loading');
    this.button.setAttribute('disabled', true);
  }

  timerButton(event) {
    if (this.formEl && this.formEl.length && !this.patternLibForm) {
      this.formEl.submit();
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
