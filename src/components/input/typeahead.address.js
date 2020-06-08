import TypeaheadUI from './typeahead.ui';
import AddressSetter from './typeahead.address.setter';
import { sanitiseTypeaheadText } from './typeahead.helpers';

import domready from 'js/domready';
import abortableFetch from './abortable-fetch';
import triggerEvent from 'js/utils/trigger-event';

const classAddress = 'js-address';
const baseClass = 'js-address-typeahead';
const classNotEditable = 'js-address-not-editable';

class AddressInput {
  constructor(context) {
    this.context = context;
    this.form = context.closest('form');
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

    // Initialise address setter
    if (this.isEditable) {
      this.addressSetter = new AddressSetter(context);
    }

    // Temporary fix as runner doesn't use full lang code
    if (this.lang === 'en') {
      this.lang = 'en-gb';
    }

    // Initialise typeahead
    this.typeahead = new TypeaheadUI({
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
      const queryUrl = this.lookupURL + text + '&limit=' + limit;
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
        const sanitisedText = sanitiseTypeaheadText(address, this.addressReplaceChars);
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
      const queryUrl = this.retrieveURL + id + '?addresstype=paf';
      this.fetch = abortableFetch(queryUrl, {
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
              this.createAddressLines(data, resolve);
            } else {
              this.typeahead.input.value = selectedResult.displayText;
            }
          })
          .catch(reject);
      } else if (selectedResult.postcode) {
        triggerEvent = true;
        this.typeahead.input.value = selectedResult.postcode;
        this.typeahead.input.focus();
        this.typeahead.input.dispatchEvent(triggerEvent);
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
    this.addressSetter.setAddress(addressLines);
    resolve();
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

function addressInput() {
  const addressInputs = [...document.querySelectorAll(`.${classAddress}`)];

  addressInputs.forEach(addressInput => new AddressInput(addressInput));
}

domready(() => setTimeout(addressInput, 10));
