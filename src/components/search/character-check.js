const inputClassLimitReached = 'input--limit-reached';
const remainingClassLimitReached = 'input__limit--reached';
const attrCharCheckRef = 'data-char-check-ref';
const attrCharCheckVal = 'data-char-check-num';
const attrCharCheckMin = 'data-char-check-min-only';

export default class CharCheck {
  constructor(context) {
    this.context = context;
    this.input = this.context.querySelector('input');
    this.button = this.context.querySelector('button');
    this.checkElement = document.getElementById(this.input.getAttribute(attrCharCheckRef));
    this.checkVal = this.input.getAttribute(attrCharCheckVal);
    this.checkMinOnly = this.input.getAttribute(attrCharCheckMin);

    this.singularMessage = this.checkElement.getAttribute('data-charcount-singular');
    this.pluralMessage = this.checkElement.getAttribute('data-charcount-plural');
    this.charLimitSingularMessage = this.checkElement.getAttribute('data-charcount-limit-singular');
    this.charLimitPluralMessage = this.checkElement.getAttribute('data-charcount-limit-plural');

    this.updateCheckReadout(null, true);
    this.setButtonState(this.checkVal);
    this.input.addEventListener('input', this.updateCheckReadout.bind(this));
  }

  updateCheckReadout(event, firstRun) {
    const value = this.input.value;
    const remaining = this.checkVal - value.length;
    // Prevent aria live announcement when component initialises
    if (!firstRun && event.inputType) {
      this.checkElement.setAttribute('aria-live', 'polite');
    } else {
      this.checkElement.removeAttribute('aria-live');
    }

    this.checkRemaining(remaining);
    this.setCheckClass(remaining, this.input, inputClassLimitReached);
    this.setCheckClass(remaining, this.checkElement, remainingClassLimitReached);
  }

  checkRemaining(remaining) {
    let message;
    if (remaining === 1) {
      message = this.singularMessage;
    } else if (remaining > 1) {
      message = this.pluralMessage;
    } else if (remaining === -1 && !this.checkMinOnly) {
      message = this.charLimitSingularMessage;
      remaining = Math.abs(remaining);
    } else if (remaining < -1 && !this.checkMinOnly) {
      message = this.charLimitPluralMessage;
      remaining = Math.abs(remaining);
    }
    this.setShowMessage(remaining);
    this.setButtonState(remaining);
    this.checkElement.innerText = message.replace('{x}', remaining);
  }

  setButtonState(remaining) {
    this.button.classList[remaining === 0 || (remaining < 0 && this.checkMinOnly) ? 'remove' : 'add']('btn--disabled');
    this.button.disabled = remaining === 0 || (remaining < 0 && this.checkMinOnly) ? null : 'true';
  }

  setShowMessage(remaining) {
    this.checkElement.classList[(remaining < this.checkVal && remaining > 0) || (remaining < 0 && !this.checkMinOnly) ? 'remove' : 'add'](
      'u-d-no',
    );
  }

  setCheckClass(remaining, element, setClass) {
    element.classList[remaining < 0 ? 'add' : 'remove'](setClass);
  }
}
