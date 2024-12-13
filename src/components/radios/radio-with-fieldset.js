export default class RadioWithFieldset {
    constructor(context) {
        this.context = context;
        this.outerInputs = [
            ...context.closest('.ons-radios__items').querySelectorAll('input:not(.ons-js-other-fieldset-radio input):not(.ons-js-other)'),
        ];
        this.parentInput = this.context.querySelector('.ons-js-other');
        this.childInputs = [...this.context.querySelectorAll('.ons-js-other-fieldset-radio input')];
        this.shouldSelectAllChildren = this.context.querySelector('.ons-js-select-all-children') !== null;

        this.outerInputs.forEach((radio) => radio.addEventListener('change', this.uncheckAllChildInputs.bind(this)));
        this.childInputs.forEach((radio) => radio.addEventListener('change', this.checkParentRadioInput.bind(this)));
        this.parentInput.addEventListener('change', this.handleParentInputChange.bind(this));
    }

    uncheckAllChildInputs() {
        this.childInputs.forEach((input) => {
            input.checked = false;
        });
    }

    checkParentRadioInput() {
        this.parentInput.checked = true;
    }

    handleParentInputChange() {
        if (this.shouldSelectAllChildren) {
            this.childInputs.forEach((input) => {
                input.checked = true;
            });
        }
    }
}
