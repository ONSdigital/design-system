import TypeaheadUI from './typeahead.ui';
import AddressSetter from './typeahead.address.setter';
import { sanitiseTypeaheadText } from './typeahead.helpers';

import domready from 'js/domready';
import abortableFetch from './abortable-fetch';

const classAddress = 'js-address';
const baseClass = 'js-address-typeahead';
const classNotEditable = 'js-address-not-editable';
const classRHLookup = 'js-rh-address-lookup';

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
    this.isRhLookup = context.querySelector(`.${classRHLookup}`) ? true : false;

    // Initialise address setter
    this.addressSetter = new AddressSetter(context);

    // Initialise typeahead
    this.typeahead = new TypeaheadUI({
      context: context.querySelector(`.${baseClass}`),
      onSelect: this.onAddressSelect.bind(this),
      onUnsetResult: this.addressSetter.onUnsetAddress(),
      suggestionFunction: this.suggestAddresses.bind(this),
      onError: this.onError.bind(this),
      sanitisedQueryReplaceChars: this.addressReplaceChars,
      sanitisedQuerySplitNumsChars: this.sanitisedQuerySplitNumsChars,
      minChars: 5,
      suggestOnBoot: true,
      handleUpdate: true,
    });

    // Bind Event Listeners
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    this.baseURL = 'https://whitelodge-ai-api.ai.census-gcp.onsdigital.uk/addresses/';
    this.lookupURL = `${this.baseURL}eq?input=`;
    this.retrieveURL = this.isRhLookup ? `${this.baseURL}rh/uprn/` : `${this.baseURL}eq/uprn/`;

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

  mapFindResults(results, input) {
    let updatedResults, mappedResults, limit;

    const addresses = results.addresses;
    const total = results.total;
    const originalLimit = 10;

    // let groupPostcodes = addresses[0] && addresses[0].bestMatchAddress ? this.groupPostcodes(addresses, input) : null;
    let groupPostcodes = null;

    if (groupPostcodes) {
      mappedResults = groupPostcodes.map(({ address, count, postcode, uprn }) => {
        const countAdjust = count - 1;
        const addressText = countAdjust === 1 ? 'address' : 'addresses';
        return {
          'en-gb':
            countAdjust === 0 ? address : address + ' <span class="group-text">(' + countAdjust + ' more ' + addressText + ')</span>',
          postcode,
          uprn,
          countAdjust,
        };
      });

      limit = originalLimit;
      this.currentResults = mappedResults.sort();
    } else if (addresses[0]) {
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
          'en-gb': address,
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

  groupPostcodes(results, input) {
    const postcodeRegex = /([A-Za-z]{1,2}\d{1,2})(\s?(\d?\w{2}))?/;
    const testForPostcode = postcodeRegex.test(input);
    if (testForPostcode) {
      const addressesByPostcode = new Map();

      results.forEach(address => {
        const postcode = address.bestMatchAddress.match(postcodeRegex);
        if (!addressesByPostcode.has(postcode[0])) addressesByPostcode.set(postcode[0], []);
        addressesByPostcode.get(postcode[0]).push(address);
      });

      const groupPostcodes = Array.from(addressesByPostcode).map(([postcode, addresses]) => ({
        address: addresses[0].bestMatchAddress,
        count: addresses.length,
        postcode: postcode,
        uprn: addresses[0].uprn,
      }));

      return groupPostcodes;
    }
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
      if (selectedResult.uprn && (selectedResult.countAdjust === 0 || !selectedResult.countAdjust)) {
        this.retrieveAddress(selectedResult.uprn)
          .then(data => {
            if (this.isEditable) {
              this.createAddressLines(data, resolve);
            } else {
              this.typeahead.input.value = selectedResult.displayText;
              if (data.response.address.censusAddressType) {
                const rhAddressTypeInput = this.context.querySelector('.js-rh-address-type');
                const rhAddressCountryInput = this.context.querySelector('.js-rh-address-country');
                rhAddressTypeInput.value = data.response.address.censusAddressType;
                rhAddressCountryInput.value = data.response.address.countryCode;
              }
            }
          })
          .catch(reject);
      } else if (selectedResult.postcode && selectedResult.countAdjust > 0) {
        const event = new Event('input', {
          bubbles: true,
          cancelable: true,
        });
        this.typeahead.input.value = selectedResult.postcode;
        this.typeahead.input.focus();
        this.typeahead.input.dispatchEvent(event);
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

  handleSubmit(event) {
    if (!this.manualMode && this.typeahead.input.value.trim() && !this.addressSelected) {
      event.preventDefault();

      window.DONT_SUBMIT = true;

      this.typeahead.showErrorPanel();
      this.typeahead.setAriaStatus('There is an error. Select an address to continue');
    } else {
      window.DONT_SUBMIT = false;
    }
  }
}

function addressInput() {
  const addressInputs = [...document.querySelectorAll(`.${classAddress}`)];

  addressInputs.forEach(addressInput => new AddressInput(addressInput));
}

domready(() => setTimeout(addressInput, 10));
