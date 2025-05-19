import { trackEvent } from '../../js/analytics';

const inputClassLimitReached = 'ons-input--limit-reached';
const remainingClassLimitReached = 'ons-input__limit--reached';
const attrWordLimitRef = 'data-word-limit-ref';
const maxWordLength = 'data-max-words';

export default class WordLimit {
    constructor(input) {
        this.input = input;
        this.maxWords = input.getAttribute(maxWordLength);
        this.limitElement = document.getElementById(input.getAttribute(attrWordLimitRef));
        this.singularMessage = this.limitElement.getAttribute('data-wordcount-singular');
        this.pluralMessage = this.limitElement.getAttribute('data-wordcount-plural');
        this.limitSingularMessage = this.limitElement.getAttribute('data-wordcount-limit-singular');
        this.limitPluralMessage = this.limitElement.getAttribute('data-wordcount-limit-plural');

        this.updateLimitReadout(null, true);
        this.limitElement.classList.remove('ons-u-d-no');
        input.addEventListener('input', this.updateLimitReadout.bind(this));
    }

    updateLimitReadout(event, firstRun) {
        const wordCount = this.countWords(this.input.value);
        const remaining = this.maxWords - wordCount;

        // Prevent aria live announcement when component initialises
        if (!firstRun && event.inputType) {
            this.limitElement.setAttribute('aria-live', [remaining > 0 ? 'polite' : 'assertive']);
        } else {
            this.limitElement.removeAttribute('aria-live');
        }
        this.limitElement.innerText = this.getMessage(
            remaining,
            this.singularMessage,
            this.pluralMessage,
            this.limitSingularMessage,
            this.limitPluralMessage,
        );

        this.setLimitClass(remaining, this.input, inputClassLimitReached);
        this.setLimitClass(remaining, this.limitElement, remainingClassLimitReached);

        this.track(remaining);
    }

    setLimitClass(remaining, element, limitClass) {
        element.classList.toggle(limitClass, remaining <= 0);
    }

    track(remaining) {
        if (remaining < 1) {
            trackEvent({
                event_type: 'event',
                event_category: 'Error',
                event_action: 'Textarea limit reached',
                event_label: `Limit of ${this.maxLength} reached/exceeded`,
            });
        }
    }

    countWords(text) {
        return text
            .trim()
            .split(/\s+/) // split by any whitespace
            .map((word) => word.replace(/[.,!?;:]+$/, '')) // remove trailing punctuation
            .filter(Boolean).length;
    }

    getMessage(remaining, singularMessage, pluralMessage, limitSingularMessage, limitPluralMessage) {
        let message;

        if (remaining === 1) {
            message = singularMessage;
        } else if (remaining === -1) {
            message = limitSingularMessage;
        } else if (remaining < -1) {
            message = limitPluralMessage;
        } else {
            message = pluralMessage;
        }

        // Use Math.abs to always return a positive number
        return message.replace('{x}', Math.abs(remaining));
    }
}
