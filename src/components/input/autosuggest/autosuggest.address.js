import AutosuggestUI from './autosuggest.ui';
import AddressSetter from './autosuggest.address.setter';
import { sanitiseAutosuggestText } from './autosuggest.helpers';

import abortableFetch from './abortable-fetch';
import triggerEvent from 'js/utils/trigger-event';

const baseClass = 'js-address-autosuggest';
const classNotEditable = 'js-address-not-editable';

export default class AutosuggestAddress {
  constructor(context) {
    this.context = context;
    this.lang = document.documentElement.getAttribute('lang').toLowerCase();
    this.addressReplaceChars = [','];
    this.sanitisedQuerySplitNumsChars = true;

    // State
    this.currentQuery = null;
    this.fetch = null;
    this.currentResults = [];
    this.totalResults = 0;
    this.errored = false;
    this.isEditable = context.querySelector(`.${classNotEditable}`) ? false : true;

    // Temporary fix as runner doesn't use full lang code
    if (this.lang === 'en') {
      this.lang = 'en-gb';
    }

    // Initialise address setter
    if (this.isEditable) {
      this.addressSetter = new AddressSetter(context);
    }

    // Initialise autosuggest
    this.autosuggest = new AutosuggestUI({
      context: context.querySelector(`.${baseClass}`),
      onSelect: this.onAddressSelect.bind(this),
      onUnsetResult: this.addressSetter ? this.addressSetter.onUnsetAddress() : null,
      lang: this.lang,
      suggestionFunction: this.suggestAddresses.bind(this),
      onError: this.onError.bind(this),
      sanitisedQueryReplaceChars: this.addressReplaceChars,
      sanitisedQuerySplitNumsChars: this.sanitisedQuerySplitNumsChars,
      minChars: 5,
      suggestOnBoot: true,
      handleUpdate: true,
    });

    // Set up AIMS api variables and auth
    this.baseURL = 'https://whitelodge-ai-api.ai.census-gcp.onsdigital.uk/addresses/';
    this.lookupURL = `${this.baseURL}eq?input=`;
    this.retrieveURL = `${this.baseURL}eq/uprn/`;

    this.user = 'equser';
    this.password = '$4c@ec1zLBu';
    this.auth = btoa(this.user + ':' + this.password);
    this.headers = new Headers({
      Authorization: 'Basic ' + this.auth,
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
          const data = (await response.json()).response;
          resolve(this.mapFindResults(data, text));
        })
        .catch(reject);
    });
  }

  mapFindResults(results) {
    let updatedResults, mappedResults, limit;

    const addresses = results.addresses;
    const total = results.total;
    const originalLimit = 10;

    if (addresses[0]) {
      if (addresses[0] && addresses[0].bestMatchAddress) {
        updatedResults = addresses.map(({ uprn, bestMatchAddress }) => ({ uprn: uprn, address: bestMatchAddress }));
        limit = originalLimit;
      } else if (addresses[0] && addresses[0].formattedAddress) {
        updatedResults = addresses.map(({ uprn, formattedAddress }) => ({ uprn: uprn, address: formattedAddress }));
        limit = 100;
      }

      mappedResults = updatedResults.map(({ uprn, address }) => {
        const sanitisedText = sanitiseAutosuggestText(address, this.addressReplaceChars);
        return {
          [this.lang]: address,
          sanitisedText,
          uprn,
        };
      });

      this.currentResults = mappedResults.sort();
    } else {
      this.currentResults = addresses;
      limit = originalLimit;
    }

    return {
      results: this.currentResults,
      totalResults: total,
      limit: limit,
    };
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

  testFullPostcodeQuery(input) {
    const fullPostcodeRegex = /\b((?:(?:gir)|(?:[a-pr-uwyz])(?:(?:[0-9](?:[a-hjkpstuw]|[0-9])?)|(?:[a-hk-y][0-9](?:[0-9]|[abehmnprv-y])?)))) ?([0-9][abd-hjlnp-uw-z]{2})\b/i;
    const testFullPostcode = fullPostcodeRegex.test(input);
    if (testFullPostcode) {
      return true;
    }
  }

  onAddressSelect(selectedResult) {
    return new Promise((resolve, reject) => {
      if (selectedResult.uprn) {
        this.retrieveAddress(selectedResult.uprn)
          .then(data => {
            if (this.isEditable) {
              this.addressSetter.setAddress(this.createAddressLines(data, resolve));
            } else {
              this.autosuggest.input.value = selectedResult.displayText;
            }
          })
          .catch(reject);
      } else if (selectedResult.postcode) {
        triggerEvent = true;
        this.autosuggest.input.value = selectedResult.postcode;
        this.autosuggest.input.focus();
        this.autosuggest.input.dispatchEvent(triggerEvent);
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

  onError() {
    if (this.fetch) {
      this.fetch.abort();
    }

    // Prevent error message from firing twice
    if (!this.errored) {
      this.errored = true;
      console.log('error');
      setTimeout(() => {
        this.errored = false;
      });
    }
  }
}
