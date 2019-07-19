import TypeaheadUI from './typeahead.ui';

export default class Typeahead {
  constructor(context) {
    this.context = context;
    this.lang = document.documentElement.getAttribute('lang').toLowerCase();

    this.typeahead = new TypeaheadUI({
      context,
      lang: this.lang,
      onSelect: this.onSelect.bind(this),
      onUnsetResult: this.onUnsetResult.bind(this),
      onError: this.onError.bind(this),
    });
  }

  onSelect(result) {
    return new Promise(resolve => {
      this.typeahead.input.value = result[this.lang];
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
