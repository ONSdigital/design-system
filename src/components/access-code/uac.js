export default class UAC {
  constructor(context) {
    this.input = context;
    const groupSize = parseInt(context.getAttribute('data-group-size'), 10);
    this.groupingRegex = new RegExp(`.{1,${groupSize}}`, 'g');

    this.bindEventListeners();
  }

  bindEventListeners() {
    this.input.addEventListener('input', this.handleInput.bind(this));
  }

  handleInput() {
    const cursorPosition = this.input.selectionStart;
    const shouldRepositionCursor = cursorPosition !== this.input.value.length;

    this.input.value = (this.input.value.replace(/\s/g, '').match(this.groupingRegex) || []).join(' ');

    if (shouldRepositionCursor) {
      this.input.setSelectionRange(cursorPosition, cursorPosition);
    }
  }
}
