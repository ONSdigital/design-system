import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/address/_test-template.njk';
import '../../../scss/main.scss';
import AutosuggestAddress, {
  classInputContainer,
  classNotEditable,
  classSearch,
  classInput,
  classInputUPRN,
} from '../../../components/input/autosuggest/autosuggest.address';
import eventMock from 'stubs/event.stub.spec';
import fetchMock from 'stubs/window.fetch.stub.spec';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSpies from 'chai-spies';

chai.should();
chai.use(chaiSpies);
chai.use(chaiAsPromised);

const params = {
  id: 'address',
  label: {
    text: 'Enter an address',
    classes: 'js-autosuggest-label',
  },
  autocomplete: 'off',
  autosuggest: {
    instructions:
      'Use up and down keys to navigate suggestions once youve typed more than two characters. Use the enter key to select a suggestion. Touch device users, explore by touch or with swipe gestures.',
    ariaYouHaveSelected: 'You have selected',
    ariaFoundByAlternativeName: 'found by alternative name',
    APIDomain: 'https://whitelodge-ai-api.census-gcp.onsdigital.uk',
    ariaMinChars: 'Enter 3 or more characters for suggestions.',
    ariaOneResult: 'There is one suggestion available.',
    ariaNResults: 'There are {n} suggestions available.',
    ariaLimitedResults: 'Results have been limited to 10 suggestions. Enter more characters to improve your search.',
    moreResults: 'Continue entering to improve suggestions',
    resultsTitle: 'Suggestions',
    noResults: 'No results found',
    typeMore: 'Enter more of the address to get results',
    tooManyResults: '{n} results found. Enter more of the address to improve results.',
    errorTitle: 'There is a problem with your answer',
    errorMessage: 'Enter an address ',
    errorMessageAPI: 'Sorry, there was a problem loading addresses. We are working to fix the problem. Please try again later.',
    externalInitialiser: true,
    isEditable: true,
  },
  line1: {
    label: 'Address line 1',
  },
  line2: {
    label: 'Address line 2',
  },
  town: {
    label: 'Town or city',
  },
  postcode: {
    label: 'Postcode',
  },
  searchButton: 'Search for an address',
  manualButton: 'Manually enter address',
};

describe('Autosuggest.address component', function() {
  before(function(done) {
    awaitPolyfills.then(() => {
      this.rewiremock = require('rewiremock/webpack').default;
      done();
    });
  });

  // describe('When the API status is checked', function() {
  //   beforeEach(function() {
  //     // Mock
  //     this.originalFetch = window.fetch;

  //     window.fetch = fetchMock(true);

  //     this.fetchSpy = chai.spy(require('../../../components/input/autosuggest/abortable-fetch').default);
  //     this.rewiremock('./src/components/input/autosuggest/abortable-fetch')
  //       .es6()
  //       .withDefault(this.fetchSpy);

  //     this.rewiremock.enable();

  //     const mockedautosuggestAddress = require('components/input/autosuggest/autosuggest.address').default;

  //     // Render
  //     const component = renderComponent(params);

  //     // Initialise
  //     Object.keys(component).forEach(key => {
  //       this[key] = component[key];
  //     });

  //     const context = this.context;
  //     this.autosuggestAddress = new mockedautosuggestAddress(context);
  //   });

  //   afterEach(function() {
  //     window.fetch = this.originalFetch;
  //     this.rewiremock.disable();

  //     if (this.wrapper) {
  //       this.wrapper.remove();
  //     }
  //   });

  //   describe('and fetch is not defined', function() {
  //     beforeEach(function() {
  //       console.log(this.autosuggestAddress.fetch);
  //       this.autosuggestAddress.fetch = this.fetchSpy()
  //         .then(() => {})
  //         .catch(() => {});
  //       this.autosuggestAddress.fetch.status = 'undefined';
  //       this.abortSpy = chai.spy.on(this.autosuggestAddress.fetch, 'abort');
  //       this.autosuggestAddress.abortFetch();
  //     });

  //     it('then the function should return immediately', function() {
  //       expect(this.abortSpy).to.have.been.called();
  //     });
  //   });
  // });

  describe('When the component initialises', function() {
    beforeEach(function(done) {
      const component = renderComponent(params);

      Object.keys(component).forEach(key => {
        this[key] = component[key];
      });

      const context = this.context;
      this.autosuggestAddress = new AutosuggestAddress(context);
      done();
    });

    afterEach(function() {
      if (this.wrapper) {
        this.wrapper.remove();
      }
    });

    // describe('When the API status is checked', function() {
    //   beforeEach(function() {
    //     this.handleAPIErrorSpy = chai.spy.on(this.autosuggestAddress, 'handleAPIError');
    //   });
    //   describe('When the API is unavilable', function() {
    //     beforeEach(function(done) {
    //       this.autosuggestAddress.checkAPIStatus();
    //       setTimeout(done);
    //     });

    //     it('then handleAPIError function should be called', function() {
    //       expect(this.handleAPIErrorSpy).to.have.been.called();
    //     });
    //   });
    // });

    describe('and the user inputs', function() {
      beforeEach(function() {
        this.findAddressSpy = chai.spy.on(this.autosuggestAddress, 'findAddress');
        this.testPostcodeSpy = chai.spy.on(this.autosuggestAddress, 'testFullPostcodeQuery');
      });
      describe('and the value does not match an existing query', function() {
        beforeEach(function(done) {
          this.autosuggestAddress.suggestAddresses('195 colle', [], false);
          setTimeout(done);
        });
        it('then the findAddress function should be called', function() {
          expect(this.findAddressSpy).to.have.been.called();
        });
      });
      describe('and the value is a full postcode', function() {
        const postcode = 'CF14 2NT';
        beforeEach(function(done) {
          this.autosuggestAddress.findAddress(postcode);
          setTimeout(done);
        });
        it('then the testFullPostcodeQuery function should return true', function() {
          expect(this.testPostcodeSpy).to.have.been.called();
          expect(this.autosuggestAddress.testFullPostcodeQuery(postcode)).to.equal(true);
        });
      });
    });
  });
});

function renderComponent(params) {
  const html = template.render({ params });
  const wrapper = document.createElement('div');

  document.documentElement.setAttribute('lang', 'en');

  wrapper.innerHTML = html;

  document.body.appendChild(wrapper);

  const context = wrapper.querySelector('.field');
  const input = context.querySelector('.js-autosuggest-input');
  const resultsContainer = context.querySelector('.js-autosuggest-results');
  const listbox = context.querySelector('.js-autosuggest-listbox');
  const status = context.querySelector('.js-autosuggest-aria-status');
  const form = context.closest('form');
  const container = context.querySelector('.autosuggest-input');
  const search = context.querySelector('.js-address-input__search');
  const APIDomain = container.getAttribute('data-api-domain');
  return {
    wrapper,
    context,
    input,
    resultsContainer,
    listbox,
    status,
    form,
    container,
    search,
    APIDomain,
  };
}
