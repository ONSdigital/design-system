import AutosuggestUI from './autosuggest.ui';

export default class Autosuggest {
    constructor(context) {
        this.context = context;
        this.language = context.getAttribute('data-lang');

        this.autosuggest = new AutosuggestUI({
            context,
            onSelect: this.onSelect.bind(this),
            onUnsetResult: this.onUnsetResult.bind(this),
            onError: this.onError.bind(this),
        });
    }

    get lang() {
        return !this.language ? document.documentElement.getAttribute('lang').toLowerCase() : this.language.toLowerCase();
    }

    async onSelect(result) {
        this.autosuggest.input.value = result.displayText;
    }

    async onUnsetResult() {}

    onError(error) {
        console.error(error);
    }
}
