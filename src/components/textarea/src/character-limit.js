import domready from 'js/domready';
import { trackEvent } from 'js/analytics';

const inputClassLimitExceeded = 'input--limit-reached';
const remainingClassLimitExceeded = 'input__limit--reached';
const classLimitedInput = 'js-charlimit-input';
const attrCharLimitRef = 'data-char-limit-ref';

function updateAvailableChars(element, remainingCharElement) {
  /**
   * data-maxlength is used to store the originclassCharactersRemainingal value of maxlength
   * before we mess with it when newlines are added to the input
   */
  const limit = element.getAttribute('data-maxlength');
  let maxLength = limit - countNewlines(element.value);
  element.setAttribute('maxlength', maxLength);
  let count = maxLength - element.value.length;

  /**
   * If the user pastes something in the count could be
   * negative (because we're double counting newlines), so...
   */
  if (count < 0) {
    element.value = element.value.slice(0, maxLength);
    count = 0;
  }

  if (remainingCharElement) {
    remainingCharElement.innerText = remainingCharElement
      .getAttribute(count === 1 ? 'data-charcount-singular' : 'data-charcount-plural')
      .replace('{x}', count);

    highlightWhenLimitReached(remainingCharElement, remainingClassLimitExceeded, count);
    highlightWhenLimitReached(element, inputClassLimitExceeded, count);

    if (count < 1) {
      trackEvent('send', {
        hitType: 'event',
        eventCategory: 'Error',
        eventAction: 'Textarea limit reached',
        eventLabel: `Limit of ${limit} reached/exceeded`
      });
    }
  }
}

export default function initialise() {
  const limitedInputs = Array.from(document.querySelectorAll(`.${classLimitedInput}`));

  limitedInputs.forEach(input => {
    const charLimitEl = document.querySelector(`#${input.getAttribute(attrCharLimitRef)}`);
    input.setAttribute('data-maxlength', input.getAttribute('maxlength'));
    updateAvailableChars(input, charLimitEl);
    input.addEventListener('input', () => updateAvailableChars(input, charLimitEl));
  });
};

const highlightWhenLimitReached = (element, cssClass, count) => {
  element.classList[count < 1 ? 'add' : 'remove'](cssClass);
};

const countNewlines = (aString) => {
  return (aString.match(/\n/g) || []).length;
};

domready(initialise);
