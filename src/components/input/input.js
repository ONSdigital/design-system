export default class Abbr {
  constructor(context) {
    this.abbr = context;
    this.bindEventListeners();
  }

  bindEventListeners() {
    this.abbr.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    this.abbr.parentNode.querySelector('.ons-input').focus();
  }
}
