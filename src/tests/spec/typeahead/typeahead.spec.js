import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/typeahead/_test-template.njk';
import '../../../scss/main.scss';
import TypeaheadUI from '../../../components/typeahead/typeahead.ui';
import eventMock from 'stubs/event.stub.spec';
import fetchMock from 'stubs/window.fetch.stub.spec';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSpies from 'chai-spies';

chai.should();
chai.use(chaiSpies);
chai.use(chaiAsPromised);

const params = {
  id: 'country-of-birth',
  label: {
    text: 'Enter the current name of the country',
  },
  instructions:
    'Use up and down keys to navigate suggestions once youve typed more than two characters. Use the enter key to select a suggestion. Touch device users, explore by touch or with swipe gestures.',
  content: {
    aria_you_have_selected: 'You have selected',
    aria_found_by_alternative_name: 'found by alternative name',
    aria_min_chars: 'Type in 2 or more characters for suggestions.',
    aria_one_result: 'There is one suggestion available.',
    aria_n_results: 'There are {n} suggestions available.',
    aria_limited_results: 'Results have been limited to 10 suggestions. Type more characters to refine your search.',
    more_results: 'Continue typing to refine suggestions',
    results_title: 'Suggestions',
  },
  autocomplete: 'off',
  apiUrl: 'https://ons-typeahead-prototypes.herokuapp.com/country-of-birth',
};

describe.only('Typeahead component', function() {
  before(function(done) {
    awaitPolyfills.then(() => {
      this.rewiremock = require('rewiremock/webpack').default;
      done();
    });
  });

  describe('Before the component initialises', function() {
    beforeEach(function() {
      const component = renderComponent(params);

      Object.keys(component).forEach(key => {
        this[key] = component[key];
      });
    });

    afterEach(function() {
      if (this.wrapper) {
        this.wrapper.remove();
      }
    });

    it('aria attributes should not present yet', function() {
      const inputHasAriaAttributes = !![...this.input.attributes].find(attribute => attribute.name.includes('aria'));
      expect(inputHasAriaAttributes).to.be.false;
      expect(this.input.hasAttribute('role')).to.be.false;
    });

    it('the autocomplete attribute should not present yet', function() {
      expect(this.input.hasAttribute('autocomplete')).to.be.false;
    });

    it('the instructions, listbox, and status should be display none', function() {
      expect(getComputedStyle(this.instructions).display).to.equal('none');
      expect(getComputedStyle(this.listbox).display).to.equal('none');
      expect(getComputedStyle(this.status).display).to.equal('none');
    });
  });

  describe('When the component initialises', function() {
    beforeEach(function() {
      const component = renderComponent(params);

      Object.keys(component).forEach(key => {
        this[key] = component[key];
      });

      this.typeahead = new TypeaheadUI({
        context: this.context,
        onSelect: () => {},
        onUnsetResult: () => {},
        onError: () => {},
      });
    });

    afterEach(function() {
      if (this.wrapper) {
        this.wrapper.remove();
      }
    });

    it('the input should be given the correct aria attributes', function() {
      expect(this.input.getAttribute('aria-autocomplete')).to.equal('list');
      expect(this.input.getAttribute('aria-controls')).to.equal(this.listbox.getAttribute('id'));
      expect(this.input.getAttribute('aria-describedby')).to.equal(this.instructions.getAttribute('id'));
      expect(this.input.getAttribute('aria-has-popup')).to.equal('true');
      expect(this.input.getAttribute('aria-owns')).to.equal(this.listbox.getAttribute('id'));
      expect(this.input.getAttribute('aria-expanded')).to.equal('false');
      expect(this.input.getAttribute('role')).to.equal('combobox');
    });

    it('the autocomplete attribute be set to match the data-autocomplete attribute', function() {
      expect(this.input.getAttribute('autocomplete')).to.equal(this.input.getAttribute('data-autocomplete'));
    });

    it('the instructions, listbox, and status should become visible', function() {
      expect(getComputedStyle(this.instructions).display).to.equal('block');
      expect(getComputedStyle(this.listbox).display).to.equal('block');
      expect(getComputedStyle(this.status).display).to.equal('block');
    });

    describe('and the user presses the Up Arrow key', function() {
      beforeEach(function() {
        this.mockedEvent = eventMock({ key: 'ArrowUp' });
        this.spy = chai.spy.on(this.typeahead, 'navigateResults');
        this.typeahead.handleKeydown(this.mockedEvent);
      });

      it('then preventDefault should be called on the event', function() {
        expect(this.mockedEvent.preventDefault).to.have.been.called();
      });

      it('then navigate results (up) should be called', function() {
        expect(this.spy).to.have.been.called.with.exactly(-1);
      });
    });

    describe('and the user presses the Down Arrow key', function() {
      beforeEach(function() {
        this.mockedEvent = eventMock({ key: 'ArrowDown' });
        this.spy = chai.spy.on(this.typeahead, 'navigateResults');
        this.typeahead.handleKeydown(this.mockedEvent);
      });

      it('then preventDefault should be called on the event', function() {
        expect(this.mockedEvent.preventDefault).to.have.been.called();
      });

      it('then navigate results (down) should be called', function() {
        expect(this.spy).to.have.been.called.with.exactly(1);
      });
    });

    describe('and the user presses the Enter key', function() {
      beforeEach(function() {
        this.mockedEvent = eventMock({ key: 'Enter' });
        this.typeahead.handleKeydown(this.mockedEvent);
      });

      it('then preventDefault should be called on the event', function() {
        expect(this.mockedEvent.preventDefault).to.have.been.called();
      });
    });

    describe('and the user presses any other key', function() {
      beforeEach(function() {
        this.mockedEvent = eventMock({ key: 'g' });
        this.typeahead.handleKeydown(this.mockedEvent);
      });

      it('then preventDefault should not have been called on the event', function() {
        expect(this.mockedEvent.preventDefault).to.not.have.been.called();
      });
    });

    describe('and the user releases the Up Arrow key', function() {
      beforeEach(function() {
        this.mockedEvent = eventMock({ key: 'ArrowUp' });
        this.typeahead.handleKeyup(this.mockedEvent);
      });

      it('then preventDefault should be called on the event', function() {
        expect(this.mockedEvent.preventDefault).to.have.been.called();
      });
    });

    describe('and the user releases the Down Arrow key', function() {
      beforeEach(function() {
        this.mockedEvent = eventMock({ key: 'ArrowDown' });
        this.typeahead.handleKeyup(this.mockedEvent);
      });

      it('then preventDefault should be called on the event', function() {
        expect(this.mockedEvent.preventDefault).to.have.been.called();
      });
    });

    describe('and the user presses the Enter key', function() {
      beforeEach(function() {
        this.mockedEvent = eventMock({ key: 'Enter' });
        this.spy = chai.spy.on(this.typeahead, 'selectResult');
        this.typeahead.handleKeyup(this.mockedEvent);
      });

      it('then navigate results (down) should be called', function() {
        expect(this.spy).to.have.been.called.with.exactly();
      });
    });

    describe('and the user focuses the input', function() {
      beforeEach(function() {
        this.suggestionSpy = chai.spy.on(this.typeahead, 'getSuggestions');
        this.originalClearTimout = window.clearTimeout;
        this.clearTimeoutSpy = chai.spy.on(window, 'clearTimeout');
        this.typeahead.handleFocus();
      });

      afterEach(function() {
        window.clearTimeout = this.originalClearTimout;
      });

      it('then getSuggestions should be called', function() {
        expect(this.suggestionSpy).to.have.been.called.with.exactly(true);
      });

      it('then the blurTimout should be cleared', function() {
        expect(this.clearTimeoutSpy).to.have.been.called.with.exactly(this.typeahead.blurTimeout);
      });
    });

    describe('and the user blurs the input', function() {
      beforeEach(function() {
        this.suggestionSpy = chai.spy.on(this.typeahead, 'getSuggestions');
        this.originalClearTimout = window.clearTimeout;
        this.clearTimeoutSpy = chai.spy.on(window, 'clearTimeout');
        this.originalSetTimout = window.setTimeout;
        this.setTimeoutSpy = chai.spy.on(window, 'setTimeout');
        this.blurTimeout = this.typeahead.blurTimeout;
        this.typeahead.handleBlur();
      });

      afterEach(function() {
        window.clearTimeout = this.originalClearTimout;
        window.setTimeout = this.originalSetTimout;
      });

      it('then the blurTimout should be cleared', function() {
        expect(this.clearTimeoutSpy).to.have.been.called.with.exactly(this.blurTimeout);
      });

      it('then blurring should be set to true', function() {
        expect(this.typeahead.blurring).to.be.true;
      });

      it('then the blur timeout should be reset', function() {
        expect(this.setTimeoutSpy).to.have.been.called();
      });
    });

    describe('and the user inputs', function() {
      beforeEach(function() {
        this.getSuggestionsSpy = chai.spy.on(this.typeahead, 'getSuggestions');
        this.abortFetchSpy = chai.spy.on(this.typeahead, 'abortFetch');
      });

      describe('if the input is not currently blurring and the input has a value', function() {
        beforeEach(function(done) {
          this.typeahead.blurring = false;
          this.typeahead.input.value = 'Test test test';

          setTimeout(() => {
            this.typeahead.handleChange();
            done();
          });
        });

        it('then getSuggestions should be called', function() {
          expect(this.getSuggestionsSpy).to.have.been.called();
        });
      });

      describe('if the input is not currently blurring and the input does not have a value', function() {
        beforeEach(function(done) {
          this.typeahead.blurring = false;

          setTimeout(() => {
            this.typeahead.handleChange();
            done();
          });
        });

        it('then abortFetch should be called', function() {
          expect(this.abortFetchSpy).to.have.been.called();
        });
      });

      describe('if the input is currently blurring and the input has a value', function() {
        beforeEach(function(done) {
          this.typeahead.blurring = true;
          this.typeahead.input.value = 'Test test test';

          setTimeout(() => {
            this.typeahead.handleChange();
            done();
          });
        });

        it('then abortFetch should be called', function() {
          expect(this.abortFetchSpy).to.have.been.called();
        });
      });

      describe('if the input is currently blurring and the input does not have a value', function() {
        beforeEach(function(done) {
          this.typeahead.blurring = true;

          setTimeout(() => {
            this.typeahead.handleChange();
            done();
          });
        });

        it('then abortFetch should be called', function() {
          expect(this.abortFetchSpy).to.have.been.called();
        });
      });
    });

    describe('and suggestions are requested', function() {
      beforeEach(function() {
        this.unsetResultsSpy = chai.spy.on(this.typeahead, 'unsetResults');
        this.setAriaStatusSpy = chai.spy.on(this.typeahead, 'setAriaStatus');
        this.fetchSuggestionsSpy = chai.spy.on(this.typeahead, 'fetchSuggestions');
        this.clearListboxSpy = chai.spy.on(this.typeahead, 'clearListbox');
        this.handleResultsSpy = chai.spy.on(this.typeahead, 'handleResults');
        this.onErrorSpy = chai.spy.on(this.typeahead, 'onError');
      });

      describe('if a result is being set', function() {
        beforeEach(function() {
          this.typeahead.settingResult = true;
          this.typeahead.getSuggestions();
        });

        getSuggestionsNothingRunTests();
      });

      describe('if the query hasnt changed', function() {
        beforeEach(function() {
          this.typeahead.getSuggestions();
        });

        getSuggestionsNothingRunTests();
      });

      describe('if the query hasnt changed but force is set to true', function() {
        beforeEach(function() {
          this.typeahead.getSuggestions(true);
        });

        it('then the results should be unset', function() {
          expect(this.unsetResultsSpy).to.have.been.called();
        });

        it('then the aria status should be set', function() {
          expect(this.setAriaStatusSpy).to.have.been.called();
        });
      });

      describe('if the query hasnt changed but force is set to true and a result is selected', function() {
        beforeEach(function() {
          this.typeahead.resultSelected = true;
          this.typeahead.getSuggestions(true);
        });

        getSuggestionsNothingRunTests();
      });

      describe('if the query has changed', function() {
        beforeEach(function(done) {
          this.input.value = 'Test';

          setTimeout(() => {
            this.typeahead.getSuggestions();
            done();
          });
        });

        it('then the results should be unset', function() {
          expect(this.unsetResultsSpy).to.have.been.called();
        });

        it('then the aria status should be set', function() {
          expect(this.setAriaStatusSpy).to.have.been.called();
        });
      });

      describe('if the query is shorter than the minimum characters', function() {
        beforeEach(function(done) {
          this.input.value = 'T';

          setTimeout(() => {
            this.typeahead.getSuggestions();
            done();
          });
        });

        it('then the listbox should be cleared', function() {
          expect(this.clearListboxSpy).to.have.been.called();
        });
      });

      describe('if the query is equal to or longer than the minimum characters', function() {
        beforeEach(function(done) {
          this.input.value = 'Testing';

          setTimeout(() => {
            this.typeahead.getSuggestions();
            done();
          });
        });

        it('then the fetchSuggestions should be called', function() {
          expect(this.fetchSuggestionsSpy).to.have.been.called.with('testing');
        });
      });

      describe('if fetch suggestion returns results', function() {
        beforeEach(function(done) {
          this.input.value = 'Testing';

          this.typeahead.fetchSuggestions = () => {
            return new Promise(resolve => {
              resolve(this.result);
            });
          };

          this.typeahead.getSuggestions();

          setTimeout(done);
        });

        it('then handleResults should be called', function() {
          expect(this.handleResultsSpy).to.have.been.called();
        });
      });

      describe('if fetch suggestion due to an abort error', function() {
        beforeEach(function(done) {
          this.input.value = 'Testing';

          this.typeahead.fetchSuggestions = () => {
            return new Promise((resolve, reject) => {
              reject({
                name: 'AbortError',
              });
            });
          };

          this.typeahead.getSuggestions();

          setTimeout(done);
        });

        it('then onError shouldnt be called', function() {
          expect(this.onErrorSpy).to.not.have.been.called();
        });
      });

      describe('if fetch suggestion due to any other error', function() {
        beforeEach(function(done) {
          this.input.value = 'Testing';

          this.typeahead.fetchSuggestions = () => {
            return new Promise((resolve, reject) => {
              reject({
                name: 'Error',
              });
            });
          };

          this.typeahead.getSuggestions();

          setTimeout(done);
        });

        it('then onError should be called', function() {
          expect(this.onErrorSpy).to.have.been.called();
        });
      });
    });

    describe('and results are fetched', function() {
      beforeEach(function() {
        this.abortFetchSpy = chai.spy.on(this.typeahead, 'abortFetch');
        this.originalFetch = window.fetch;
      });

      afterEach(function() {
        window.fetch = this.originalFetch;
      });

      it('any running fetches should be aborted', function() {
        this.typeahead.fetchSuggestions('yes');
        expect(this.abortFetchSpy).to.have.been.called();
      });

      describe('but the fetch errors', function() {
        beforeEach(function() {
          window.fetch = fetchMock(false);
        });

        it('then the function should reject', function() {
          return this.typeahead.fetchSuggestions('yes').should.be.rejected;
        });
      });

      describe('and the fetch successfully returns', function() {
        beforeEach(function() {
          this.result = {
            results: [{ 'en-gb': 'yes', alternatives: [], sanitisedAlternatives: [] }],
            totalResults: 1,
          };

          window.fetch = fetchMock(true, null, this.result);
        });

        it('then the function should resolve', function() {
          return this.typeahead.fetchSuggestions('yes').should.eventually.eql(this.result);
        });
      });

      describe('and the fetch successfully returns welsh results found from english names', function() {
        beforeEach(function() {
          this.result = {
            results: [{ 'en-gb': 'Yes', cy: 'ie', alternatives: ['Yes'], sanitisedAlternatives: ['yes'] }],
            totalResults: 1,
          };

          this.typeahead.lang = 'cy';

          window.fetch = fetchMock(true, null, this.result);
        });

        it('then the function should resolve', function() {
          return this.typeahead.fetchSuggestions('yes').should.eventually.eql(this.result);
        });
      });
    });
  });

  describe('When the fetch is aborted', function() {
    beforeEach(function() {
      // Mock
      this.originalFetch = window.fetch;

      window.fetch = fetchMock(true);

      this.fetchSpy = chai.spy(require('js/abortable-fetch').default);

      this.rewiremock('./src/js/abortable-fetch')
        .es6()
        .withDefault(this.fetchSpy);

      this.rewiremock.enable();

      const mockedTypeaheadUI = require('components/typeahead/typeahead.ui').default;

      // Render
      const component = renderComponent(params);

      // Initialise
      Object.keys(component).forEach(key => {
        this[key] = component[key];
      });

      this.typeahead = new mockedTypeaheadUI({
        context: this.context,
        onSelect: () => {},
        onUnsetResult: () => {},
        onError: () => {},
      });
    });

    afterEach(function() {
      window.fetch = this.originalFetch;
      this.rewiremock.disable();
      this.wrapper.remove();
    });

    describe('and fetch is not defined', function() {
      beforeEach(function() {
        this.typeahead.abortFetch();
      });

      it('then the function should return immediately', function() {
        expect(this.fetchSpy).to.not.have.been.called();
      });
    });

    describe('and fetch is defined but the status is equal to DONE', function() {
      beforeEach(function() {
        this.typeahead.fetch = this.fetchSpy()
          .then(() => {})
          .catch(() => {});
        this.typeahead.fetch.status = 'DONE';
        this.abortSpy = chai.spy.on(this.typeahead.fetch, 'abort');
        this.typeahead.abortFetch();
      });

      it('then the function should return immediately', function() {
        expect(this.abortSpy).to.not.have.been.called();
      });
    });

    describe('and fetch is defined but the status is equal not to DONE', function() {
      beforeEach(function() {
        this.typeahead.fetch = this.fetchSpy()
          .then(() => {})
          .catch(() => {});
        this.abortSpy = chai.spy.on(this.typeahead.fetch, 'abort');
        this.typeahead.abortFetch();
      });

      it('then the function should return immediately', function() {
        expect(this.abortSpy).to.have.been.called();
      });
    });
  });
});

function renderComponent(params) {
  const html = template.render({ params });

  const wrapper = document.createElement('div');

  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const context = wrapper.querySelector('.js-typeahead');
  const input = context.querySelector('.js-typeahead-input');
  const resultsContainer = context.querySelector('.js-typeahead-results');
  const listbox = context.querySelector('.js-typeahead-listbox');
  const instructions = context.querySelector('.js-typeahead-instructions');
  const status = context.querySelector('.js-typeahead-aria-status');

  return {
    wrapper,
    context,
    input,
    resultsContainer,
    listbox,
    instructions,
    status,
  };
}

function getSuggestionsNothingRunTests() {
  it('then the function should return immediately without running anything else', function() {
    expect(this.unsetResultsSpy).to.not.have.been.called();
    expect(this.setAriaStatusSpy).to.not.have.been.called();
    expect(this.fetchSuggestionsSpy).to.not.have.been.called();
    expect(this.clearListboxSpy).to.not.have.been.called();
    expect(this.handleResultsSpy).to.not.have.been.called();
    expect(this.onErrorSpy).to.not.have.been.called();
  });
}
