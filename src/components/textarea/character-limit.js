import domready from 'js/domready';
import { trackEvent } from 'js/analytics';

const inputClassLimitReached = 'input--limit-reached';
const remainingClassLimitReached = 'input__limit--reached';
const classLimitedInput = 'js-charlimit-input';
const attrCharLimitRef = 'data-char-limit-ref';

class CharLimit {
  constructor(input) {
    this.input = input;
    this.maxLength = input.maxLength;
    this.limitElement = document.getElementById(input.getAttribute(attrCharLimitRef));
    this.singularMessage = this.limitElement.getAttribute('data-charcount-singular');
    this.pluralMessage = this.limitElement.getAttribute('data-charcount-plural');

    this.updateLimitReadout({ firstRun: true });
    this.limitElement.classList.remove('u-d-no');

    input.addEventListener('input', this.updateLimitReadout.bind(this));
  }

  updateLimitReadout({ firstRun }) {
    const value = this.input.value;
    const remaining = this.maxLength - value.length;
    const message = remaining === 1 ? this.singularMessage : this.pluralMessage;
    this.limitElement.innerText = message.replace('{x}', remaining);

    // Prevent aria live announcement when component initialises
    if (!firstRun) {
      this.limitElement.setAttribute('aria-live', 'polite');
    }

    this.setLimitClass(remaining, this.input, inputClassLimitReached);
    this.setLimitClass(remaining, this.limitElement, remainingClassLimitReached);

    this.track(remaining);
  }

  setLimitClass(remaining, element, limitClass) {
    element.classList[remaining > 0 ? 'remove' : 'add'](limitClass);
  }

  track(remaining) {
    if (remaining < 1) {
      trackEvent('send', {
        hitType: 'event',
        eventCategory: 'Error',
        eventAction: 'Textarea limit reached',
        eventLabel: `Limit of ${this.maxLength} reached/exceeded`
      });
    }
  }
}

export default function initialise() {
  const limitedInputs = Array.from(document.querySelectorAll(`.${classLimitedInput}`));

  limitedInputs.forEach(input => new CharLimit(input));
}

domready(initialise);
