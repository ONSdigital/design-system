const inputClassLimitReached = 'ons-input--limit-reached';
const remainingClassLimitReached = 'ons-input__limit--reached';
const attrCharCheckRef = 'data-char-check-ref';
const attrCharCheckCountdown = 'data-char-check-countdown';
const attrCharCheckVal = 'data-char-check-num';

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
        this.checkElement = document.getElementById(this.input.getAttribute(attrCharCheckRef));
        this.checkVal = this.input.getAttribute(attrCharCheckVal);
        this.countdown = this.input.getAttribute(attrCharCheckCountdown) || false;
        this.singularMessage = this.checkElement.getAttribute('data-charcount-singular') || null;
        this.pluralMessage = this.checkElement.getAttribute('data-charcount-plural') || null;
        this.charLimitSingularMessage = this.checkElement.getAttribute('data-charcount-limit-singular') || null;
        this.charLimitPluralMessage = this.checkElement.getAttribute('data-charcount-limit-plural') || null;

        this.updateCheckReadout(this.input);

        if (this.button) {
            this.setButtonState(this.checkVal);
        }

        this.input.addEventListener('input', this.updateCheckReadout.bind(this));
    }

    updateCheckReadout(event, firstRun) {
        const value = this.input.value;
        const remaining = this.checkVal - this.getCharLength(value);

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

    getCharLength(text) {
        // line breaks count as two characters as forms convert to \n\r when submitted
        const lineBreaks = (text.match(/\n/g) || []).length;
        return text.length + lineBreaks;
    }
}
