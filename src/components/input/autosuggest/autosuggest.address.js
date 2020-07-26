import AutosuggestUI from './autosuggest.ui';
import AddressSetter from './autosuggest.address.setter';
import AddressError from './autosuggest.address.error';
import { sanitiseAutosuggestText } from './autosuggest.helpers';

import abortableFetch from './abortable-fetch';

const classInputContainer = 'autosuggest-input';
const classNotEditable = 'js-address-not-editable';
const classSearch = 'js-address-input__search';

export default class AutosuggestAddress {
  constructor(context) {
    this.context = context;
    this.search = context.querySelector(`.${classSearch}`);
    this.lang = document.documentElement.getAttribute('lang').toLowerCase();
    this.addressReplaceChars = [','];
    this.sanitisedQuerySplitNumsChars = true;
    this.form = context.closest('form');
    this.container = context.querySelector(`.${classInputContainer}`);
    this.errorMessage = this.container.getAttribute('data-error-message');
    this.APIDomain = this.container.getAttribute('data-api-domain');

    // State
    this.currentQuery = null;
    this.fetch = null;
    this.currentResults = [];
    this.totalResults = 0;
    this.errored = false;
    this.isEditable = context.querySelector(`.${classNotEditable}`) ? false : true;
    this.addressSelected = false;

    // Temporary fix as runner doesn't use full lang code
    if (this.lang === 'en') {
      this.lang = 'en-gb';
    }

    // Bind event listeners
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    // Initialise address setter
    if (this.isEditable) {
      this.addressSetter = new AddressSetter(context);
    }

    // Initialise autosuggest
    this.autosuggest = new AutosuggestUI({
      context: this.container,
      onSelect: this.onAddressSelect.bind(this),
      onUnsetResult: this.addressSetter ? this.addressSetter.onUnsetAddress() : null,
      lang: this.lang,
      suggestionFunction: this.suggestAddresses.bind(this),
      onError: this.onError.bind(this),
      sanitisedQueryReplaceChars: this.addressReplaceChars,
      sanitisedQuerySplitNumsChars: this.sanitisedQuerySplitNumsChars,
      minChars: 3,
      suggestOnBoot: true,
      handleUpdate: true,
    });

    // Set up AIMS api variables and auth
    this.lookupURL = `${this.APIDomain}/addresses/eq?input=`;
    this.retrieveURL = `${this.APIDomain}/addresses/eq/uprn/`;

    this.user = 'equser';
    this.password = '$4c@ec1zLBu';
    this.auth = btoa(this.user + ':' + this.password);
    this.headers = new Headers({
      Authorization: 'Basic ' + this.auth,
    });

    // Check API status
    this.checkAPIStatus();
  }

  checkAPIStatus() {
    this.fetch = abortableFetch(this.lookupURL + 'CF14&limit=10', {
      method: 'GET',
      headers: this.headers,
    });
    this.fetch.send().then(response => {
      const status = response.status;
      if (status > 400 && this.isEditable) {
        this.addressSetter.toggleMode();
        const searchBtn = document.querySelector('.js-address-search-btn');
        searchBtn.classList.add('u-d-no');
      }
    });
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

  findAddress(text) {
    return new Promise((resolve, reject) => {
      const testInput = this.testFullPostcodeQuery(text);
      let limit = testInput ? 100 : 10;
      let queryUrl = this.lookupURL + text + '&limit=' + limit;

      if (this.lang === 'cy') {
        queryUrl = queryUrl + '&favourwelsh=true';
      }

      this.fetch = abortableFetch(queryUrl, {
        method: 'GET',
        headers: this.headers,
      });
      this.fetch
        .send()
        .then(async response => {
          const status = response.status;
          const data = (await response.json()).response;
          const results = await this.mapFindResults(data, status);
          resolve(results);
        })
        .catch(reject);
    });
  }

  async mapFindResults(results, status) {
    let mappedResults, limit;
    const total = results.total;
    const originalLimit = 10;

    if (results.partpostcode) {
      mappedResults = await this.postcodeGroupsMapping(results);
      this.currentResults = mappedResults;
      limit = originalLimit;
    } else if (results.addresses) {
      mappedResults = await this.addressMapping(results, originalLimit);
      limit = mappedResults ? mappedResults.limit : null;
      this.currentResults = mappedResults ? mappedResults.results.sort() : null;
    } else {
      this.currentResults = results.addresses;
      limit = originalLimit;
    }
    return {
      results: this.currentResults,
      totalResults: total,
      limit: limit,
      status: status,
    };
  }

  async addressMapping(results, originalLimit) {
    let updatedResults, limit;
    const addresses = results.addresses;

    if (addresses[0]) {
      if (addresses[0] && addresses[0].bestMatchAddress) {
        updatedResults = addresses.map(({ uprn, bestMatchAddress }) => ({ uprn: uprn, address: bestMatchAddress }));
        limit = originalLimit;
      } else if (addresses[0] && addresses[0].formattedAddress) {
        updatedResults = addresses.map(({ uprn, formattedAddress }) => ({ uprn: uprn, address: formattedAddress }));
        limit = 100;
      }

      results = updatedResults.map(({ uprn, address }) => {
        const sanitisedText = sanitiseAutosuggestText(address, this.addressReplaceChars);
        return {
          [this.lang]: address,
          sanitisedText,
          uprn,
        };
      });
      return {
        results: results,
        limit: limit,
      };
    }
  }

  async postcodeGroupsMapping(results) {
    const postcodeGroups = results.postcodes;
    let groups = postcodeGroups.map(({ postcode, streetName, townName, addressCount, firstUprn }) => {
      return {
        [this.lang]:
          streetName +
          ', ' +
          townName +
          ', ' +
          postcode +
          ' <span class="autosuggest-input__group">(' +
          addressCount +
          ' addresses)</span>',
        postcode,
        firstUprn,
        addressCount,
      };
    });
    const newGroups = await this.replaceSingleCountAddresses(groups);
    return newGroups;
  }

  async replaceSingleCountAddresses(items) {
    for (const item of items) {
      if (item.addressCount === 1 && item.firstUprn !== 0) {
        let result = await this.createAddressObject(item.firstUprn);
        const matchingItem = items.findIndex(x => x.firstUprn == result.uprn);
        items[matchingItem] = result;
      }
    }
    return items;
  }

  async createAddressObject(id) {
    const data = await this.retrieveAddress(id);
    const address = data.response.address.formattedAddress;
    const uprn = data.response.address.uprn;
    const sanitisedText = sanitiseAutosuggestText(address, this.addressReplaceChars);
    return {
      [this.lang]: address,
      sanitisedText,
      uprn,
    };
  }

  testFullPostcodeQuery(input) {
    const fullPostcodeRegex = /\b((?:(?:gir)|(?:[a-pr-uwyz])(?:(?:[0-9](?:[a-hjkpstuw]|[0-9])?)|(?:[a-hk-y][0-9](?:[0-9]|[abehmnprv-y])?)))) ?([0-9][abd-hjlnp-uw-z]{2})\b/i;
    const testFullPostcode = fullPostcodeRegex.test(input);
    if (testFullPostcode) {
      return true;
    }
  }

  retrieveAddress(id) {
    return new Promise((resolve, reject) => {
      let retrieveUrl = this.retrieveURL + id + '?addresstype=' + (this.lang === 'cy' ? 'welshpaf' : 'paf');
      this.fetch = abortableFetch(retrieveUrl, {
        method: 'GET',
        headers: this.headers,
      });

      this.fetch
        .send()
        .then(async response => {
          const data = await response.json();
          resolve(data);
        })
        .catch(reject);
    });
  }

  onAddressSelect(selectedResult) {
    return new Promise((resolve, reject) => {
      if (selectedResult.uprn) {
        this.retrieveAddress(selectedResult.uprn)
          .then(data => {
            if (this.isEditable) {
              this.addressSetter.setAddress(this.createAddressLines(data, resolve));
              this.addressSelected = true;
            } else {
              this.autosuggest.input.value = selectedResult.displayText;
            }
          })
          .catch(reject);
      } else if (selectedResult.postcode) {
        const event = new Event('input', {
          bubbles: true,
          cancelable: true,
        });
        this.autosuggest.input.value = selectedResult.postcode;
        this.autosuggest.input.focus();
        this.autosuggest.input.dispatchEvent(event);
      }
    });
  }

  createAddressLines(data, resolve) {
    const values = data.response.address;
    const addressLines = {
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      addressLine3: values.addressLine3,
      townName: values.townName,
      postcode: values.postcode,
    };
    resolve();

    return addressLines;
  }

  onError(error) {
    if (this.fetch) {
      this.fetch.abort();
    }

    // Prevent error message from firing twice
    if (!this.errored) {
      this.errored = true;
      console.log('error:', error);
      setTimeout(() => {
        this.errored = false;
      });
    }
  }

  handleSubmit(event) {
    if (!this.addressSelected && !this.search.classList.contains('u-d-no')) {
      event.preventDefault();

      const handleError = new AddressError(this.context);
      handleError.showErrorPanel();

      this.autosuggest.setAriaStatus(this.errorMessage);
    }
  }
}
