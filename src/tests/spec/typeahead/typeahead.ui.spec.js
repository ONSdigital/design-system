import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/typeahead/_test-template.njk';
import '../../../scss/main.scss';
import TypeaheadUI, {
  classTypeaheadOption,
  classTypeaheadOptionFocused,
  classTypeaheadOptionNoResults,
  classTypeaheadOptionMoreResults,
  classTypeaheadHasResults,
} from '../../../components/typeahead/typeahead.ui';
import eventMock from 'stubs/event.stub.spec';
import fetchMock from 'stubs/window.fetch.stub.spec';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSpies from 'chai-spies';

chai.should();
chai.use(chaiSpies);
chai.use(chaiAsPromised);

const data =
  "[Object{code: 4, en-gb: 'Afghanistan', cy: 'Afghanistan'}, Object{code: 248, en-gb: 'Aland islands', cy: 'ynysoedd Aland'}, Object{code: 8, en-gb: 'Albania', cy: 'Albania'}, Object{code: 12, en-gb: 'Algeria', cy: 'Algeria'}, Object{code: 16, en-gb: 'American samoa', cy: 'Samoa Americanaidd'}, Object{code: 20, en-gb: 'Andorra', cy: 'andorra'}, Object{code: 24, en-gb: 'Angola', cy: 'Angola'}, Object{code: 660, en-gb: 'Anguilla', cy: 'anguilla'}, Object{code: 10, en-gb: 'Antarctica', cy: 'Antarctica'}]";

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
    no_results: 'No results found',
  },
  autocomplete: 'off',
  typeaheadData:
    'https://gist.githubusercontent.com/rmccar/c123023fa6bd1b137d7f960c3ffa1fed/raw/368a3ea741f72c62c735c319ff7e33e3c1bfdc53/country-of-birth.json',
};

describe('Typeahead.ui component', function() {
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
        onSelect: async () => {},
        onUnsetResult: async () => {},
        onError: async () => {},
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
      });

      afterEach(function() {
        window.clearTimeout = this.originalClearTimout;
        window.setTimeout = this.originalSetTimout;
      });

      it('then the blurTimout should be cleared', function() {
        this.typeahead.handleBlur();

        expect(this.clearTimeoutSpy).to.have.been.called.with.exactly(this.blurTimeout);
      });

      it('then blurring should be set to true', function() {
        this.typeahead.handleBlur();

        expect(this.typeahead.blurring).to.be.true;
      });

      it('then the blur timeout should be reset', function() {
        this.typeahead.handleBlur();

        expect(this.setTimeoutSpy).to.have.been.called();
      });

      it('bluring should be set to true and then false 300ms later', function(done) {
        this.typeahead.handleBlur();

        expect(this.typeahead.blurring).to.be.true;

        setTimeout(() => {
          expect(this.typeahead.blurring).to.be.false;
          done();
        }, 300);
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
            this.typeahead.fetchSuggestions(this.input.value, data);
            done();
          });
        });

        it('then the fetchSuggestions should be called', function() {
          expect(this.fetchSuggestionsSpy).to.have.been.called();
        });
      });

      describe('if fetch suggestion returns results', function() {
        beforeEach(function() {
          this.input.value = 'Testing';
          this.typeahead.handleResults({
            totalResults: 1,
            results: [
              {
                'en-gb': 'Testing',
                sanitisedText: 'testing',
              },
            ],
          });
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
          this.typeahead.fetchSuggestions('yes').should.eventually.eql(this.result);
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
          this.typeahead.fetchSuggestions('yes').should.eventually.eql(this.result);
        });
      });
    });

    describe('and results are unset', function() {
      beforeEach(function() {
        this.typeahead.results = [{ 'en-gb': 'yes' }];
        this.typeahead.resultOptions = ['<option>yes</option>'];
        this.typeahead.resultSelected = true;
      });

      it('then results should be reset to an empty array', function() {
        this.typeahead.unsetResults();
        expect(this.typeahead.results).to.eql([]);
      });

      it('then resultOptions should be reset to an empty array', function() {
        this.typeahead.unsetResults();
        expect(this.typeahead.resultOptions).to.eql([]);
      });

      it('then resultSelected should be reset to false', function() {
        this.typeahead.unsetResults();
        expect(this.typeahead.resultSelected).to.be.false;
      });

      describe('and onUnsetResult is set', function() {
        beforeEach(function() {
          this.typeahead.onUnsetResult = chai.spy(() => {});
        });

        it('then onUnsetResult should be called', function() {
          this.typeahead.unsetResults();
          expect(this.typeahead.onUnsetResult).to.have.been.called();
        });
      });
    });

    describe('and clearListbox is run', function() {
      beforeEach(function() {
        this.typeahead.listbox.innerHTML = '<p>Yes</p>';
        this.typeahead.context.classList.add('typeahead--has-results');
        this.typeahead.input.setAttribute('aria-activedescendant', 'yes');
        this.typeahead.input.setAttribute('aria-expanded', 'true');

        this.setAriaStatusSpy = chai.spy.on(this.typeahead, 'setAriaStatus');
      });

      it('then the listbox innerHTML should be cleared', function() {
        this.typeahead.clearListbox();
        expect(this.typeahead.listbox.innerHTML).to.equal('');
      });

      it('then the typeahead--has-results should be removed', function() {
        this.typeahead.clearListbox();
        expect(this.typeahead.context.classList.contains('typeahead--has-results')).to.be.false;
      });

      it('then the input aria-activedescendant attributes should be removed', function() {
        this.typeahead.clearListbox();
        expect(this.typeahead.input.hasAttribute('aria-activedescendant')).to.be.false;
      });

      it('then the input aria-expanded attributes should be removed', function() {
        this.typeahead.clearListbox();
        expect(this.typeahead.input.hasAttribute('aria-expanded')).to.be.false;
      });

      it('then setAriaStatus should be called', function() {
        this.typeahead.clearListbox();
        expect(this.setAriaStatusSpy).to.have.been.called();
      });

      describe('and preventAriaStatusUpdate is set to true', function() {
        it('then setAriaStatus should not be called', function() {
          this.typeahead.clearListbox(true);
          expect(this.setAriaStatusSpy).to.not.have.been.called();
        });
      });
    });

    describe('and navigateResults is run', function() {
      beforeEach(function() {
        this.typeahead.numberOfResults = 3;
        this.setHighlightedResultSpy = chai.spy.on(this.typeahead, 'setHighlightedResult');
      });

      describe('and the direction is 1', function() {
        describe('and the highlightedResultIndex is not set', function() {
          beforeEach(function() {
            this.typeahead.highlightedResultIndex = null;
          });

          it('then setHighlightedResult should be called with an index of 0', function() {
            this.typeahead.navigateResults(1);

            expect(this.setHighlightedResultSpy).to.have.been.called.with.exactly(0);
          });
        });

        describe('and the highlightedResultIndex is 0', function() {
          it('then setHighlightedResult should be called with the next index', function() {
            this.typeahead.navigateResults(1);

            expect(this.setHighlightedResultSpy).to.have.been.called.with.exactly(1);
          });
        });

        describe('and the highlightedResultIndex is the same as the number of results', function() {
          beforeEach(function() {
            this.typeahead.highlightedResultIndex = 2;
          });

          it('then setHighlightedResult should not be called', function() {
            this.typeahead.navigateResults(1);

            expect(this.setHighlightedResultSpy).to.not.have.been.called();
          });
        });
      });

      describe('and the direction is -1', function() {
        describe('and the highlightedResultIndex is not set', function() {
          beforeEach(function() {
            this.typeahead.highlightedResultIndex = null;
          });

          it('then setHighlightedResult should be called with an index of 0', function() {
            this.typeahead.navigateResults(-1);

            expect(this.setHighlightedResultSpy).to.have.been.called.with.exactly(0);
          });
        });

        describe('and the highlightedResultIndex is 0', function() {
          it('then setHighlightedResult should be called with null', function() {
            this.typeahead.navigateResults(-1);

            expect(this.setHighlightedResultSpy).to.have.been.called.with.exactly(null);
          });
        });

        describe('and the highlightedResultIndex is the same as the number of results', function() {
          beforeEach(function() {
            this.typeahead.highlightedResultIndex = 2;
          });

          it('then setHighlightedResult should be called with the previous index', function() {
            this.typeahead.navigateResults(-1);

            expect(this.setHighlightedResultSpy).to.have.been.called.with.exactly(1);
          });
        });
      });
    });

    describe('and the mouse moves over a result', function() {
      beforeEach(function() {
        this.typeahead.highlightedResultIndex = 0;
        this.typeahead.resultOptions = [1].map(() => {
          const option = document.createElement('option');
          option.className = classTypeaheadOptionFocused;

          return option;
        });

        this.typeahead.handleMouseover();
      });

      it(`then the highlighted option's ${classTypeaheadOptionFocused} class should be removed`, function() {
        expect(this.typeahead.resultOptions[0].classList.contains(classTypeaheadOptionFocused)).to.be.false;
      });
    });

    describe('and the mouse moves off a result', function() {
      beforeEach(function() {
        this.typeahead.highlightedResultIndex = 0;
        this.typeahead.resultOptions = [1].map(() => {
          const option = document.createElement('option');

          return option;
        });

        this.typeahead.handleMouseout();
      });

      it(`then the highlighted option's ${classTypeaheadOptionFocused} class should be added`, function() {
        expect(this.typeahead.resultOptions[0].classList.contains(classTypeaheadOptionFocused)).to.be.true;
      });
    });

    describe('and the highlighted result is set', function() {
      beforeEach(function() {
        this.typeahead.input.setAttribute('aria-activedescendant', 'yes');
        this.setAriaStatusSpy = chai.spy.on(this.typeahead, 'setAriaStatus');
      });

      it('then the highlightedResultsIndex should be set to match the passed index', function() {
        this.typeahead.setHighlightedResult(1);
        expect(this.typeahead.highlightedResultIndex).to.equal(1);
      });

      describe('if the index passed is null', function() {
        beforeEach(function() {
          this.typeahead.setHighlightedResult(null);
        });

        it('then the aria-activedescendant attribute should be removed from the input', function() {
          expect(this.typeahead.input.hasAttribute('aria-activedescendant')).to.be.false;
        });
      });

      describe('if there are no results', function() {
        it('then the function should return without running anything', function() {
          expect(this.setAriaStatusSpy).to.not.have.been.called();
        });
      });

      describe('if there are results', function() {
        beforeEach(function() {
          this.optionIndex = 1;
          this.typeahead.resultOptions = [0, 1, 2].map(item => {
            const option = document.createElement('option');
            option.id = item;

            return option;
          });
          this.typeahead.numberOfResults = this.typeahead.resultOptions.length;
          this.typeahead.setHighlightedResult(this.optionIndex);
        });

        it('the option with the same index as the passed index should be given a highlighted class', function() {
          expect(this.typeahead.resultOptions[this.optionIndex].classList.contains(classTypeaheadOptionFocused)).to.be.true;
        });

        it('the option with the same index as the passed index should be given an aria-selected attribute', function() {
          expect(this.typeahead.resultOptions[this.optionIndex].getAttribute('aria-selected')).to.equal('true');
        });

        it('the inputs aria-activedescendant attribute should be set to the id of the highlighted option', function() {
          expect(this.typeahead.input.getAttribute('aria-activedescendant')).to.equal(this.optionIndex.toString());
        });

        it('the non highlighted options should not have the focused class', function() {
          this.typeahead.resultOptions
            .filter((option, index) => index !== this.optionIndex)
            .forEach(option => {
              expect(option.classList.contains(classTypeaheadOptionFocused)).to.be.false;
            });
        });

        it('the non highlighted options should not have an aria-selected attribute', function() {
          this.typeahead.resultOptions
            .filter((option, index) => index !== this.optionIndex)
            .forEach(option => {
              expect(option.hasAttribute('aria-selected')).to.be.false;
            });
        });

        it('setAriaStatus should be called', function() {
          expect(this.setAriaStatusSpy).to.have.been.called();
        });
      });
    });

    describe('and the aria status is set', function() {
      beforeEach(function() {
        this.typeahead.ariaStatus.innerHTML = 'Yes';
        this.typeahead.minChars = 2;
      });

      describe('if there is no content provided as an argument', function() {
        describe('and the query is too short', function() {
          beforeEach(function() {
            this.typeahead.sanitisedQuery = '';
            this.typeahead.setAriaStatus();
          });

          it('then the message should be set to type the minimum amount of characters', function() {
            expect(this.typeahead.ariaStatus.innerHTML).to.equal(params.content.aria_min_chars);
          });
        });

        describe('and there are no results', function() {
          beforeEach(function() {
            this.typeahead.query = 'Yes';
            this.typeahead.sanitisedQuery = 'yes';
            this.typeahead.numberOfResults = 0;
            this.typeahead.setAriaStatus();
          });

          it('then the no results message should be set', function() {
            expect(this.typeahead.ariaStatus.innerHTML).to.equal(`${params.content.aria_no_results}: "${this.typeahead.query}"`);
          });
        });

        describe('and there is one result', function() {
          beforeEach(function() {
            this.typeahead.sanitisedQuery = 'yes';
            this.typeahead.numberOfResults = 1;
            this.typeahead.setAriaStatus();
          });

          it('then the one result message should be set', function() {
            expect(this.typeahead.ariaStatus.innerHTML).to.equal(params.content.aria_one_result);
          });
        });

        describe('and there are multiple results', function() {
          beforeEach(function() {
            this.typeahead.sanitisedQuery = 'yes';
            this.typeahead.numberOfResults = 3;
            this.typeahead.setAriaStatus();
          });

          it('then the multiple results message should be set', function() {
            expect(this.typeahead.ariaStatus.innerHTML).to.equal(
              params.content.aria_n_results.replace('{n}', this.typeahead.numberOfResults),
            );
          });
        });

        describe('and there are more results found than returned', function() {
          beforeEach(function() {
            this.typeahead.sanitisedQuery = 'yes';
            this.typeahead.numberOfResults = 3;
            this.typeahead.resultLimit = 10;
            this.typeahead.foundResults = 11;
            this.typeahead.setAriaStatus();
          });

          it('then the multiple results message should be set', function() {
            expect(this.typeahead.ariaStatus.innerHTML).to.equal(
              `${params.content.aria_n_results.replace('{n}', this.typeahead.numberOfResults)} ${params.content.aria_limited_results}`,
            );
          });
        });
      });

      describe('if there content provided as an argument', function() {
        beforeEach(function() {
          this.typeahead.setAriaStatus('Hello');
        });

        it('then the aria status should be set to the provided content', function() {
          expect(this.typeahead.ariaStatus.innerHTML).to.equal('Hello');
        });
      });
    });

    describe('and a result is selected', function() {
      beforeEach(function() {
        this.onSelectSpy = chai.spy.on(this.typeahead, 'onSelect');
        this.clearListboxSpy = chai.spy.on(this.typeahead, 'clearListbox');
        this.setAriaStatusSpy = chai.spy.on(this.typeahead, 'setAriaStatus');
      });

      describe('if there are no results', function() {
        beforeEach(function() {
          this.typeahead.selectResult(0);
        });

        it('then the function should do nothing', function() {
          expect(this.onSelectSpy).to.not.have.been.called();
          expect(this.clearListboxSpy).to.not.have.been.called();
          expect(this.setAriaStatusSpy).to.not.have.been.called();
        });
      });

      describe('if there are results', function() {
        beforeEach(function() {
          this.typeahead.sanitisedQuery = 'ye';
          this.typeahead.results = [{ 'en-gb': 'Yes', sanitisedText: 'yes', sanitisedAlternatives: ['ie'], alternatives: ['Ie'] }];
          this.typeahead.selectResult(0);
        });

        it('then resultSelected should be set to true', function() {
          expect(this.typeahead.resultSelected).to.be.true;
        });

        it('then onSelect should be called', function() {
          expect(this.onSelectSpy).to.have.been.called();
        });

        it('then clearListbox should be called', function() {
          expect(this.clearListboxSpy).to.have.been.called();
        });

        it('then setAriaStatus should be called', function() {
          expect(this.setAriaStatusSpy).to.have.been.called.with.exactly(`${params.content.aria_you_have_selected}: Yes.`);
        });
      });

      describe('if there are results from an alternative', function() {
        beforeEach(function() {
          this.typeahead.sanitisedQuery = 'ie';
          this.typeahead.results = [{ 'en-gb': 'Yes', sanitisedText: 'yes', sanitisedAlternatives: ['ie'], alternatives: ['Ie'] }];
          this.typeahead.selectResult(0);
        });

        it('then setAriaStatus should be called stating the result was found from the alternative', function() {
          expect(this.setAriaStatusSpy).to.have.been.called.with.exactly(`${params.content.aria_you_have_selected}: Ie.`);
        });
      });
    });

    describe('and a result is emboldened', function() {
      describe('if the provided string includes the provided query', function() {
        it('then the match should be wrapped in strong tags', function() {
          expect(this.typeahead.emboldenMatch('Aberdaugleddau', 'ABER')).to.equal('<strong>Aber</strong>daugleddau');
        });
      });

      describe('if the provided string does not include the provided query', function() {
        it('then the string should bre returned unmodified', function() {
          expect(this.typeahead.emboldenMatch('yes', 'no')).to.equal('yes');
        });
      });
    });

    describe('and results are handled', function() {
      describe('if the user is currently deleting and there are no results', function() {
        beforeEach(function() {
          this.typeahead.deleting = true;
        });

        describe('if there is "no results" content', function() {
          beforeEach(function() {
            this.typeahead.handleResults({
              totalResults: 0,
              results: [],
            });
          });

          it('then the listbox innerHTML should show the no results message', function() {
            expect(this.typeahead.listbox.innerHTML).to.equal(
              `<li class="${classTypeaheadOption} ${classTypeaheadOptionNoResults}">${params.content.no_results}</li>`,
            );
          });

          it('then the input aria-expanded attribute should be set to true', function() {
            expect(this.typeahead.input.getAttribute('aria-expanded')).to.equal('true');
          });

          it('then the context should not have the found results class', function() {
            expect(this.context.classList.contains(classTypeaheadHasResults)).to.be.false;
          });
        });

        describe('if there isnt any "no results" content', function() {
          beforeEach(function() {
            this.typeahead.content.no_results = null;
            this.typeahead.handleResults({
              totalResults: 0,
              results: [],
            });
          });

          it('then the listbox innerHTML should not be populated', function() {
            expect(this.typeahead.listbox.innerHTML).to.equal('');
          });

          it('then the input aria-expanded attribute should be set to false', function() {
            expect(this.typeahead.input.getAttribute('aria-expanded')).to.equal('false');
          });
        });
      });

      describe('if there are results', function() {
        describe('and there is only one result that exactly matches the user input', function() {
          beforeEach(function() {
            this.clearListboxSpy = chai.spy.on(this.typeahead, 'clearListbox');
            this.selectResultSpy = chai.spy.on(this.typeahead, 'selectResult');

            this.typeahead.query = 'Yes';
            this.typeahead.sanitisedQuery = 'yes';
            this.typeahead.handleResults({
              totalResults: 1,
              results: [
                {
                  'en-gb': 'Yes',
                  sanitisedText: 'yes',
                },
              ],
            });
          });

          it('then clearListbox should be be called with preventAriaStatusUpdate set to true', function() {
            expect(this.clearListboxSpy).to.have.been.called.with.exactly(true);
          });

          it('then selectResult should be be called with an index of 0', function() {
            expect(this.selectResultSpy).to.have.been.called.with.exactly(0);
          });
        });

        describe('if there is more than one result', function() {
          beforeEach(function() {
            this.setHighlightedResultSpy = chai.spy.on(this.typeahead, 'setHighlightedResult');

            this.typeahead.query = 'Yes';
            this.typeahead.sanitisedQuery = 'yes';
            this.typeahead.handleResults({
              totalResults: 2,
              results: [
                {
                  'en-gb': 'Yes',
                  sanitisedText: 'yes',
                },
                {
                  'en-gb': 'Yes 2',
                  sanitisedText: 'yes 2',
                },
                {
                  'en-gb': 'Ie',
                  sanitisedText: 'Ie',
                  sanitisedAlternatives: ['yes'],
                  alternatives: ['Yes'],
                },
              ],
            });
          });

          it('then resultOptions should be generated', function() {
            const option1 = `<li class="${classTypeaheadOption}" id="${this.typeahead.listboxId}__option--0" role="option" aria-label="Yes"><strong>Yes</strong></li>`;
            const option2 = `<li class="${classTypeaheadOption}" id="${this.typeahead.listboxId}__option--1" role="option" aria-label="Yes 2"><strong>Yes</strong> 2</li>`;
            const option3 = `<li class="${classTypeaheadOption}" id="${this.typeahead.listboxId}__option--2" role="option" aria-label="Ie, (Yes)">Ie <small>(<strong>Yes</strong>)</small></li>`;
            const html = option1 + option2 + option3;

            expect(this.typeahead.listbox.innerHTML).to.equal(html);
          });

          it('then setHighlighted result should be called with null', function() {
            expect(this.setHighlightedResultSpy).to.have.been.called.with.exactly(null);
          });

          it('then aria-expanded should be true on the input', function() {
            expect(this.typeahead.input.getAttribute('aria-expanded')).to.equal('true');
          });

          describe('when a result is clicked', function() {
            beforeEach(function() {
              this.selectResultSpy = chai.spy.on(this.typeahead, 'onSelect');
              this.typeahead.resultOptions[0].click();
            });

            it('then selectResult should be called', function() {
              expect(this.selectResultSpy).to.have.been.called();
            });
          });
        });

        describe('if there are more results found than returned', function() {
          beforeEach(function() {
            this.typeahead.query = 'Yes';
            this.typeahead.sanitisedQuery = 'yes';
            this.typeahead.handleResults({
              totalResults: 3,
              results: [
                {
                  'en-gb': 'Yes',
                  sanitisedText: 'yes',
                },
                {
                  'en-gb': 'Yes',
                  sanitisedText: 'yes',
                },
              ],
            });
          });

          it('then the more results item should be added', function() {
            const option1 = `<li class="${classTypeaheadOption}" id="${this.typeahead.listboxId}__option--0" role="option" aria-label="Yes"><strong>Yes</strong></li>`;
            const option2 = `<li class="${classTypeaheadOption}" id="${this.typeahead.listboxId}__option--1" role="option" aria-label="Yes"><strong>Yes</strong></li>`;
            const option3 = `<li class="${classTypeaheadOption} ${classTypeaheadOptionMoreResults}" aria-hidden="true">${params.content.more_results}</li>`;
            const html = option1 + option2 + option3;

            expect(this.typeahead.listbox.innerHTML).to.equal(html);
          });

          it('then the context should be given the has results class', function() {
            expect(this.context.classList.contains(classTypeaheadHasResults)).to.be.true;
          });
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

      if (this.wrapper) {
        this.wrapper.remove();
      }
    });

    describe('and fetch is not defined', function() {
      beforeEach(function() {
        this.typeahead.fetch = this.fetchSpy()
          .then(() => {})
          .catch(() => {});
        this.typeahead.fetch.status = 'undefined';
        this.abortSpy = chai.spy.on(this.typeahead.fetch, 'abort');
        this.typeahead.abortFetch();
      });

      it('then the function should return immediately', function() {
        expect(this.abortSpy).to.have.been.called();
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

  describe('When the component initialises with a custom suggestion function', function() {
    beforeEach(function() {
      const component = renderComponent(params);

      Object.keys(component).forEach(key => {
        this[key] = component[key];
      });

      this.customSuggestionFunctionSpy = chai.spy(async () => {});

      this.typeahead = new TypeaheadUI({
        context: this.context,
        onSelect: async () => {},
        onUnsetResult: async () => {},
        onError: async () => {},
        suggestionFunction: this.customSuggestionFunctionSpy,
      });
    });

    afterEach(function() {
      if (this.wrapper) {
        this.wrapper.remove();
      }
    });

    describe('when getSuggestions is called', function() {
      beforeEach(function() {
        this.input.value = 'Yes';

        this.typeahead.fetchSuggestions();
      });

      it('then the custom suggeston function should be called', function() {
        expect(this.customSuggestionFunctionSpy).to.have.been.called();
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
