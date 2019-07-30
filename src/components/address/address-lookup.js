import dice from 'dice-coefficient';
import { sortBy } from 'sort-by-typescript';

import fetch from 'js/abortable-fetch';
import triggerChange from 'js/trigger-change-event';

import TypeaheadUI from '../typeahead/typeahead.ui';
import { sanitiseTypeaheadText } from '../typeahead/typeahead.helpers';

const addressReplaceChars = [','];

const classUprn = 'js-address-uprn';
const classOrganisation = 'js-address-organisation';
const classLine1 = 'js-address-line-1';
const classLine2 = 'js-address-line-2';
const classLine3 = 'js-address-line-3';
const classTown = 'js-address-town';
const classCounty = 'js-address-county';
const classPostcode = 'js-address-postcode';
const classSearchButtonContainer = 'js-address-search-btn-container';
const classSearchButton = 'js-address-search-btn';
const classManualButton = 'js-address-manual-btn';
const classTypeahead = 'js-address-typeahead';

export default class AddressLookup {
  constructor(context) {
    this.context = context;
    this.uprn = context.querySelector(`.${classUprn}`);
    this.organisation = context.querySelector(`.${classOrganisation}`);
    this.line1 = context.querySelector(`.${classLine1}`);
    this.line2 = context.querySelector(`.${classLine2}`);
    this.line3 = context.querySelector(`.${classLine3}`);
    this.town = context.querySelector(`.${classTown}`);
    this.county = context.querySelector(`.${classCounty}`);
    this.postcode = context.querySelector(`.${classPostcode}`);
    this.manualInputs = [this.organisation, this.line1, this.line2, this.line3, this.town, this.county, this.postcode].filter(
      input => !!input,
    );
    this.searchButtonContainer = context.querySelector(`.${classSearchButtonContainer}`);
    this.searchButton = context.querySelector(`.${classSearchButton}`);
    this.manualButton = context.querySelector(`.${classManualButton}`);
    this.typeaheadContext = context.querySelector(`.${classTypeahead}`);
    this.form = context.closest('form');

    // Settings
    this.lang = document.documentElement.getAttribute('lang');
    this.searchURL = this.context.getAttribute('data-search-url');
    this.retrieveURL = this.context.getAttribute('data-retrieve-url');
    this.country = this.context.getAttribute('data-country');
    this.epoch = this.context.getAttribute('data-epoch');
    this.content = JSON.parse(this.typeaheadContext.getAttribute('data-content'));

    // State
    this.manualMode = true;
    this.currentQuery = null;
    this.fetch = null;
    this.currentResults = [];
    this.errored = false;
    this.addressSelected = false;

    // Initialise typeahead
    this.typeahead = new TypeaheadUI({
      context: this.typeaheadContext,
      onSelect: this.onAddressSelect.bind(this),
      onUnsetResult: this.onUnsetAddress.bind(this),
      suggestionFunction: this.suggestAddresses.bind(this),
      onError: this.onError.bind(this),
      sanitisedQueryReplaceChars: addressReplaceChars,
      resultLimit: 10,
      minChars: 5,
      suggestOnBoot: true,
      lang: this.lang,
    });

    this.searchButtonContainer.classList.remove('u-d-no');

    // Bind Event Listeners
    this.searchButton.addEventListener('click', () => this.toggleMode());
    this.manualButton.addEventListener('click', () => this.toggleMode());

    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    if (!this.manualInputs.find(input => input.value)) {
      this.toggleMode();
    }

    if (this.uprn) {
      this.manualInputs.forEach(input => input.addEventListener('input', this.handleManualInput.bind(this)));
    }
  }

  toggleMode() {
    this.setManualMode(!this.manualMode);

    if (!this.addressSelected && !this.typeahead.input.value.trim()) {
      this.clearManualInputs();
    }
  }

  setManualMode(manual, clearInputs = false) {
    this.context.classList[manual ? 'remove' : 'add']('address--search');

    if (clearInputs) {
      this.typeahead.unsetResults();
    }

    this.manualMode = manual;
  }

  suggestAddresses(query) {
    return new Promise((resolve, reject) => {
      if (this.currentQuery === query && this.currentQuery.length && this.currentResults.length) {
        resolve({
          results: this.currentResults,
          totalResults: this.currentResults.length,
        });
      } else {
        this.currentQuery = query;
        this.currentResults = [];

        if (this.fetch && this.fetch.status !== 'DONE') {
          this.fetch.abort();
        }

        this.reject = reject;

        this.findAddress(query)
          .then(resolve)
          .catch(reject);
      }
    });
  }

  clearManualInputs(triggerChange = true) {
    this.manualInputs.forEach(input => {
      input.value = '';
    });

    if (triggerChange) {
      this.triggerManualInputsChanges();
    }

    this.addressSelected = false;
  }

  triggerManualInputsChanges() {
    this.manualInputs.forEach(triggerChange);
  }

  onUnsetAddress() {
    this.clearManualInputs();
  }

  onError() {
    if (this.fetch) {
      this.fetch.abort();
    }

    // Prevent error message from firing twice
    if (!this.errored) {
      this.errored = true;

      setTimeout(() => {
        alert(this.content.lookup_error);

        this.setManualMode(true);

        this.errored = false;
      });
    }
  }

  findAddress(text) {
    return new Promise((resolve, reject) => {
      if (this.fetch) {
        this.fetch.abort();
      }

      const query = {
        q: text,
        lang: this.lang,
      };

      if (this.country) {
        query['country'] = this.country;
      }

      if (this.epoch) {
        query['epoch'] = this.epoch;
      }

      const queryString = new URLSearchParams(query).toString();

      this.fetch = fetch(`${this.searchURL}?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(async response => {
          const data = (await response.json()).addresses;
          resolve(this.mapFindResults(data));
        })
        .catch(reject);
    });
  }

  mapFindResults(results) {
    const mappedResults = results.map(({ uprn, text }) => {
      const sanitisedText = sanitiseTypeaheadText(text, addressReplaceChars);

      let queryIndex = sanitisedText.indexOf(this.currentQuery);

      if (queryIndex < 0) {
        queryIndex = Infinity;
      }

      const querySimilarity = dice(sanitisedText, this.currentQuery);

      return {
        [this.lang]: text,
        sanitisedText,
        querySimilarity,
        queryIndex,
        uprn,
      };
    });

    // Ideally this sorting should be handled serverside
    this.currentResults = mappedResults.sort(sortBy('queryIndex', '-querySimilarity', 'sanitisedText'));

    return {
      results: this.currentResults,
      totalResults: this.currentResults.length,
    };
  }

  retrieveAddress(id) {
    return new Promise((resolve, reject) => {
      if (this.fetch) {
        this.fetch.abort();
      }

      const query = {
        q: id,
        lang: this.lang,
      };

      const queryString = new URLSearchParams(query).toString();

      this.fetch = fetch(`${this.retrieveURL}?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(async response => {
          const data = await response.json();

          resolve(data);
        })
        .catch(reject);
    });
  }

  onAddressSelect(selectedResult) {
    return new Promise((resolve, reject) => {
      this.typeahead.input.value = selectedResult.displayText;

      this.retrieveAddress(selectedResult.uprn)
        .then(data => {
          this.setAddress(data, resolve);
        })
        .catch(reject);
    });
  }

  setAddress(data, resolve) {
    this.clearManualInputs(false);

    if (this.uprn) {
      this.uprn.value = data.uprn;
    }

    if (data.company && this.organisation) {
      this.organisation.value = data.company;
    }

    if (data.line1) {
      this.line1.value = data.line1;
    }

    if (data.line2) {
      this.line2.value = data.line2;
    }

    if (data.line3 && this.line3) {
      this.line3.value = data.line3;
    }

    if (data.town) {
      this.town.value = data.town;
    }

    if (data.county) {
      this.county.value = data.county;
    }

    if (data.postcode) {
      this.postcode.value = data.postcode;
    }

    this.triggerManualInputsChanges();
    this.typeahead.hideErrorPanel();

    this.addressSelected = true;

    resolve();
  }

  handleSubmit(event) {
    if (!this.manualMode && this.typeahead.input.value.trim() && !this.addressSelected && this.typeahead.results.length) {
      event.preventDefault();

      this.typeahead.showErrorPanel();
      this.typeahead.setAriaStatus(this.content.select_address_error);
    }
  }

  handleManualInput() {
    this.uprn.value = '';
    this.typeahead.input.value = '';
    this.addressSelected = false;
  }
}
