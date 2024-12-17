let clearAlertAnnounced;
export default class ClearRadios {
    constructor(inputs, button, otherInputs) {
        this.inputs = inputs;
        this.button = button;
        this.otherInputs = otherInputs;
        this.ariaElement = document.querySelector('.ons-js-clear-radio-alert');
        this.clearAlert = this.ariaElement.getAttribute('data-clear');
        this.clearedAlert = this.ariaElement.getAttribute('data-cleared');
        this.otherFields = [];

        this.inputs.forEach((input) => input.addEventListener('click', this.setClearAttributes.bind(this)));
        this.button.addEventListener('click', this.clearRadios.bind(this));
        this.checkRadios();

        if (this.otherInputs) {
            this.otherInputs.forEach((input) => {
                const parent = input.parentNode;
                const otherField = parent.querySelector('.ons-input');
                otherField.addEventListener('focus', this.setClearAttributes.bind(this));
                this.otherFields.push(otherField);
            });
        }

        clearAlertAnnounced = false;
    }

    checkRadios() {
        this.inputs.forEach((input) => {
            if (input.checked) {
                this.setClearAttributes();
            }
        });
    }

    setClearAttributes() {
        this.button.classList.remove('ons-u-db-no-js_enabled');
        if (clearAlertAnnounced === false) {
            this.ariaElement.innerHTML = this.clearAlert;
            clearAlertAnnounced = true;
        }
    }

    clearRadios(event) {
        event.preventDefault();

        this.inputs.forEach((input) => {
            input.checked = false;
        });

        if (this.otherFields.length) {
            this.otherFields.forEach((field) => {
                field.value = '';
            });
        }

        this.button.classList.add('ons-u-db-no-js_enabled');
        this.ariaElement.innerHTML = this.clearedAlert;
        clearAlertAnnounced = false;
    }
}
