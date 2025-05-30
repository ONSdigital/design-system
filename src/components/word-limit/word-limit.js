const inputClassLimitReached = 'ons-input--limit-reached';
const remainingClassLimitReached = 'ons-input__limit--reached';

const attrWordCheckRef = 'data-word-check-ref';
const attrWordCheckCountdown = 'data-word-check-countdown';
const attrWordCheckVal = 'data-word-check-num';

export default class WordLimit {
    constructor(context) {
        this.tagName = context.tagName;
        console.log(this.tagName);

        // Handle either an input directly or a container with an input inside
        if (this.tagName.toLowerCase() === 'input' || this.tagName.toLowerCase() === 'textarea') {
            this.input = context;
        } else {
            this.input = context.querySelector('input');
        }

        // Find the button: if input is passed directly, look at its parent
        let parent = this.input.parentNode;
        this.button = parent ? parent.querySelector('button') : null;
        this.checkElement = document.getElementById(this.input.getAttribute(attrWordCheckRef));
        console.log(this.checkElement);
        this.checkVal = this.input.getAttribute(attrWordCheckVal);
        this.countdown = this.input.getAttribute(attrWordCheckCountdown) || false;
        this.singularMessage = this.checkElement.getAttribute('data-wordcount-singular') || null;
        this.pluralMessage = this.checkElement.getAttribute('data-wordcount-plural') || null;
        this.charLimitSingularMessage = this.checkElement.getAttribute('data-wordcount-limit-singular') || null;
        this.charLimitPluralMessage = this.checkElement.getAttribute('data-wordcount-limit-plural') || null;

        this.updateCheckReadout(this.input);

        if (this.button) {
            this.setButtonState(this.checkVal);
        }

        this.input.addEventListener('input', this.updateCheckReadout.bind(this));
    }

    updateCheckReadout(event, firstRun) {
        const value = this.input.value;
        const remaining = this.checkVal - this.countWords(value);
        console.log(remaining);

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
        if (this.countdown && remaining === 1) {
            message = this.singularMessage;
        } else if (remaining === -1) {
            message = this.charLimitSingularMessage;
        } else if (remaining < -1) {
            message = this.charLimitPluralMessage;
        } else {
            message = this.pluralMessage;
        }

        this.checkElement.innerText = message.replace('{x}', Math.abs(remaining));

        if (this.button) {
            this.setButtonState(remaining);
        }

        this.setShowMessage(remaining);
    }

    setButtonState(remaining) {
        this.button.classList[remaining === 0 ? 'remove' : 'add']('ons-btn--disabled');
        this.button.disabled = remaining === 0 ? null : 'true';
    }

    setShowMessage(remaining) {
        if (this.tagName.toLowerCase() === 'textarea') {
            // Always display the remaining character message for textarea
            this.checkElement.classList['remove']('ons-u-d-no');
        } else {
            this.checkElement.classList[(remaining < this.checkVal && remaining > 0 && this.countdown) || remaining < 0 ? 'remove' : 'add'](
                'ons-u-d-no',
            );
        }
    }

    setCheckClass(remaining, element, setClass) {
        element.classList[remaining < 0 ? 'add' : 'remove'](setClass);
        this.checkElement.setAttribute('aria-live', [remaining > 0 ? 'polite' : 'assertive']);
    }

    countWords(text) {
        return text
            .trim()
            .split(/\s+/) // split by any whitespace
            .map((word) => word.replace(/[.,!?;:]+$/, '')) // remove trailing punctuation
            .filter(Boolean).length;
    }
}
