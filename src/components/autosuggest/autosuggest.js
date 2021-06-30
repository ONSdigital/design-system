import AutosuggestUI from './autosuggest.ui';

export default class Autosuggest {
  constructor(context) {
    this.context = context;
    this.lang = document.documentElement.getAttribute('lang').toLowerCase();

    this.autosuggest = new AutosuggestUI({
      context,
      lang: this.lang,
      onSelect: this.onSelect.bind(this),
      onUnsetResult: this.onUnsetResult.bind(this),
      onError: this.onError.bind(this),
    });
  }

  onSelect(result) {
    return new Promise(resolve => {
      this.autosuggest.input.value = result.displayText;

      resolve();
    });
  }

  onUnsetResult() {
    return new Promise(resolve => {
      resolve();
    });
  }

  onError(error) {
    console.error(error);
  }
}
