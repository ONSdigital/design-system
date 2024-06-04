export default class AbbrInput {
    constructor(context) {
        this.abbrInput = context;
        this.bindEventListeners();
    }

    bindEventListeners() {
        this.abbrInput.querySelector('.ons-js-input-abbr').addEventListener('click', this.handleClick.bind(this));
    }

    handleClick() {
        this.abbrInput.querySelector('.ons-input').focus();
    }
}
