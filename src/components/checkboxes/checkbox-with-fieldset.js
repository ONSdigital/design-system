export default class CheckboxWithFieldset {
    constructor(context) {
        this.context = context;
        this.checkbox = context.querySelector('.ons-js-checkbox');
        this.childInputs = [...this.context.querySelectorAll('input')];
        this.selectAllChildrenInput = this.context.querySelector('.ons-js-select-all-children');

        if (this.selectAllChildrenInput) {
            this.selectAllChildrenInput.addEventListener('change', this.checkChildInputsOnSelect.bind(this));
        } else {
            this.checkbox.addEventListener('change', this.uncheckChildInputsOnDeselect.bind(this));
        }
    }

    checkChildInputsOnSelect() {
        this.childInputs.forEach((input) => {
            input.checked = this.selectAllChildrenInput.checked === true ? true : false;
        });
    }

    uncheckChildInputsOnDeselect() {
        if (this.checkbox.checked === false) {
            this.childInputs.forEach((input) => {
                input.checked = false;
            });
        }
    }
}
