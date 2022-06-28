import AutosuggestUI from './autosuggest.ui';

export default class Autosuggest {
  constructor(context) {
    this.context = context;

    this.autosuggest = new AutosuggestUI({
      context,
      onSelect: this.onSelect.bind(this),
      onUnsetResult: this.onUnsetResult.bind(this),
      onError: this.onError.bind(this),
    });
  }

  get lang() {
    return document.documentElement.getAttribute('lang').toLowerCase();
  }

  async onSelect(result) {
    this.autosuggest.input.value = result.displayText;
  }

  async onUnsetResult() {}

  onError(error) {
    console.error(error);
  }
}
