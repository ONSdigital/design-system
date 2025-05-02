import abortableFetch from '../../js/abortable-fetch';
import AutosuggestUI from '../autosuggest/autosuggest.ui';
import AddressError from './autosuggest.address.error';
import AddressSetter from './autosuggest.address.setter';

export const classInputContainer = 'ons-autosuggest';
export const classNotEditable = 'ons-js-address-not-editable';
export const classMandatory = 'ons-js-address-mandatory';
export const classSearch = 'ons-js-address-input__search';
export const classInput = 'ons-js-autosuggest-input';
export const classInputUPRN = 'ons-js-hidden-uprn';

export default class AutosuggestAddress {
    constructor(context) {
        this.context = context;
        this.input = context.querySelector(`.${classInput}`);
        this.search = context.querySelector(`.${classSearch}`);
        this.addressReplaceChars = [','];
        this.sanitisedQuerySplitNumsChars = true;
        this.form = context.closest('form');
        this.container = context.querySelector(`.${classInputContainer}`);
        this.errorMessage = this.container.getAttribute('data-error-message');
        this.groupCount = this.container.getAttribute('data-group-count');
        this.authorizationToken = this.container.getAttribute('data-authorization-token');
        this.uprn = context.querySelector(`.${classInputUPRN}`);

        // State
        this.fetch = null;
        this.totalResults = 0;
        this.errored = false;
        this.isEditable = context.querySelector(`.${classNotEditable}`) ? false : true;
        this.isMandatory = context.querySelector(`.${classMandatory}`) ? true : false;
        this.addressSelected = false;
        this.groupQuery = '';
        this.selectedAddressValue = '';

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
            lang: this.lang,
            suggestionFunction: this.suggestAddresses.bind(this),
            sanitisedQueryReplaceChars: this.addressReplaceChars,
            sanitisedQuerySplitNumsChars: this.sanitisedQuerySplitNumsChars,
            suggestOnBoot: true,
            handleUpdate: true,
        });

        // Set up AIMS api variables and auth
        this.apiDomain = this.container.getAttribute('data-api-domain');
        this.lookupUrl = `${this.apiDomain}/addresses/eq?input=`;
        this.lookupGroupUrl = `${this.apiDomain}/addresses/eq/bucket?`;
        this.retrieveUrl = `${this.apiDomain}/addresses/eq/uprn/`;

        // Query string options
        this.manualQueryParams = this.container.getAttribute('data-query-params');
        this.regionCode = this.container.getAttribute('data-options-region-code');
        this.epoch = this.container.getAttribute('data-options-one-year-ago');
        this.classificationFilter = this.container.getAttribute('data-options-address-type');

        // Check API status
        this.checkAPIStatus();
    }

    get lang() {
        return document.documentElement.getAttribute('lang').toLowerCase();
    }

    async checkAPIStatus() {
        this.fetch = abortableFetch(this.lookupUrl + 'cf142&limit=10', {
            method: 'GET',
            headers: this.setAuthorization(this.authorizationToken),
        });
        try {
            const response = await this.fetch.send();
            const status = (await response.json()).status.code;
            if (status > 400) {
                if (this.isEditable) {
                    this.handleAPIError();
                } else {
                    this.autosuggest.handleNoResults(status);
                }
            }
        } catch (error) {
            if (this.isEditable) {
                this.handleAPIError();
            } else {
                this.autosuggest.handleNoResults(status);
            }
        }
    }

    async suggestAddresses(query, [], grouped) {
        if (this.fetch && this.fetch.status !== 'DONE') {
            this.fetch.abort();
        }

        return await this.findAddress(query, grouped);
    }

    async findAddress(text, grouped) {
        let queryUrl, fullQueryUrl;

        if (this.manualQueryParams) {
            const manualQueryParams = this.container.getAttribute('data-query-params');
            fullQueryUrl = this.lookupUrl + text + manualQueryParams;
        } else {
            const fullPostcodeQuery = this.testFullPostcodeQuery(text);
            let limit = fullPostcodeQuery ? 100 : 10;

            queryUrl = grouped ? this.lookupGroupUrl + this.groupQuery : this.lookupUrl + text + '&limit=' + limit;

            fullQueryUrl = this.generateUrlParams(queryUrl);
            if (fullPostcodeQuery && grouped !== false) {
                fullQueryUrl = fullQueryUrl + '&groupfullpostcodes=combo';
            }
        }

        this.fetch = abortableFetch(fullQueryUrl, {
            method: 'GET',
            headers: this.setAuthorization(this.authorizationToken),
        });
        const data = await this.fetch.send();
        const response = await data.json();
        const status = response.status.code;
        const addresses = response.response;
        const limit = response.response.limit;
        const results = await this.mapFindResults(addresses, limit, status);
        return results;
    }

    async mapFindResults(results, limit, status) {
        let mappedResults, currentResults;
        const total = results.total;

        if (results.partpostcode || (results.groupfullpostcodes === 'combo' && results.postcodes && results.postcodes.length > 1)) {
            mappedResults = await this.postcodeGroupsMapping(results);
            currentResults = mappedResults;
        } else if (results.addresses) {
            mappedResults = await this.addressMapping(results);
            currentResults = mappedResults ? mappedResults.results.sort() : null;
        } else {
            currentResults = results.addresses;
        }
        return {
            results: currentResults,
            totalResults: total,
            limit: limit,
            status: status,
        };
    }

    async addressMapping(results) {
        let updatedResults;
        const addresses = results.addresses;
        if (addresses[0]) {
            if (addresses[0] && addresses[0].bestMatchAddress) {
                updatedResults = addresses.map(({ uprn, bestMatchAddress, bestMatchAddressType }) => ({
                    uprn: uprn,
                    address: bestMatchAddress,
                    type: bestMatchAddressType,
                }));
            } else if (addresses[0] && addresses[0].formattedAddress) {
                updatedResults = addresses.map(({ uprn, formattedAddress, addressType }) => ({
                    uprn: uprn,
                    address: formattedAddress,
                    type: addressType,
                }));
            }

            results = updatedResults.map(({ uprn, address, type }) => {
                return {
                    [this.lang]: address,
                    uprn,
                    type,
                };
            });
            return {
                results: results,
                limit: results.limit,
            };
        }
    }

    async postcodeGroupsMapping(results) {
        const postcodeGroups = results.postcodes;
        let groups = postcodeGroups.map(({ postcode, postTown, streetName, townName, addressCount, firstUprn }) => {
            return {
                [this.lang]:
                    streetName +
                    ', ' +
                    (townName === postTown ? postTown : townName + ', ' + postTown) +
                    ', ' +
                    postcode +
                    ' (<span class="ons-autosuggest__group">' +
                    this.groupCount.replace(`{n}`, addressCount) +
                    '</span>)',
                postcode,
                streetName,
                townName,
                postTown,
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
                const matchingItem = items.findIndex((x) => x.firstUprn == result.uprn);
                items[matchingItem] = result;
            }
        }
        return items;
    }

    async createAddressObject(id) {
        const data = await this.retrieveAddress(id);
        const address = data.response.address.formattedAddress;
        const uprn = data.response.address.uprn;
        return {
            [this.lang]: address,
            uprn,
        };
    }

    testFullPostcodeQuery(input) {
        const fullPostcodeRegex =
            /\b((?:(?:gir)|(?:[a-pr-uwyz])(?:(?:[0-9](?:[a-hjkpstuw]|[0-9])?)|(?:[a-hk-y][0-9](?:[0-9]|[abehmnprv-y])?)))) ?([0-9][abd-hjlnp-uw-z]{2})\b/i;
        const testFullPostcode = fullPostcodeRegex.test(input);
        if (testFullPostcode) {
            return true;
        }
    }

    async retrieveAddress(id, type = null) {
        let retrieveUrl = this.retrieveUrl + id;

        const fullUprnUrl = this.generateUrlParams(retrieveUrl, id, type);

        this.fetch = abortableFetch(fullUprnUrl, {
            method: 'GET',
            headers: this.setAuthorization(this.authorizationToken),
        });

        const response = await this.fetch.send();
        const data = await response.json();
        return data;
    }

    async onAddressSelect(selectedResult) {
        if (selectedResult.uprn) {
            try {
                const data = await this.retrieveAddress(selectedResult.uprn, selectedResult.type);
                if (this.isEditable) {
                    if (data.status.code >= 403) {
                        this.autosuggest.handleNoResults(403);
                    } else {
                        this.addressSetter.setAddress(this.createAddressLines(data));
                        this.addressSelected = true;
                    }
                } else {
                    this.selectedAddressValue = selectedResult.displayText;
                    this.autosuggest.input.value = selectedResult.displayText;
                    this.uprn.value = selectedResult.uprn;
                    this.addressSelected = true;
                }
            } catch (error) {
                if (this.isEditable) {
                    this.handleAPIError();
                } else {
                    this.autosuggest.handleNoResults(403);
                }
                throw error;
            }
        } else if (selectedResult.postcode) {
            this.autosuggest.input.value =
                selectedResult.streetName +
                ', ' +
                (selectedResult.townName === selectedResult.postTown
                    ? selectedResult.postTown
                    : selectedResult.townName + ', ' + selectedResult.postTown) +
                ', ' +
                selectedResult.postcode;
            this.autosuggest.input.focus();
            this.groupQuery =
                'postcode=' + selectedResult.postcode + '&streetname=' + selectedResult.streetName + '&townname=' + selectedResult.townName;
            this.autosuggest.handleChange(true);
        }
    }

    createAddressLines(data) {
        const values = data.response.address;
        return {
            addressLine1: values.addressLine1,
            addressLine2: values.addressLine2,
            addressLine3: values.addressLine3,
            townName: values.townName,
            postcode: values.postcode,
            uprn: values.uprn,
        };
    }

    generateUrlParams(baseUrl, uprn, type) {
        let fullUrl = baseUrl,
            addressType;

        const classificationFilterParam = '&classificationfilter=',
            eboostParam = '&eboost=10',
            wboostParam = '&wboost=10',
            nionlyParam = '&eboost=0&sboost=0&wboost=0',
            niboostParam = '&nboost=10',
            favourwelshParam = '&favourwelsh=true',
            addresstypeParam = '?addresstype=',
            epochParam = '&epoch=75';

        if (type) {
            addressType = type.toLowerCase();
        } else {
            addressType = 'paf';
        }

        if (!uprn) {
            if (this.classificationFilter && this.classificationFilter !== 'residential') {
                fullUrl = fullUrl + classificationFilterParam + this.classificationFilter;
            }

            if (this.classificationFilter === 'workplace') {
                if (this.regionCode === 'gb-eng') {
                    fullUrl = fullUrl + eboostParam;
                } else if (this.regionCode === 'gb-wls') {
                    fullUrl = fullUrl + wboostParam;
                }
            }

            if (this.regionCode === 'gb-nir') {
                if (this.classificationFilter === 'educational') {
                    fullUrl = fullUrl + nionlyParam;
                } else {
                    fullUrl = fullUrl + niboostParam;
                }
            }

            if (this.lang === 'cy') {
                fullUrl = fullUrl + favourwelshParam;
            }
        } else if (uprn) {
            fullUrl = baseUrl + addresstypeParam + addressType;
        }

        if (this.epoch === 'true') {
            fullUrl = fullUrl + epochParam;
        }

        return fullUrl;
    }

    handleAPIError() {
        this.addressSetter.setManualMode(true, false);
        const searchBtn = document.querySelector('.ons-js-address-search-btn');
        searchBtn.classList.add('ons-u-d-no');
    }

    handleSubmit(event) {
        let isManualMode = false;

        if (this.isEditable) {
            isManualMode = this.addressSetter.manualMode;
            this.addressSetter.checkManualInputsValues(false);
        }
        if (this.isMandatory && !isManualMode) {
            if (
                !this.addressSelected ||
                this.input.value === '' ||
                (!this.isEditable && this.checkValueHasBeenUpdated(this.selectedAddressValue))
            ) {
                event.preventDefault();
                this.handleError = new AddressError(this.context);
                this.handleError.showErrorPanel();
                this.autosuggest.setAriaStatus(this.errorMessage);
            }
        }
    }

    checkValueHasBeenUpdated(value) {
        if (value !== this.input.value) {
            return true;
        }
    }

    setAuthorization(token) {
        this.authorization = `Bearer ${token}`;
        return new Headers({
            Authorization: this.authorization,
        });
    }
}
