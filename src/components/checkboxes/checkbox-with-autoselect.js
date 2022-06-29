export default class CheckboxWithAutoSelect {
  constructor(context, button, insideReveal) {
    this.context = context;
    this.button = button;
    this.checkboxes = [...this.context.querySelectorAll('input')];
    this.insideReveal = insideReveal;
    // Event listeners
    this.button.addEventListener('click', this.handleButtonEvent.bind(this));
    this.checkboxes.forEach(checkbox => checkbox.addEventListener('change', this.handleCheckboxEvent.bind(this)));
    if (this.insideReveal) {
      this.insideReveal.addEventListener('change', this.handleCheckboxEvent.bind(this));
    }

    // Status
    this.numberOfCheckboxes = this.checkboxes.length;
    this.allChecked = false;

    // Text replacement
    this.buttonText = this.button.querySelector('.ons-js-button-text');
    this.selectAllText = this.button.getAttribute('data-select-all');
    this.unselectAllText = this.button.getAttribute('data-unselect-all');
  }

  handleButtonEvent(event) {
    event.preventDefault();
    this.checkboxes.forEach(checkbox => {
      checkbox.checked = this.allChecked === false ? true : false;
    });
    this.buttonText.innerHTML = this.allChecked === false ? this.unselectAllText : this.selectAllText;
    this.allChecked = this.allChecked === false ? true : false;
  }

  handleCheckboxEvent() {
    const totalChecked = this.checkboxes.filter(checkbox => checkbox.checked).length;
    this.buttonText.innerHTML = totalChecked === this.numberOfCheckboxes ? this.unselectAllText : this.selectAllText;
    this.allChecked = totalChecked === this.numberOfCheckboxes ? true : false;
  }
}
