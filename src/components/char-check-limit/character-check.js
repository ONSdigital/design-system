const inputClassLimitReached = 'ons-input--limit-reached';
const remainingClassLimitReached = 'ons-input__limit--reached';
const attrMessageCheckRef = 'data-message-check-ref';
const attrMessageCheckVal = 'data-message-check-num';
const countType = 'data-count-type';

export default class CharCheck {
    constructor(context) {
        this.tagName = context.tagName;

        // Handle either an input directly or a container with an input inside
        if (this.tagName.toLowerCase() === 'input' || this.tagName.toLowerCase() === 'textarea') {
            this.input = context;
        } else {
            this.input = context.querySelector('input');
        }

        // Find the button: if input is passed directly, look at its parent
        let parent = this.input.parentNode;
        this.button = parent ? parent.querySelector('button') : null;
        this.checkElement = document.getElementById(this.input.getAttribute(attrMessageCheckRef));
        this.checkVal = this.input.getAttribute(attrMessageCheckVal);
        this.singularMessage = this.checkElement.getAttribute('data-message-singular') || null;
        this.pluralMessage = this.checkElement.getAttribute('data-message-plural') || null;
        this.overLimitSingularMessage = this.checkElement.getAttribute('data-message-over-limit-singular') || null;
        this.overLimitPluralMessage = this.checkElement.getAttribute('data-message-over-limit-plural') || null;

        this.updateCheckReadout(this.input);

        if (this.button) {
            this.setButtonState(this.checkVal);
        }

        this.input.addEventListener('input', this.updateCheckReadout.bind(this));
    }

    updateCheckReadout(event, firstRun) {
        const value = this.input.value;
        const currentLength = this.checkElement.getAttribute(countType) == 'char' ? this.getCharLength(value) : this.getWordLength(value);
        const remaining = this.checkVal - currentLength;

        // Prevent aria live announcement when component initialises
        if (!firstRun && event.inputType) {
            this.checkElement.setAttribute('aria-live', [remaining > 0 ? 'polite' : 'assertive']);
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
        } else if (remaining === -1) {
            message = this.overLimitSingularMessage;
        } else if (remaining < -1) {
            message = this.overLimitPluralMessage;
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
            this.checkElement.classList[(remaining < this.checkVal && remaining > 0) || remaining < 0 ? 'remove' : 'add']('ons-u-d-no');
        }
    }

    setCheckClass(remaining, element, setClass) {
        element.classList[remaining < 0 ? 'add' : 'remove'](setClass);
    }

    getCharLength(text) {
        // line breaks count as two characters as forms convert to \n\r when submitted
        const lineBreaks = (text.match(/\n/g) || []).length;
        return text.length + lineBreaks;
    }

    getWordLength(text) {
        return text
            .trim()
            .split(/\s+/) // split by any whitespace
            .map((word) => word.replace(/[.,!?;:]+$/, '')) // remove trailing punctuation
            .filter(Boolean).length;
    }
}
