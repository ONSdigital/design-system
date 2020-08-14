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

    describe('When the API status is checked', function() {
      beforeEach(function(done) {
        this.autosuggestAddress.checkAPIStatus = chai.spy(this.autosuggestAddress.checkAPIStatus);
        this.autosuggestAddress.checkAPIStatus();
        done();
      });

      it('then checkAPIStatus function should be called', function() {
        expect(this.autosuggestAddress.checkAPIStatus).to.have.been.called();
      });

      describe('When the API is unavilable', function() {
        beforeEach(function(done) {
          this.autosuggestAddress.handleAPIError = chai.spy(this.autosuggestAddress.handleAPIError);
          this.autosuggestAddress.handleAPIError();
          done();
        });

        it('then handleAPIError function should be called', function() {
          expect(this.autosuggestAddress.handleAPIError).to.have.been.called();
        });
      });
    });

    // describe('and the api status is checked', function() {
    //   beforeEach(function() {
    //     this.checkAPIStatusSpy = chai.spy.on(this.autosuggestAddress, 'checkAPIStatus');
    //   });

    //   it('then the api should return a 200', function() {
    //     console.log(this.autosuggestAddress);
    //     expect(this.checkAPIStatusSpy).to.have.been.called();
    //   });
    // });

    // describe('and the user inputs', function() {
    //   beforeEach(function() {
    //     this.suggestAddressesSpy = chai.spy.on(this.autosuggestAddress, 'suggestAddresses');
    //   });

    //   describe('then addresses should be fetched', function() {
    //     beforeEach(function() {
    //       this.autosuggestAddress.input.value = '195 colle';
    //     });

    //     it('then suggestAddresses should be called', function() {
    //       // expect(this.suggestAddressesSpy).to.have.been.called();
    //     });
    //   });
    // });
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
