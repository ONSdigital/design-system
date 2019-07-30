import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/address/_test-template.njk';
import '../../../scss/main.scss';

import AddressLookup from '../../../components/address/address-lookup';

import fetchMock from 'stubs/window.fetch.stub.spec';
import eventMock from 'stubs/event.stub.spec';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSpies from 'chai-spies';

chai.should();
chai.use(chaiSpies);
chai.use(chaiAsPromised);

const params = {
  id: 'address',
  legend: 'What is your address?',
  legendClasses: 'u-vh',
  organisation: {
    label: 'Organisation',
  },
  line1: {
    label: 'Address line 1',
  },
  line2: {
    label: 'Address line 2',
  },
  line3: {
    label: 'Address line 3',
  },
  town: {
    label: 'Town or City',
  },
  county: {
    label: 'County',
  },
  postcode: {
    label: 'Postcode',
  },
  uprn: {},
  typeahead: {
    label: {
      text: 'Enter your address or postcode',
    },
    instructions:
      // eslint-disable-next-line prettier/prettier
      'Use up and down keys to navigate addresses once you\'ve typed more than two characters. Use the enter key to select a address. Touch device users, explore by touch or with swipe gestures.',
    content: {
      no_results: 'No addresses found',
      aria_no_results: 'No addresses found for the query',
      aria_you_have_selected: 'You have selected',
      aria_min_chars: 'Type in 5 or more characters for addresses.',
      aria_one_result: 'There is one address available.',
      aria_n_results: 'There are {n} addresses available.',
      aria_limited_results: 'Results have been limited to 10 addresses. Type more characters to refine your search.',
      more_results: 'Continue typing to refine addresses',
      results_title: 'Select an address',
      lookup_error: 'There was an error looking up up your address. Enter your address manually.',
      select_address_error: 'There was an error. Select and address.',
    },
    autocomplete: 'new-address',
    or: 'Or',
    searchButton: 'Search for an address',
    manualButton: 'Manually enter address',
    selectError: 'Select an address to continue.',
    searchURL: 'https://address-lookup-dummy-service.herokuapp.com/search',
    retrieveURL: 'https://address-lookup-dummy-service.herokuapp.com/retrieve',
  },
};

describe('Address component', function() {
  before(function(done) {
    awaitPolyfills.then(() => {
      this.rewiremock = require('rewiremock/webpack').default;
      done();
    });
  });

  beforeEach(function() {
    this.originalFetch = window.fetch;

    this.results = {
      addresses: [],
    };

    window.fetch = fetchMock(true, null, this.results);

    const component = renderComponent(params);

    Object.keys(component).forEach(key => {
      this[key] = component[key];
    });
  });

  afterEach(function() {
    window.fetch = this.originalFetch;

    if (this.wrapper) {
      this.wrapper.remove();
    }
  });

  describe('Before the component initialises', function() {
    it('the manual fields should be display block', function() {
      expect(getComputedStyle(this.manualWrapper).display).to.equal('block');
    });

    it('the search fields should be display none', function() {
      expect(getComputedStyle(this.searchWrapper).display).to.equal('none');
    });

    it('the search address button container should be display none', function() {
      expect(getComputedStyle(this.searchButtonContainer).display).to.equal('none');
    });
  });

  describe('When the component initialises', function() {
    describe('if organisation has a value', function() {
      beforeEach(function() {
        this.organisation.value = 'Test';
        this.addressLookup = new AddressLookup(this.context);
      });

      initalisedWithValueTests();
    });

    describe('if line 1 has a value', function() {
      beforeEach(function() {
        this.line1.value = 'Test';
        this.addressLookup = new AddressLookup(this.context);
      });

      initalisedWithValueTests();
    });

    describe('if line 2 has a value', function() {
      beforeEach(function() {
        this.line2.value = 'Test';
        this.addressLookup = new AddressLookup(this.context);
      });

      initalisedWithValueTests();
    });

    describe('if line 3 has a value', function() {
      beforeEach(function() {
        this.line3.value = 'Test';
        this.addressLookup = new AddressLookup(this.context);
      });

      initalisedWithValueTests();
    });

    describe('if town has a value', function() {
      beforeEach(function() {
        this.town.value = 'Test';
        this.addressLookup = new AddressLookup(this.context);
      });

      initalisedWithValueTests();
    });

    describe('if county has a value', function() {
      beforeEach(function() {
        this.county.value = 'Test';
        this.addressLookup = new AddressLookup(this.context);
      });

      initalisedWithValueTests();
    });

    describe('if none of the manual inputs have a value', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
      });

      it('the manual fields should be display none', function() {
        expect(getComputedStyle(this.manualWrapper).display).to.equal('none');
      });

      it('the search fields should be display block', function() {
        expect(getComputedStyle(this.searchWrapper).display).to.equal('block');
      });

      it('the search address button container should be display block', function() {
        expect(getComputedStyle(this.searchButtonContainer).display).to.equal('block');
      });
    });

    describe('if the mode is search and the mode is toggled', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
        this.typeaheadInput.value = 'Text';
        this.setManualModeSpy = chai.spy.on(this.addressLookup, 'setManualMode');
        this.addressLookup.toggleMode(true);
      });

      it('setManualMode should be called with true', function() {
        expect(this.setManualModeSpy).to.have.been.called.with.exactly(true);
      });
    });

    describe('if the mode is manual and the mode is toggled', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
        this.setManualModeSpy = chai.spy.on(this.addressLookup, 'setManualMode');
        this.addressLookup.manualMode = true;
        this.addressLookup.toggleMode();
      });

      it('setManualMode should be called with false', function() {
        expect(this.setManualModeSpy).to.have.been.called.with.exactly(false);
      });
    });

    describe('if setManualMode is called to set to manual mode', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
        this.addressLookup.manualMode = false;
        this.addressLookup.setManualMode(true);
      });

      it('then the search wrapper should become display none', function() {
        expect(getComputedStyle(this.searchWrapper).display).to.equal('none');
      });

      it('then the manual wrapper should become display block', function() {
        expect(getComputedStyle(this.manualWrapper).display).to.equal('block');
      });

      it('then manual mode should be set to true', function() {
        expect(this.addressLookup.manualMode).to.be.true;
      });
    });

    describe('if setManualMode is called to set to search mode', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
        this.addressLookup.manualMode = true;
        this.addressLookup.setManualMode(false);
      });

      it('then the search wrapper should become display block', function() {
        expect(getComputedStyle(this.searchWrapper).display).to.equal('block');
      });

      it('then the manual wrapper should become display none', function() {
        expect(getComputedStyle(this.manualWrapper).display).to.equal('none');
      });

      it('then manual mode should be set to false', function() {
        expect(this.addressLookup.manualMode).to.be.false;
      });
    });

    describe('if setManualMode is called to with clearInputs set to true', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
        this.addressLookup.manualMode = true;
        this.clearManualInputsSpy = chai.spy.on(this.addressLookup, 'clearManualInputs');
        this.addressLookup.setManualMode(false, true);
      });

      it('then clearManualInputs should be called', function() {
        expect(this.clearManualInputsSpy).to.have.been.called();
      });
    });

    describe('if clearManualInputs is called', function() {
      beforeEach(function() {
        this.organisation.value = 'Test';
        this.line1.value = 'Test';
        this.line2.value = 'Test';
        this.line3.value = 'Test';
        this.town.value = 'Test';
        this.county.value = 'Test';
        this.postcode.value = 'Test';

        this.addressLookup = new AddressLookup(this.context);
        this.addressLookup.addressSelected = true;

        this.triggerManualInputsChangesSpy = chai.spy.on(this.addressLookup, 'triggerManualInputsChanges');

        this.addressLookup.clearManualInputs();
      });

      it('then all manual inputs should have their values cleared', function() {
        expect(this.organisation.value).to.equal('');
        expect(this.line1.value).to.equal('');
        expect(this.line2.value).to.equal('');
        expect(this.line3.value).to.equal('');
        expect(this.town.value).to.equal('');
        expect(this.county.value).to.equal('');
        expect(this.postcode.value).to.equal('');
      });

      it('then triggerManualInputsChanges should be called', function() {
        expect(this.triggerManualInputsChangesSpy).to.have.been.called();
      });

      it('then addressSelected should be set to false', function() {
        expect(this.addressLookup.addressSelected).to.be.false;
      });
    });

    describe('if clearManualInputs is called with false', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
        this.triggerManualInputsChangesSpy = chai.spy.on(this.addressLookup, 'triggerManualInputsChanges');

        this.addressLookup.clearManualInputs(false);
      });

      it('then triggerManualInputsChanges should not have be called', function() {
        expect(this.triggerManualInputsChangesSpy).to.not.have.been.called();
      });
    });

    describe('if onUnsetAddress is called ', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
        this.clearManualInputsSpy = chai.spy.on(this.addressLookup, 'clearManualInputs');
        this.addressLookup.onUnsetAddress();
      });

      it('then clearManualInputs should be called', function() {
        expect(this.clearManualInputsSpy).to.have.been.called();
      });
    });

    describe('if there is manual input', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
        this.uprn.value = 1;
        this.typeaheadInput.value = 'Yes';
        this.addressLookup.addressSelected = true;
        this.addressLookup.handleManualInput();
      });

      it('then the uprn field should be cleared', function() {
        expect(this.uprn.value).to.equal('');
      });

      it('then the typeahead field should be cleared', function() {
        expect(this.typeaheadInput.value).to.equal('');
      });

      it('then addressSelected should be set to false', function() {
        expect(this.addressLookup.addressSelected).to.be.false;
      });
    });

    describe('when suggestAddresses is called', function() {
      describe('if the currentQuery matches the query provided as an argument, and there are currently results', function() {
        beforeEach(function() {
          this.addressLookup = new AddressLookup(this.context);
          this.addressLookup.currentQuery = 'Yes';
          this.addressLookup.currentResults = [{}];
        });

        it('then the existing results should be returned', function() {
          return this.addressLookup.suggestAddresses('Yes').should.eventually.eql({
            results: [{}],
            totalResults: 1,
          });
        });
      });

      describe('if the currentQuery matches the query provided as an argument, but there are no results', function() {
        beforeEach(function() {
          this.addressLookup = new AddressLookup(this.context);
          this.addressLookup.currentQuery = 'Yes';
          this.addressLookup.currentResults = [];
          this.findAddressSpy = chai.spy.on(this.addressLookup, 'findAddress');
          this.addressLookup.suggestAddresses('Yes');
        });

        suggestAddressesGetNewResultsTests();
      });

      describe('if the currentQuery does not match the query provided as an argument', function() {
        beforeEach(function() {
          this.addressLookup = new AddressLookup(this.context);
          this.addressLookup.currentQuery = 'Ye';
          this.findAddressSpy = chai.spy.on(this.addressLookup, 'findAddress');
          this.addressLookup.suggestAddresses('Yes');
        });

        suggestAddressesGetNewResultsTests();
      });

      describe('if the currentQuery hasnt been populated yet', function() {
        beforeEach(function() {
          this.addressLookup = new AddressLookup(this.context);
          this.findAddressSpy = chai.spy.on(this.addressLookup, 'findAddress');
          this.addressLookup.suggestAddresses('Yes');
        });

        suggestAddressesGetNewResultsTests();
      });

      describe('and fetch exists', function() {
        beforeEach(function() {
          this.fetchSpy = chai.spy(require('js/abortable-fetch').default);

          this.addressLookup = new AddressLookup(this.context);

          this.addressLookup.fetch = this.fetchSpy()
            .then(() => {})
            .catch(() => {});

          this.abortFetchSpy = chai.spy.on(this.addressLookup.fetch, 'abort');

          this.addressLookup.findAddress = async () => {};
        });

        describe('if the fetch has not completed', function() {
          beforeEach(function() {
            this.addressLookup.suggestAddresses('Yes');
          });

          it('then the existing fetch should be aborted', function() {
            expect(this.abortFetchSpy).to.have.been.called();
          });
        });

        describe('if the fetch has completed', function() {
          beforeEach(function() {
            this.addressLookup.fetch.status = 'DONE';
            this.addressLookup.suggestAddresses('Yes');
          });

          it('then the existing fetch should not be aborted', function() {
            expect(this.abortFetchSpy).to.not.have.been.called();
          });
        });
      });
    });

    describe('when onError is called', function() {
      describe('if fetch exists', function() {
        beforeEach(function() {
          this.fetchSpy = chai.spy(require('js/abortable-fetch').default);

          this.addressLookup = new AddressLookup(this.context);

          this.addressLookup.fetch = this.fetchSpy()
            .then(() => {})
            .catch(() => {});

          this.abortFetchSpy = chai.spy.on(this.addressLookup.fetch, 'abort');

          this.addressLookup.findAddress = async () => {};

          this.addressLookup.onError();
        });

        it('then the existing fetch should be aborted', function() {
          expect(this.abortFetchSpy).to.have.been.called();
        });
      });

      describe('if errored is false', function() {
        beforeEach(function() {
          this.addressLookup = new AddressLookup(this.context);

          this.originalAlert = window.alert;

          window.alert = () => {};

          this.alertSpy = chai.spy.on(window, 'alert');
          this.setManualModeSpy = chai.spy.on(this.addressLookup, 'setManualMode');

          this.addressLookup.onError();
        });

        afterEach(function() {
          window.alert = this.originalAlert;
        });

        it('then errored should be set to true', function() {
          expect(this.addressLookup.errored).to.be.true;
        });

        it('an alert should be displayed with the lookup error message', function(done) {
          setTimeout(() => {
            expect(this.alertSpy).to.have.been.called.with.exactly(params.typeahead.content.lookup_error);
            done();
          });
        });

        it('then setManualMode should be called with true', function(done) {
          setTimeout(() => {
            expect(this.setManualModeSpy).to.have.been.called.with.exactly(true);
            done();
          });
        });

        it('then errored should be set to false on the next eventloop cycle', function(done) {
          setTimeout(() => {
            expect(this.addressLookup.errored).to.be.false;
            done();
          });
        });
      });

      describe('if errored is true', function() {
        beforeEach(function() {
          this.addressLookup = new AddressLookup(this.context);
          this.setManualModeSpy = chai.spy.on(this.addressLookup, 'setManualMode');
          this.addressLookup.errored = true;
          this.addressLookup.onError();
        });

        it('then the function should return immediately', function(done) {
          setTimeout(() => {
            expect(this.setManualModeSpy).to.not.have.been.called();
            done();
          });
        });
      });
    });

    describe('when findAddress is called', function() {
      beforeEach(function() {
        this.fetchSpy = chai.spy(require('js/abortable-fetch').default);

        this.rewiremock('./src/js/abortable-fetch')
          .es6()
          .withDefault(this.fetchSpy);

        this.rewiremock.enable();

        const mockedAddressLookup = require('components/address/address-lookup').default;

        this.addressLookup = new mockedAddressLookup(this.context);

        this.addressLookup.mapFindResults = () => {};
        this.addressLookup.lang = 'en-gb';
      });

      describe('if fetch exists', function() {
        beforeEach(function() {
          this.addressLookup.fetch = this.fetchSpy()
            .then(() => {})
            .catch(() => {});

          this.abortFetchSpy = chai.spy.on(this.addressLookup.fetch, 'abort');

          this.addressLookup.findAddress();
        });

        it('then the fetch should be aborted', function() {
          expect(this.abortFetchSpy).to.have.been.called();
        });
      });

      describe('if country is not specified and epoch is not specified', function() {
        beforeEach(function() {
          this.addressLookup.findAddress('Yes');
        });

        it('then fetch should be called with only the query and the lang', function() {
          expect(this.fetchSpy).to.have.been.called.with.exactly(`${params.typeahead.searchURL}?q=Yes&lang=en-gb`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
        });
      });

      describe('if country is specified and epoch is not specified', function() {
        beforeEach(function() {
          this.addressLookup.country = 'gb-nir';
          this.addressLookup.findAddress('Yes');
        });

        it('then fetch should be called with only the query, the lang and country', function() {
          expect(this.fetchSpy).to.have.been.called.with.exactly(`${params.typeahead.searchURL}?q=Yes&lang=en-gb&country=gb-nir`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
        });
      });

      describe('if country is not specified and epoch is specified', function() {
        beforeEach(function() {
          this.addressLookup.epoch = 69;
          this.addressLookup.findAddress('Yes');
        });

        it('then fetch should be called with only the query, the lang and epoch', function() {
          expect(this.fetchSpy).to.have.been.called.with.exactly(`${params.typeahead.searchURL}?q=Yes&lang=en-gb&epoch=69`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
        });
      });

      describe('if country is specified and epoch is specified', function() {
        beforeEach(function() {
          this.addressLookup.country = 'gb-nir';
          this.addressLookup.epoch = 69;
          this.addressLookup.findAddress('Yes');
        });

        it('then fetch should be called with the query, the lang, country, and epoch', function() {
          expect(this.fetchSpy).to.have.been.called.with.exactly(`${params.typeahead.searchURL}?q=Yes&lang=en-gb&country=gb-nir&epoch=69`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
        });
      });

      describe('if the fetch is successful', function() {
        beforeEach(function() {
          this.mapFindResultsSpy = chai.spy.on(this.addressLookup, 'mapFindResults');
          this.addressLookup.findAddress('Yes');
        });

        it('then mapFindResults should be called with the data', function() {
          setTimeout(() => {
            expect(this.mapFindResultsSpy).to.have.been.called.with.exactly(this.results.addresses);
          });
        });
      });

      describe('if the unfetch is successful', function() {
        beforeEach(function() {
          window.fetch = fetchMock(false);
          this.mapFindResultsSpy = chai.spy.on(this.addressLookup, 'mapFindResults');
          this.addressLookup.findAddress('Yes');
        });

        it('then mapFindResults shouldnt be called', function() {
          setTimeout(() => {
            expect(this.mapFindResultsSpy).to.have.not.been.called();
          });
        });
      });
    });

    describe('when mapFindResults is called', function() {
      beforeEach(function() {
        this.results = [
          { uprn: 0, text: 'Example Address 1, Street, Town, County, AA99 9AA' },
          { uprn: 1, text: 'Example Address 2, Street, Town, County, AA99 9AA' },
          { uprn: 2, text: 'Example Address 3, Street, Town, County, AA99 9AA' },
          { uprn: 3, text: 'Example Address 4, Street, Town, County, AA99 9AA' },
          { uprn: 5, text: 'Example Address 6, Street, Town, County, AA99 9AA' },
          { uprn: 6, text: 'Example Address 7, Street, Town, County, AA99 9AA' },
          { uprn: 7, text: 'Example Address 8, Street, Town, County, AA99 9AA' },
          { uprn: 8, text: 'Example Address 9, Street, Town, County, AA99 9AA' },
          { uprn: 9, text: 'Example Address 10, Street, Town, County, AA99 9AA' },
        ];

        this.mappedResults = [
          {
            'en-gb': 'Example Address 1, Street, Town, County, AA99 9AA',
            sanitisedText: 'example address 1 street town county aa99 9aa',
            querySimilarity: 0.043478260869565216,
            queryIndex: null,
            uprn: 0,
          },
          {
            'en-gb': 'Example Address 2, Street, Town, County, AA99 9AA',
            sanitisedText: 'example address 2 street town county aa99 9aa',
            querySimilarity: 0.043478260869565216,
            queryIndex: null,
            uprn: 1,
          },
          {
            'en-gb': 'Example Address 3, Street, Town, County, AA99 9AA',
            sanitisedText: 'example address 3 street town county aa99 9aa',
            querySimilarity: 0.043478260869565216,
            queryIndex: null,
            uprn: 2,
          },
          {
            'en-gb': 'Example Address 4, Street, Town, County, AA99 9AA',
            sanitisedText: 'example address 4 street town county aa99 9aa',
            querySimilarity: 0.043478260869565216,
            queryIndex: null,
            uprn: 3,
          },
          {
            'en-gb': 'Example Address 6, Street, Town, County, AA99 9AA',
            sanitisedText: 'example address 6 street town county aa99 9aa',
            querySimilarity: 0.043478260869565216,
            queryIndex: null,
            uprn: 5,
          },
          {
            'en-gb': 'Example Address 7, Street, Town, County, AA99 9AA',
            sanitisedText: 'example address 7 street town county aa99 9aa',
            querySimilarity: 0.043478260869565216,
            queryIndex: null,
            uprn: 6,
          },
          {
            'en-gb': 'Example Address 8, Street, Town, County, AA99 9AA',
            sanitisedText: 'example address 8 street town county aa99 9aa',
            querySimilarity: 0.043478260869565216,
            queryIndex: null,
            uprn: 7,
          },
          {
            'en-gb': 'Example Address 9, Street, Town, County, AA99 9AA',
            sanitisedText: 'example address 9 street town county aa99 9aa',
            querySimilarity: 0.043478260869565216,
            queryIndex: null,
            uprn: 8,
          },
          {
            'en-gb': 'Example Address 10, Street, Town, County, AA99 9AA',
            sanitisedText: 'example address 10 street town county aa99 9aa',
            querySimilarity: 0.0425531914893617,
            queryIndex: null,
            uprn: 9,
          },
        ];

        this.addressLookup = new AddressLookup(this.context);
        this.addressLookup.lang = 'en-gb';
        this.addressLookup.currentQuery = 'Yes';
      });

      it('current results should be set to the mapped results', function() {
        this.addressLookup.mapFindResults(this.results);
        expect(JSON.stringify(this.addressLookup.currentResults)).to.equal(JSON.stringify(this.mappedResults));
      });

      it('the function should return an object containing the results and the count of results', function() {
        expect(JSON.stringify(this.addressLookup.mapFindResults(this.results))).to.equal(
          JSON.stringify({
            results: this.mappedResults,
            totalResults: this.mappedResults.length,
          }),
        );
      });
    });

    describe('when an address is retrieved', function() {
      beforeEach(function() {
        this.fetchSpy = chai.spy(require('js/abortable-fetch').default);

        this.rewiremock('./src/js/abortable-fetch')
          .es6()
          .withDefault(this.fetchSpy);

        this.rewiremock.enable();

        const mockedAddressLookup = require('components/address/address-lookup').default;

        this.addressLookup = new mockedAddressLookup(this.context);

        this.addressLookup.lang = 'en-gb';
      });

      it('then fetch should be called', function() {
        this.addressLookup.retrieveAddress('0');

        expect(this.fetchSpy).to.have.been.called.with.exactly(`${params.typeahead.retrieveURL}?q=0&lang=en-gb`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
      });

      describe('if fetch exists', function() {
        beforeEach(function() {
          this.addressLookup.fetch = this.fetchSpy()
            .then(() => {})
            .catch(() => {});
          this.abortFetchSpy = chai.spy.on(this.addressLookup.fetch, 'abort');

          this.addressLookup.retrieveAddress();
        });

        it('then the fetch should be aborted', function() {
          expect(this.abortFetchSpy).to.have.been.called();
        });
      });

      describe('if the fetch is successful', function() {
        it('then the returned promise should resolve with the data', function() {
          return this.addressLookup.retrieveAddress().should.eventually.eql(this.results);
        });
      });

      describe('if the fetch is unsuccessful', function() {
        beforeEach(function() {
          window.fetch = fetchMock(false);
        });

        it('then the returned promise should reject', function() {
          return this.addressLookup.retrieveAddress().should.be.rejected;
        });
      });
    });

    describe('when an address is selected', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);

        this.retrieveAddressSpy = chai.spy.on(this.addressLookup, 'retrieveAddress');
        this.setAddressSpy = chai.spy.on(this.addressLookup, 'setAddress');
      });

      it('then the typeahead input value should be set to match the display text of the selected result', function() {
        this.addressLookup.onAddressSelect({
          uprn: 0,
          displayText: 'Yes',
        });

        expect(this.typeaheadInput.value).to.equal('Yes');
      });

      it('then retrieveAddress should be called with the uprn of the selected result', function() {
        this.addressLookup.onAddressSelect({
          uprn: 0,
          displayText: 'Yes',
        });

        expect(this.retrieveAddressSpy).to.have.been.called.with.exactly(0);
      });

      describe('if the retrieveAddress call is successful', function() {
        beforeEach(function() {
          this.result = {};
          this.addressLookup.retrieveAddress = async () => this.result;

          this.addressLookup.onAddressSelect({
            uprn: 0,
            displayText: 'Yes',
          });
        });

        it('then setAddress should be called', function(done) {
          setTimeout(() => {
            expect(this.setAddressSpy).to.have.been.called.with(this.result);
            done();
          });
        });
      });

      describe('if the retrieveAddress call is unsuccessful', function() {
        beforeEach(function() {
          this.addressLookup.retrieveAddress = () => new Promise((resolve, reject) => reject());
        });

        it('then setAddress shouldnt be called', function() {
          return this.addressLookup.onAddressSelect({
            uprn: 0,
            displayText: 'Yes',
          }).should.be.rejected;
        });
      });
    });

    describe('when an address is set', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);

        this.clearManualInputsSpy = chai.spy.on(this.addressLookup, 'clearManualInputs');
        this.triggerManualInputsChanges = chai.spy.on(this.addressLookup, 'triggerManualInputsChanges');
        this.hideErrorPanelSpy = chai.spy.on(this.addressLookup.typeahead, 'hideErrorPanel');
        this.resolveSpy = chai.spy(() => {});
      });

      it('then clearManualInputs should be called with false', function() {
        this.addressLookup.setAddress({ uprn: 0 }, this.resolveSpy);
        expect(this.clearManualInputsSpy).to.have.been.called.with.exactly(false);
      });

      describe('if the uprn field is present', function() {
        it('then the uprn field should be set to match the data', function() {
          this.addressLookup.setAddress({ uprn: 0 }, this.resolveSpy);
          expect(this.uprn.value).to.equal('0');
        });
      });

      describe('if the organisation field is present', function() {
        it('then the organisation field should be set to match the data', function() {
          this.addressLookup.setAddress({ company: 'Test' }, this.resolveSpy);
          expect(this.organisation.value).to.equal('Test');
        });
      });

      it('then the line 1 field should be set to match the data', function() {
        this.addressLookup.setAddress({ line1: 'Test' }, this.resolveSpy);
        expect(this.line1.value).to.equal('Test');
      });

      it('then the line 2 field should be set to match the data', function() {
        this.addressLookup.setAddress({ line2: 'Test' }, this.resolveSpy);
        expect(this.line2.value).to.equal('Test');
      });

      describe('if the line 3 field is present', function() {
        it('then the line 3 field should be set to match the data', function() {
          this.addressLookup.setAddress({ line3: 'Test' }, this.resolveSpy);
          expect(this.line3.value).to.equal('Test');
        });
      });

      it('then the town field should be set to match the data', function() {
        this.addressLookup.setAddress({ town: 'Test' }, this.resolveSpy);
        expect(this.town.value).to.equal('Test');
      });

      it('then the county field should be set to match the data', function() {
        this.addressLookup.setAddress({ county: 'Test' }, this.resolveSpy);
        expect(this.county.value).to.equal('Test');
      });

      it('then the postcode field should be set to match the data', function() {
        this.addressLookup.setAddress({ postcode: 'Test' }, this.resolveSpy);
        expect(this.postcode.value).to.equal('Test');
      });

      it('then triggerManualInputsChanges should be called', function() {
        this.addressLookup.setAddress({}, this.resolveSpy);
        expect(this.triggerManualInputsChanges).to.have.been.called();
      });

      it('then the error panel should be hidden', function() {
        this.addressLookup.setAddress({}, this.resolveSpy);
        expect(this.hideErrorPanelSpy).to.have.been.called();
      });

      it('then address selected should be set to true', function() {
        this.addressLookup.setAddress({}, this.resolveSpy);
        expect(this.addressLookup.addressSelected).to.be.true;
      });

      it('then the resolve function passed should be called', function() {
        this.addressLookup.setAddress({}, this.resolveSpy);
        expect(this.resolveSpy).to.have.been.called();
      });
    });

    describe('when the form submits', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
        this.mockedEvent = eventMock();
        this.showErrorPanelSpy = chai.spy.on(this.addressLookup.typeahead, 'showErrorPanel');
        this.setAriaStatusSpy = chai.spy.on(this.addressLookup.typeahead, 'setAriaStatus');
      });

      describe('if the component is in search mode, the user has inputted a search term, an address hasnt been selected, and there are results', function() {
        beforeEach(function() {
          this.typeaheadInput.value = 'Test';
          this.addressLookup.typeahead.results = [{}];

          this.addressLookup.handleSubmit(this.mockedEvent);
        });

        it('then preventDefault should be called on the submit event', function() {
          expect(this.mockedEvent.preventDefault).to.have.been.called();
        });

        it('then showErrorPanel should be called', function() {
          expect(this.showErrorPanelSpy).to.have.been.called();
        });

        it('then setAriaStatus should be called with the error message', function() {
          expect(this.setAriaStatusSpy).to.have.been.called.with.exactly(params.typeahead.content.select_address_error);
        });
      });

      describe('if the component is in search mode, the user has inputted a search term, an address hasnt been selected, and there arent any results', function() {
        beforeEach(function() {
          this.typeaheadInput.value = 'Test';
          this.addressLookup.handleSubmit(this.mockedEvent);
        });

        allowSubmitTests();
      });

      describe('if the component is in search mode, the user has inputted a search term, an address has been selected, and there are results', function() {
        beforeEach(function() {
          this.typeaheadInput.value = 'Test';
          this.addressLookup.typeahead.results = [{}];
          this.addressLookup.addressSelected = true;

          this.addressLookup.handleSubmit(this.mockedEvent);
        });

        allowSubmitTests();
      });

      describe('if the component is in search mode, the user hasnt inputted a search term, an address hasnt been selected, and there are results', function() {
        beforeEach(function() {
          this.addressLookup.typeahead.results = [{}];

          this.addressLookup.handleSubmit(this.mockedEvent);
        });

        allowSubmitTests();
      });

      describe('if the component isnt in search mode, the user has inputted a search term, an address hasnt been selected, and there are results', function() {
        beforeEach(function() {
          this.typeaheadInput.value = 'Test';
          this.addressLookup.manualMode = true;
          this.addressLookup.typeahead.results = [{}];

          this.addressLookup.handleSubmit(this.mockedEvent);
        });

        allowSubmitTests();
      });
    });
  });
});

function renderComponent(params) {
  const html = template.render({ params });

  const wrapper = document.createElement('div');

  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const context = wrapper.querySelector('.js-address');
  const manualWrapper = context.querySelector('.address__manual');
  const searchWrapper = context.querySelector('.address__search');
  const searchButtonContainer = context.querySelector('.js-address-search-btn-container');
  const uprn = context.querySelector('.js-address-uprn');
  const organisation = context.querySelector('.js-address-organisation');
  const line1 = context.querySelector('.js-address-line-1');
  const line2 = context.querySelector('.js-address-line-2');
  const line3 = context.querySelector('.js-address-line-3');
  const town = context.querySelector('.js-address-town');
  const county = context.querySelector('.js-address-county');
  const postcode = context.querySelector('.js-address-postcode');
  const typeaheadInput = context.querySelector('.js-typeahead-input');

  return {
    wrapper,
    context,
    manualWrapper,
    searchWrapper,
    searchButtonContainer,
    uprn,
    organisation,
    line1,
    line2,
    line3,
    town,
    county,
    postcode,
    typeaheadInput,
  };
}

function initalisedWithValueTests() {
  it('then the manual inputs should be visible', function() {
    expect(getComputedStyle(this.manualWrapper).display).to.equal('block');
  });

  it('the search fields should be display none', function() {
    expect(getComputedStyle(this.searchWrapper).display).to.equal('none');
  });

  it('the search address button container should be display none', function() {
    expect(getComputedStyle(this.searchButtonContainer).display).to.equal('block');
  });
}

function suggestAddressesGetNewResultsTests() {
  it('then currentQuery should be set to match the query', function() {
    expect(this.addressLookup.currentQuery).to.equal('Yes');
  });

  it('then currentResults should be an empty array', function() {
    expect(this.addressLookup.currentResults).to.eql([]);
  });

  it('then reject should be set to a rejection function', function() {
    expect(typeof this.addressLookup.reject).to.equal('function');
  });

  it('then find address should be called', function() {
    expect(this.findAddressSpy).to.have.been.called();
  });
}

function allowSubmitTests() {
  it('then preventDefault should not have been called on the submit event', function() {
    expect(this.mockedEvent.preventDefault).to.not.have.been.called();
  });

  it('then showErrorPanel should not have be called', function() {
    expect(this.showErrorPanelSpy).to.not.have.been.called();
  });

  it('then setAriaStatus should not have been called', function() {
    expect(this.setAriaStatusSpy).to.not.have.been.called();
  });
}
