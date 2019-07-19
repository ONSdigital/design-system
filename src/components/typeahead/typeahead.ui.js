import { sanitiseTypeaheadText } from './typeahead.helpers';
import formBodyFromObject from 'js/utils/formBodyFromObject';
import fetch from 'js/abortable-fetch';

export const baseClass = 'js-typeahead';

const classTypeaheadOption = 'typeahead__option';
const classTypeaheadOptionFocused = `${classTypeaheadOption}--focused`;
const classTypeaheadOptionNoResults = `${classTypeaheadOption}--no-results u-fs-s`;
const classTypeaheadOptionMoreResults = `${classTypeaheadOption}--more-results u-fs-s`;
const classTypeaheadHasResults = 'typeahead--has-results';
const classPanelOff = 'panel--off';

export default class TypeaheadUI {
  constructor({
    context,
    apiUrl,
    sanitisedQueryReplaceChars,
    minChars,
    resultLimit,
    suggestOnBoot,
    onSelect,
    onError,
    onUnsetResult,
    suggestionFunction,
  }) {
    // DOM Elements
    this.context = context;
    this.input = context.querySelector(`.${baseClass}-input`);
    this.resultsContainer = context.querySelector(`.${baseClass}-results`);
    this.listbox = this.resultsContainer.querySelector(`.${baseClass}-listbox`);
    this.instructions = context.querySelector(`.${baseClass}-instructions`);
    this.ariaStatus = context.querySelector(`.${baseClass}-aria-status`);

    // Settings
    this.apiUrl = apiUrl || context.getAttribute('data-api-url');
    this.content = JSON.parse(context.getAttribute('data-content'));
    this.listboxId = this.listbox.getAttribute('id');
    this.minChars = minChars || 2;
    this.resultLimit = resultLimit || null;
    this.suggestOnBoot = suggestOnBoot;

    // Callbacks
    this.onSelect = onSelect;
    this.onUnsetResult = onUnsetResult;
    this.onError = onError;

    if (suggestionFunction) {
      this.fetchSuggestions = suggestionFunction;
    }

    // State
    this.ctrlKey = false;
    this.deleting = false;
    this.query = '';
    this.sanitisedQuery = '';
    this.previousQuery = '';
    this.results = [];
    this.resultOptions = [];
    this.foundResults = 0;
    this.numberOfResults = 0;
    this.highlightedResultIndex = 0;
    this.settingResult = false;
    this.resultSelected = false;
    this.blurring = false;
    this.blurTimeout = null;
    this.sanitisedQueryReplaceChars = sanitisedQueryReplaceChars;
    this.lang = document.documentElement.getAttribute('lang').toLowerCase();

    this.initialise();
  }

  initialise() {
    this.input.setAttribute('aria-autocomplete', 'list');
    this.input.setAttribute('aria-controls', this.listbox.getAttribute('id'));
    this.input.setAttribute('aria-describedby', this.instructions.getAttribute('id'));
    this.input.setAttribute('autocomplete', this.input.getAttribute('data-autocomplete'));
    this.context.classList.add('typeahead--initialised');

    this.bindEventListeners();
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

    switch (event.key) {
      case 'ArrowUp': {
        event.preventDefault();
        this.navigateResults(-1);
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        this.navigateResults(1);
        break;
      }
      case 'Enter': {
        event.preventDefault();
        break;
      }
    }
  }

  handleKeyup(event) {
    switch (event.keyCode) {
      case 'ArrowUp':
      case 'ArrowDown': {
        event.preventDefault();
        break;
      }
      case 'Enter': {
        this.selectResult();
        break;
      }
      case 'ArrowLeft':
      case 'ArrowRight': {
        break;
      }
    }

    this.ctrlKey = false;
  }

  handleChange() {
    if (!this.blurring && this.input.value.trim()) {
      this.getSuggestions();
    } else {
      this.abortFetch();
    }
  }

  handleFocus() {
    clearTimeout(this.blurTimeout);
    this.getSuggestions(true);
  }

  handleBlur() {
    clearTimeout(this.blurTimeout);
    this.blurring = true;

    this.blurTimeout = setTimeout(() => {
      this.blurring = false;
    }, 300);
  }

  handleMouseover() {
    const focusedItem = this.resultOptions[this.highlightedResultIndex];

    if (focusedItem) {
      focusedItem.classList.remove(classTypeaheadOptionFocused);
    }
  }

  handleMouseout() {
    const focusedItem = this.resultOptions[this.highlightedResultIndex];

    if (focusedItem) {
      focusedItem.classList.add(classTypeaheadOptionFocused);
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

  getSuggestions(force) {
    if (this.settingResult) {
      return;
    }

    const query = this.input.value;
    const sanitisedQuery = sanitiseTypeaheadText(query, this.sanitisedQueryReplaceChars);

    if (sanitisedQuery !== this.sanitisedQuery || (force && !this.resultSelected)) {
      this.unsetResults();
      this.setAriaStatus();

      this.query = query;
      this.sanitisedQuery = sanitisedQuery;

      if (this.sanitisedQuery.length >= this.minChars) {
        this.fetchSuggestions(this.sanitisedQuery)
          .then(this.handleResults.bind(this))
          .catch(error => {
            if (error.name !== 'AbortError' && this.onError) {
              this.onError(error);
            }
          });
      } else {
        this.clearListbox();
      }
    }
  }

  fetchSuggestions(sanitisedQuery) {
    return new Promise((resolve, reject) => {
      const query = {
        query: sanitisedQuery,
        lang: this.lang,
      };

      this.abortFetch();

      const body = formBodyFromObject(query);

      this.fetch = fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      })
        .then(async response => {
          const data = await response.json();

          const results = data.results;

          results.forEach(result => {
            result.sanitisedText = sanitiseTypeaheadText(result[this.lang], this.sanitisedQueryReplaceChars);

            if (this.lang !== 'en-gb') {
              const english = result['en-gb'];
              const sanitisedAlternative = sanitiseTypeaheadText(english, this.sanitisedQueryReplaceChars);

              if (sanitisedAlternative.match(sanitisedQuery)) {
                result.alternatives = [english];
                result.sanitisedAlternatives = [sanitisedAlternative];
              }
            } else {
              result.alternatives = [];
              result.sanitisedAlternatives = [];
            }
          });

          resolve({
            results,
            totalResults: data.totalResults,
          });
        })
        .catch(reject);
    });
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
    this.context.classList.remove(classTypeaheadHasResults);
    this.input.removeAttribute('aria-activedescendant');
    this.input.removeAttribute('aria-expanded');

    if (!preventAriaStatusUpdate) {
      this.setAriaStatus();
    }
  }

  handleResults(result) {
    this.foundResults = result.totalResults;
    this.results = result.results;
    this.numberOfResults = Math.max(this.results.length, 0);

    if (!this.deleting || (this.numberOfResults && this.deleting)) {
      if (this.numberOfResults.length === 1 && this.results[0].sanitisedText === this.sanitisedQuery) {
        this.clearListbox(true);
        this.selectResult(0);
      } else {
        this.listbox.innerHTML = '';
        this.resultOptions = this.results.map((result, index) => {
          let ariaLabel = result[this.lang];
          let innerHTML = this.emboldenMatch(ariaLabel, this.query);

          if (Array.isArray(result.sanitisedAlternatives)) {
            const alternativeMatch = result.sanitisedAlternatives.find(
              alternative => alternative !== result.sanitisedText && alternative.includes(this.sanitisedQuery),
            );

            if (alternativeMatch) {
              const alternativeText = result.alternatives[result.sanitisedAlternatives.indexOf(alternativeMatch)];
              innerHTML += ` <small>(${this.emboldenMatch(alternativeText, this.query)})</small>`;
              ariaLabel += `, (${alternativeText})`;
            }
          }

          const listElement = document.createElement('li');
          listElement.className = classTypeaheadOption;
          listElement.setAttribute('id', `${this.listboxId}__option--${index}`);
          listElement.setAttribute('role', 'option');
          listElement.setAttribute('aria-label', ariaLabel);
          listElement.innerHTML = innerHTML;

          listElement.addEventListener('click', () => {
            this.selectResult(index);
          });

          this.listbox.appendChild(listElement);

          return listElement;
        });

        if (this.numberOfResults < this.foundResults) {
          const listElement = document.createElement('li');
          listElement.className = `${classTypeaheadOption} ${classTypeaheadOptionMoreResults} u-fs-b`;
          listElement.setAttribute('aria-hidden', 'true');
          listElement.innerHTML = this.content.more_results;
          this.listbox.appendChild(listElement);
        }

        this.setHighlightedResult(null);

        this.input.setAttribute('aria-expanded', this.numberOfResults);
        this.context.classList[this.numberOfResults ? 'add' : 'remove'](classTypeaheadHasResults);
      }
    }

    if (this.numberOfResults === 0 && this.content.no_results) {
      this.listbox.innerHTML = `<li class="${classTypeaheadOption} ${classTypeaheadOptionNoResults}">${this.content.no_results}</li>`;
      this.input.setAttribute('aria-expanded', true);
    }
  }

  setHighlightedResult(index) {
    this.highlightedResultIndex = index;

    if (this.setHighlightedResult === null) {
      this.input.removeAttribute('aria-activedescendant');
    } else if (this.numberOfResults) {
      this.resultOptions.forEach((option, optionIndex) => {
        if (optionIndex === index) {
          option.classList.add(classTypeaheadOptionFocused);
          option.setAttribute('aria-selected', true);
          this.input.setAttribute('aria-activedescendant', option.getAttribute('id'));
        } else {
          option.classList.remove(classTypeaheadOptionFocused);
          option.removeAttribute('aria-selected');
        }
      });

      this.setAriaStatus();
    }
  }

  setAriaStatus(content) {
    if (!content) {
      const queryTooShort = this.sanitisedQuery.length < this.minChars;
      const noResults = this.numberOfResults === 0;

      if (queryTooShort) {
        content = this.content.aria_min_chars;
      } else if (noResults) {
        content = `${this.content.aria_no_results}: "${this.query}"`;
      } else if (this.numberOfResults === 1) {
        content = this.content.aria_one_result;
      } else {
        content = this.content.aria_n_results.replace('{n}', this.numberOfResults);

        if (this.resultLimit && this.foundResults > this.resultLimit) {
          content += ` ${this.content.aria_limited_results}`;
        }
      }
    }

    this.ariaStatus.innerHTML = content;
  }

  selectResult(index) {
    if (this.results.length) {
      this.settingResult = true;

      const result = this.results[index || this.highlightedResultIndex || 0];

      this.resultSelected = true;

      this.onSelect(result).then(() => (this.settingResult = false));

      let ariaAlternativeMessage = '';

      if (!result.sanitisedText.includes(this.sanitisedQuery) && result.sanitisedAlternatives) {
        const alternativeMatch = result.sanitisedAlternatives.find(alternative => alternative.includes(this.sanitisedQuery));

        if (alternativeMatch) {
          ariaAlternativeMessage = `, ${this.content.aria_found_by_alternative_name}: ${alternativeMatch}`;
        }
      }

      const ariaMessage = `${this.content.aria_you_have_selected}: ${result[this.lang]}${ariaAlternativeMessage}.`;

      this.clearListbox();
      this.setAriaStatus(ariaMessage);
    }
  }

  emboldenMatch(string, query) {
    query = query.toLowerCase().trim();

    if (string.toLowerCase().includes(query)) {
      const queryLength = query.length;
      const matchIndex = string.toLowerCase().indexOf(query);
      const matchEnd = matchIndex + queryLength;
      const before = string.substr(0, matchIndex);
      const match = string.substr(matchIndex, queryLength);
      const after = string.substr(matchEnd, string.length - matchEnd);

      return `${before}<strong>${match}</strong>${after}`;
    } else {
      return string;
    }
  }

  showErrorPanel() {
    this.setErrorPanelVisibility(true);
  }

  hideErrorPanel() {
    this.setErrorPanelVisibility(false);
  }

  setErrorPanelVisibility(visible) {
    if (this.errorPanel) {
      this.errorPanel.classList[visible ? 'remove' : 'add'](classPanelOff);
    }
  }
}
