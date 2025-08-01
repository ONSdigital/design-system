import abortableFetch from '../../js/abortable-fetch';
import { sanitiseAutosuggestText } from './autosuggest.helpers';
import runFuse from './fuse-config';
import DOMPurify from 'dompurify';

export const baseClass = 'ons-js-autosuggest';

export const classAutosuggestOption = 'ons-autosuggest__option';
export const classAutosuggestOptionFocused = `${classAutosuggestOption}--focused`;
export const classAutosuggestOptionNoResults = `${classAutosuggestOption}--no-results`;
export const classAutosuggestOptionMoreResults = `${classAutosuggestOption}--more-results ons-u-fs-s`;
export const classAutosuggestHasResults = 'ons-autosuggest--has-results';
export const classAutosuggestResultsTitle = 'ons-autosuggest__results-title';

export default class AutosuggestUI {
    constructor({
        context,
        autosuggestData,
        sanitisedQueryReplaceChars,
        sanitisedQuerySplitNumsChars,
        minChars,
        resultLimit,
        suggestOnBoot,
        onSelect,
        onUnsetResult,
        suggestionFunction,
        handleUpdate,
        ariaYouHaveSelected,
        ariaMinChars,
        ariaOneResult,
        ariaNResults,
        ariaLimitedResults,
        ariaGroupedResults,
        moreResults,
        resultsTitle,
        noResults,
        tooManyResults,
        errorAPI,
        errorAPILinkText,
        typeMore,
        customResultsThreshold,
    }) {
        // DOM Elements
        this.context = context;
        this.input = context.querySelector(`.${baseClass}-input`);
        this.resultsContainer = context.querySelector(`.${baseClass}-results`);
        this.listbox = this.resultsContainer.querySelector(`.${baseClass}-listbox`);
        this.resultsTitleContainer = this.resultsContainer.querySelector(`.ons-autosuggest__results-title`);
        this.instructions = context.querySelector(`.${baseClass}-instructions`);
        this.ariaStatus = context.querySelector(`.${baseClass}-aria-status`);
        this.form = context.closest('form');
        this.label = document.querySelector('.ons-label');

        // Settings
        this.autosuggestData = autosuggestData || context.getAttribute('data-autosuggest-data');
        this.ariaYouHaveSelected = ariaYouHaveSelected || context.getAttribute('data-aria-you-have-selected');
        this.minChars = minChars || context.getAttribute('data-min-chars') || 3;
        this.ariaMinChars = ariaMinChars || context.getAttribute('data-aria-min-chars');
        this.ariaOneResult = ariaOneResult || context.getAttribute('data-aria-one-result');
        this.ariaNResults = ariaNResults || context.getAttribute('data-aria-n-results');
        this.ariaLimitedResults = ariaLimitedResults || context.getAttribute('data-aria-limited-results');
        this.ariaGroupedResults = ariaGroupedResults || context.getAttribute('data-aria-grouped-results');
        this.moreResults = moreResults || context.getAttribute('data-more-results');
        this.resultsTitle = resultsTitle || context.getAttribute('data-results-title');
        this.noResults = noResults || context.getAttribute('data-no-results');
        this.tooManyResults = tooManyResults || context.getAttribute('data-too-many-results');
        this.errorAPI = errorAPI || context.getAttribute('data-error-api');
        this.errorAPILinkText = errorAPILinkText || context.getAttribute('data-error-api-link-text');
        this.typeMore = typeMore || context.getAttribute('data-type-more');
        this.customResultsThreshold = customResultsThreshold || context.getAttribute('data-result-threshold');
        this.language = context.getAttribute('data-lang');
        this.allowMultiple = context.getAttribute('data-allow-multiple') || false;
        this.listboxId = this.listbox.getAttribute('id');
        this.resultLimit = resultLimit || 10;
        this.suggestOnBoot = suggestOnBoot;

        // Callbacks
        this.onSelect = onSelect;
        this.onUnsetResult = onUnsetResult;
        this.handleUpdate = handleUpdate;

        if (suggestionFunction) {
            this.fetchSuggestions = suggestionFunction;
        } else {
            this.fetchData();
        }

        // State
        this.ctrlKey = false;
        this.deleting = false;
        this.query = '';
        this.sanitisedQuery = '';
        this.previousQuery = '';
        this.results = [];
        this.resultOptions = [];
        this.allSelections = [];
        this.data = [];
        this.foundResults = 0;
        this.numberOfResults = 0;
        this.highlightedResultIndex = 0;
        this.settingResult = false;
        this.resultSelected = false;
        this.blurring = false;
        this.blurTimeout = null;
        this.sanitisedQueryReplaceChars = sanitisedQueryReplaceChars || [];
        this.sanitisedQuerySplitNumsChars = sanitisedQuerySplitNumsChars || false;

        this.initialiseUI();
    }

    get lang() {
        return !this.language ? document.documentElement.getAttribute('lang').toLowerCase() : this.language.toLowerCase();
    }

    initialiseUI() {
        this.input.setAttribute('aria-autocomplete', 'list');
        this.input.setAttribute('aria-controls', this.listbox.getAttribute('id'));
        this.input.setAttribute('aria-describedby', this.instructions.getAttribute('id'));
        this.input.setAttribute('aria-haspopup', true);
        this.input.setAttribute('aria-owns', this.listbox.getAttribute('id'));
        this.input.setAttribute('aria-expanded', false);
        this.input.setAttribute('autocomplete', this.input.getAttribute('autocomplete') || 'off');
        this.input.setAttribute('role', 'combobox');

        this.context.classList.add('ons-autosuggest--initialised');

        this.bindEventListeners();
    }

    async fetchData() {
        this.fetch = abortableFetch(this.autosuggestData);
        const response = await this.fetch.send();
        this.data = await response.json();
        this.responseStatus = response.status;
    }

    bindEventListeners() {
        this.input.addEventListener('keydown', this.handleKeydown.bind(this));
        this.input.addEventListener('keyup', this.handleKeyup.bind(this));
        this.input.addEventListener('input', this.handleChange.bind(this));
        this.input.addEventListener('focus', this.handleFocus.bind(this));
        this.input.addEventListener('blur', this.handleBlur.bind(this));

        this.listbox.addEventListener('mouseover', this.handleMouseover.bind(this));
        this.listbox.addEventListener('mouseout', this.handleMouseout.bind(this));
    }

    handleKeydown(event) {
        this.ctrlKey = (event.ctrlKey || event.metaKey) && event.key !== 'v';

        switch (event.keyCode) {
            case 38: {
                event.preventDefault();
                this.navigateResults(-1);
                break;
            }
            case 40: {
                event.preventDefault();
                this.navigateResults(1);
                break;
            }
            case 13: {
                if (this.highlightedResultIndex !== null) {
                    event.preventDefault();
                }
                break;
            }
        }
    }

    handleKeyup(event) {
        switch (event.keyCode) {
            case 40:
            case 38: {
                event.preventDefault();
                break;
            }
            case 13: {
                if (this.highlightedResultIndex !== null) {
                    this.selectResult();
                }
                break;
            }
        }

        this.ctrlKey = false;
    }

    handleChange(groupResults = false) {
        if ((!this.blurring && this.input.value.trim()) || groupResults === true) {
            this.settingResult = false;
            if (groupResults === true) {
                this.getSuggestions(false, groupResults);
            } else {
                this.getSuggestions();
            }
        } else {
            this.abortFetch();
            this.clearListbox();
        }
    }

    handleFocus() {
        if (this.allowMultiple === 'true' && this.allSelections.length && this.input.value.slice(-1) !== ' ' && this.input.value !== '') {
            this.input.value = `${this.input.value}, `;
        }
    }

    handleBlur() {
        clearTimeout(this.blurTimeout);
        this.blurring = true;

        this.blurTimeout = setTimeout(() => {
            this.blurring = false;
            if (!this.settingResult) {
                this.clearListbox();
            }
        }, 300);

        if (this.allowMultiple === 'true' && this.input.value.slice(-2) === ', ') {
            this.input.value = this.input.value.slice(0, -2);
        }
    }

    checkCharCount() {
        if (this.input.value.length > 1 && this.input.value.length < this.minChars) {
            this.inputTimeout = setTimeout(() => {
                this.handleNoResults(false);
            }, 2000);
        } else {
            clearTimeout(this.inputTimeout);
        }
    }

    handleMouseover() {
        const focusedItem = this.resultOptions[this.highlightedResultIndex];

        if (focusedItem) {
            focusedItem.classList.remove(classAutosuggestOptionFocused);
        }
    }

    handleMouseout() {
        const focusedItem = this.resultOptions[this.highlightedResultIndex];

        if (focusedItem) {
            focusedItem.classList.add(classAutosuggestOptionFocused);
        }
    }

    navigateResults(direction) {
        let index = 0;
        if (this.highlightedResultIndex !== null) {
            index = this.highlightedResultIndex + direction;
        }

        if (index < this.numberOfResults) {
            if (index < 0) {
                index = null;
            }

            this.setHighlightedResult(index);
        }
    }

    getSuggestions(force, groupResults) {
        if (!this.settingResult) {
            if (this.allowMultiple === 'true' && this.allSelections.length) {
                const newQuery = this.input.value.split(', ').find((item) => !this.allSelections.includes(item));
                this.query = newQuery ? newQuery : this.input.value;
            } else {
                this.query = this.input.value;
            }

            const sanitisedQuery = sanitiseAutosuggestText(this.query, this.sanitisedQueryReplaceChars, this.sanitisedQuerySplitNumsChars);

            if (sanitisedQuery !== this.sanitisedQuery || (force && !this.resultSelected)) {
                this.sanitisedQuery = sanitisedQuery;
                this.unsetResults();
                this.checkCharCount();
                if (this.sanitisedQuery.length >= this.minChars) {
                    this.fetchSuggestions(this.sanitisedQuery, this.data, groupResults)
                        .then(this.handleResults.bind(this))
                        .catch((error) => {
                            if (error.name !== 'AbortError') {
                                console.log('error:', error);
                                this.handleNoResults(500);
                            }
                        });
                } else {
                    this.clearListbox();
                }
            }
        }
    }

    async fetchSuggestions(sanitisedQuery, data) {
        this.abortFetch();

        const threshold =
            this.customResultsThreshold != null && this.customResultsThreshold >= 0 && this.customResultsThreshold <= 1
                ? this.customResultsThreshold
                : 0.2;

        let distance;
        if (threshold >= 0.6) {
            distance = 500;
        } else if (threshold >= 0.4) {
            distance = 300;
        } else {
            distance = 100;
        }

        const results = await runFuse(sanitisedQuery, data, this.lang, threshold, distance);

        results.forEach((result) => {
            const resultItem = result.item ?? result;

            result.sanitisedText = sanitiseAutosuggestText(
                resultItem[this.lang] ?? resultItem['formattedAddress'],
                this.sanitisedQueryReplaceChars,
            );
        });
        return {
            status: this.responseStatus,
            results,
            totalResults: results.length,
        };
    }

    abortFetch() {
        if (this.fetch && this.fetch.status !== 'DONE') {
            this.fetch.abort();
        }
    }

    unsetResults() {
        this.results = [];
        this.resultOptions = [];
        this.resultSelected = false;

        if (this.onUnsetResult) {
            this.onUnsetResult();
        }
    }

    clearListbox(preventAriaStatusUpdate) {
        this.listbox.innerHTML = '';
        this.context.classList.remove(classAutosuggestHasResults);
        this.input.removeAttribute('aria-activedescendant');
        this.input.setAttribute('aria-expanded', false);

        if (!preventAriaStatusUpdate) {
            this.setAriaStatus();
        }
    }

    handleResults(result) {
        this.resultLimit = result.limit ? result.limit : this.resultLimit;
        this.foundResults = result.totalResults;
        if (this.foundResults > this.resultLimit) {
            result.results = result.results.slice(0, this.resultLimit);
        }

        this.results = result.results;
        this.numberOfResults = this.results ? Math.max(this.results.length, 0) : 0;
        this.setAriaStatus();
        if (!this.deleting || (this.numberOfResults && this.deleting)) {
            this.listbox.innerHTML = '';
            if (this.results) {
                this.resultOptions = this.results.map((result, index) => {
                    const resultItem = result.item ?? result;

                    let innerHTML = this.emboldenMatch(resultItem[this.lang] ?? resultItem['formattedAddress'], this.query);

                    const listElement = document.createElement('li');
                    listElement.className = classAutosuggestOption;
                    listElement.setAttribute('id', `${this.listboxId}__option--${index}`);
                    listElement.setAttribute('role', 'option');
                    if (resultItem.category) {
                        innerHTML =
                            innerHTML +
                            `<span class="ons-autosuggest__category ons-u-lighter ons-u-fs-s ons-u-db">${resultItem.category}</span>`;
                    }
                    listElement.innerHTML = innerHTML;
                    listElement.addEventListener('click', () => {
                        this.selectResult(index);
                    });

                    this.listbox.appendChild(listElement);

                    this.context.querySelector(`.${classAutosuggestResultsTitle}`).classList.remove('ons-u-d-no');

                    return listElement;
                });
            }

            if (this.numberOfResults < this.foundResults) {
                const listElement = document.createElement('li');
                listElement.className = `${classAutosuggestOption} ${classAutosuggestOptionMoreResults}`;
                listElement.setAttribute('aria-hidden', 'true');
                listElement.innerHTML = DOMPurify.sanitize(this.moreResults);
                this.listbox.appendChild(listElement);
            }

            if (this.resultLimit === 100 && this.foundResults > this.resultLimit) {
                let message = this.tooManyResults.replace('{n}', this.foundResults);
                this.resultsContainer.insertBefore(this.createWarningElement(message), this.resultsContainer.firstChild);
                this.ariaStatus.setAttribute('aria-hidden', 'true');
                this.listbox.remove();
                this.resultsTitleContainer.remove();
            }

            this.setHighlightedResult(null);

            this.input.setAttribute('aria-expanded', !!this.numberOfResults);

            if (!!this.numberOfResults && this.sanitisedQuery.length >= this.minChars) {
                this.context.classList.add(classAutosuggestHasResults);
            } else {
                this.context.classList.remove(classAutosuggestHasResults);
                this.clearListbox();
            }
        }

        if (this.numberOfResults === 0 && this.noResults) {
            this.handleNoResults(result.status);
        }
    }

    handleNoResults(status) {
        let message;
        this.context.classList.add(classAutosuggestHasResults);
        this.context.querySelector(`.${classAutosuggestResultsTitle}`).classList.add('ons-u-d-no');
        this.input.setAttribute('aria-expanded', true);

        if (status === 400 || status === false) {
            message = this.typeMore;
            this.setAriaStatus(message);
            this.listbox.innerHTML = DOMPurify.sanitize(
                `<li class="${classAutosuggestOption} ${classAutosuggestOptionNoResults}">${message}</li>`,
            );
        } else if (status > 400 || status === '') {
            const sanitizedHref = DOMPurify.sanitize(window.location.href);
            message = this.errorAPI + (this.errorAPILinkText ? ' <a href="' + sanitizedHref + '">' + this.errorAPILinkText + '</a>.' : '');
            let ariaMessage = this.errorAPI + (this.errorAPILinkText ? ' ' + this.errorAPILinkText : '');

            this.input.setAttribute('disabled', true);
            this.input.value = '';
            this.label.classList.add('ons-u-lighter');

            this.resultsContainer.insertBefore(this.createWarningElement(message), this.resultsContainer.firstChild);
            this.ariaStatus.setAttribute('aria-hidden', 'true');
            this.setAriaStatus(ariaMessage);
            this.listbox.remove();
            this.resultsTitleContainer.remove();
        } else {
            message = this.noResults;
            this.listbox.innerHTML = DOMPurify.sanitize(
                `<li class="${classAutosuggestOption} ${classAutosuggestOptionNoResults}">${message}</li>`,
            );
        }
    }

    setHighlightedResult(index) {
        this.highlightedResultIndex = index;

        if (this.highlightedResultIndex === null) {
            this.input.removeAttribute('aria-activedescendant');
        } else if (this.numberOfResults) {
            this.resultOptions.forEach((option, optionIndex) => {
                if (optionIndex === index) {
                    option.classList.add(classAutosuggestOptionFocused);
                    option.setAttribute('aria-selected', true);
                    this.input.setAttribute('aria-activedescendant', option.getAttribute('id'));
                    const groupedResult = option.querySelector('.ons-autosuggest__group');
                    const optionText = option.innerHTML.replace('<strong>', '').replace('</strong>', '');
                    if (groupedResult) {
                        let groupedAriaMsg = this.ariaGroupedResults.replace('{n}', groupedResult.innerHTML);
                        groupedAriaMsg = groupedAriaMsg.replace('{x}', optionText);
                        this.setAriaStatus(groupedAriaMsg);
                    } else {
                        this.setAriaStatus(optionText);
                    }
                } else {
                    option.classList.remove(classAutosuggestOptionFocused);
                    option.removeAttribute('aria-selected');
                }
            });
        }
    }

    setAriaStatus(content) {
        if (!content) {
            const queryTooShort = this.sanitisedQuery.length < this.minChars;
            const noResults = this.numberOfResults === 0;
            if (queryTooShort) {
                content = this.ariaMinChars;
            } else if (noResults) {
                content = `${this.noResults}: "${this.query}"`;
            } else if (this.numberOfResults === 1) {
                content = this.ariaOneResult;
            } else {
                content = this.ariaNResults.replace('{n}', this.numberOfResults);

                if (this.resultLimit && this.foundResults > this.resultLimit) {
                    content += ` ${this.ariaLimitedResults}`;
                }
            }
        }
        this.ariaStatus.innerHTML = DOMPurify.sanitize(content);
    }

    selectResult(index) {
        if (this.results.length) {
            this.settingResult = true;
            const result = this.results[index || this.highlightedResultIndex || 0];
            const resultItem = result.item ?? result;
            const resultValue = resultItem[this.lang] ?? resultItem['formattedAddress'];

            this.resultSelected = true;

            if (this.allowMultiple === 'true') {
                let value = this.storeExistingSelections(resultValue);
                result.displayText = value;
            } else if (resultItem.url) {
                result.displayText = resultValue;
                window.location = resultItem.url;
            } else {
                result.displayText = resultValue;
            }
            this.onSelect(result).then(() => (this.settingResult = false));

            const ariaMessage = `${this.ariaYouHaveSelected}: ${result.displayText}.`;

            this.clearListbox();
            this.setAriaStatus(ariaMessage);
        }
    }

    createWarningElement(content) {
        const warningContainer = document.createElement('div');
        const warningElement = document.createElement('div');
        const warningSpanElement = document.createElement('span');
        const warningBodyElement = document.createElement('div');

        warningContainer.id = this.listbox.getAttribute('id');
        warningContainer.className = 'ons-autosuggest__warning';
        warningElement.className = 'ons-panel ons-panel--warn ons-autosuggest__panel';

        warningSpanElement.className = 'ons-panel__icon';
        warningSpanElement.setAttribute('aria-hidden', 'true');
        warningSpanElement.innerHTML = '!';

        warningBodyElement.className = 'ons-panel__body';
        warningBodyElement.innerHTML = DOMPurify.sanitize(content);

        warningElement.appendChild(warningSpanElement);
        warningElement.appendChild(warningBodyElement);
        warningContainer.appendChild(warningElement);

        return warningContainer;
    }

    storeExistingSelections(value) {
        this.currentSelections = this.input.value.split(', ').filter((items) => this.allSelections.includes(items));
        this.allSelections = [];
        if (this.currentSelections.length) {
            this.allSelections = this.currentSelections;
        }
        this.allSelections.push(value);

        this.allSelections = this.allSelections.filter(function (value, index, array) {
            return array.indexOf(value) == index;
        });

        return this.allSelections.join(', ');
    }

    emboldenMatch(string, query) {
        let reg = new RegExp(this.escapeRegExp(query).split(' ').join('[\\s,]*'), 'gi');

        return string.replace(reg, '<strong>$&</strong>');
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}
