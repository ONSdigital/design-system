/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_AUTOSUGGEST = {
  id: 'country-of-birth',
  input: {
    label: {
      text: 'Current name of country',
      description: 'Enter your own answer or select from suggestions',
      id: 'country-of-birth-label',
      classes: 'extra-label-class',
    },
    autocomplete: 'off',
  },
  instructions: 'Use up and down keys to navigate.',
  ariaYouHaveSelected: 'You have selected',
  ariaMinChars: 'Enter 3 or more characters for suggestions.',
  minChars: 2,
  ariaResultsLabel: 'Country suggestions',
  ariaOneResult: 'There is one suggestion available.',
  ariaNResults: 'There are {n} suggestions available.',
  ariaLimitedResults: 'Type more characters to improve your search',
  moreResults: 'Continue entering to improve suggestions',
  resultsTitle: 'Suggestions',
  resultsTitleId: 'country-of-birth-suggestions',
  autosuggestData: '/examples/data/country-of-birth.json',
  noResults: 'No suggestions found. You can enter your own answer',
  typeMore: 'Continue entering to get suggestions',
};

describe('macro: autosuggest', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has expected id on container element', () => {
    const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

    expect($('.ons-autosuggest-input').attr('id')).toBe('country-of-birth-container');
  });

  it('has the provided data attributes', () => {
    const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

    const $element = $('.ons-autosuggest-input');
    expect($element.attr('data-allow-multiple')).toBeUndefined();
    expect($element.attr('data-min-chars')).toBe('2');
    expect($element.attr('data-aria-limited-results')).toBe('Type more characters to improve your search');
    expect($element.attr('data-aria-min-chars')).toBe('Enter 3 or more characters for suggestions.');
    expect($element.attr('data-aria-n-results')).toBe('There are {n} suggestions available.');
    expect($element.attr('data-aria-one-result')).toBe('There is one suggestion available.');
    expect($element.attr('data-aria-you-have-selected')).toBe('You have selected');
    expect($element.attr('data-autosuggest-data')).toBe('/examples/data/country-of-birth.json');
    expect($element.attr('data-instructions')).toBe('Use up and down keys to navigate.');
    expect($element.attr('data-more-results')).toBe('Continue entering to improve suggestions');
    expect($element.attr('data-no-results')).toBe('No suggestions found. You can enter your own answer');
    expect($element.attr('data-results-title')).toBe('Suggestions');
    expect($element.attr('data-type-more')).toBe('Continue entering to get suggestions');
  });

  it('has the `data-allow-multiple` attribute when `allowMultiple` is `true`', () => {
    const $ = cheerio.load(
      renderComponent('autosuggest', {
        ...EXAMPLE_AUTOSUGGEST,
        allowMultiple: true,
      }),
    );

    expect($('.ons-autosuggest-input').attr('data-allow-multiple')).toBe('true');
  });

  it('has a special class that indicates the component should initialise itself', () => {
    const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

    expect($('.ons-autosuggest-input').hasClass('ons-js-autosuggest')).toBe(true);
  });

  it('does not have a special class when the component has an external initialiser', () => {
    const $ = cheerio.load(
      renderComponent('autosuggest', {
        ...EXAMPLE_AUTOSUGGEST,
        externalInitialiser: true,
      }),
    );

    expect($('.ons-autosuggest-input').hasClass('ons-js-autosuggest')).toBe(false);
  });

  it('has special class to indicate that component is not editable', () => {
    const $ = cheerio.load(
      renderComponent('autosuggest', {
        ...EXAMPLE_AUTOSUGGEST,
        isEditable: false,
      }),
    );

    expect($('.ons-autosuggest-input').hasClass('ons-js-address-not-editable')).toBe(true);
  });

  it('has special class to indicate that component input is mandatory', () => {
    const $ = cheerio.load(
      renderComponent('autosuggest', {
        ...EXAMPLE_AUTOSUGGEST,
        mandatory: true,
      }),
    );

    expect($('.ons-autosuggest-input').hasClass('ons-js-address-mandatory')).toBe(true);
  });

  it('has additionally provided container style classes', () => {
    const $ = cheerio.load(
      renderComponent('autosuggest', {
        ...EXAMPLE_AUTOSUGGEST,
        containerClasses: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-autosuggest-input').hasClass('extra-class')).toBe(true);
    expect($('.ons-autosuggest-input').hasClass('another-extra-class')).toBe(true);
  });

  describe('input', () => {
    it('uses the `input` component with the expected parameters', () => {
      const faker = templateFaker();
      const inputSpy = faker.spy('input');

      faker.renderComponent('autosuggest', {
        ...EXAMPLE_AUTOSUGGEST,
        input: {
          type: 'text',
          classes: 'extra-class another-extra-class',
          width: '7',
          label: {
            text: 'Current name of country',
            description: 'Enter your own answer or select from suggestions',
            id: 'country-of-birth-label',
            classes: 'extra-label-class',
          },
          autocomplete: 'off',
          legend: 'this is a legend',
          legendClasses: 'legend-extra-class',
          value: 'abc',
          attributes: {
            a: 42,
          },
          error: {
            id: 'error-id',
            text: 'An error occurred.',
          },
          mutuallyExclusive: null,
          accessiblePlaceholder: true,
          name: 'country-of-birth-test',
          min: 1,
          max: 10,
          minLength: 1,
          maxLength: 10,
          prefix: {
            title: 'Great British Pounds',
            text: '£',
            id: 'gbp-prefix',
          },
          suffix: {
            title: 'Percentage of total',
            text: '%',
            id: 'percentage-suffix',
          },
          fieldId: 'field-id-test',
          fieldClasses: 'field-class-test',
          dontWrap: true,
          charCheckLimit: {
            limit: 200,
            charCountSingular: 'You have {x} character remaining',
            charCountPlural: 'You have {x} characters remaining',
            charCountOverLimitSingular: '{x} character too many',
            charCountOverLimitPlural: '{x} characters too many',
          },
          searchButton: {
            text: 'Search',
          },
          postTextboxLinkText: 'Post textbox link text',
          postTextboxLinkUrl: 'https://www.ons.gov.uk',
          listeners: {
            click: "function() { console.log('click'); }",
          },
        },
      });

      expect(inputSpy.occurrences[0]).toHaveProperty('id', 'country-of-birth');
      expect(inputSpy.occurrences[0]).toHaveProperty('type', 'text');
      expect(inputSpy.occurrences[0]).toHaveProperty('classes', 'ons-js-autosuggest-input extra-class another-extra-class');
      expect(inputSpy.occurrences[0]).toHaveProperty('width', '7');
      expect(inputSpy.occurrences[0]).toHaveProperty('label.text', 'Current name of country');
      expect(inputSpy.occurrences[0]).toHaveProperty('label.description', 'Enter your own answer or select from suggestions');
      expect(inputSpy.occurrences[0]).toHaveProperty('label.id', 'country-of-birth-label');
      expect(inputSpy.occurrences[0]).toHaveProperty('label.classes', 'extra-label-class');
      expect(inputSpy.occurrences[0]).toHaveProperty('autocomplete', 'off');
      expect(inputSpy.occurrences[0]).toHaveProperty('legend', 'this is a legend');
      expect(inputSpy.occurrences[0]).toHaveProperty('legendClasses', 'legend-extra-class');
      expect(inputSpy.occurrences[0]).toHaveProperty('value', 'abc');
      expect(inputSpy.occurrences[0]).toHaveProperty('attributes.a', 42);
      expect(inputSpy.occurrences[0]).toHaveProperty('error.id', 'error-id');
      expect(inputSpy.occurrences[0]).toHaveProperty('error.text', 'An error occurred.');
      expect(inputSpy.occurrences[0]).toHaveProperty('mutuallyExclusive', null);
      expect(inputSpy.occurrences[0]).toHaveProperty('accessiblePlaceholder', true);
      expect(inputSpy.occurrences[0]).toHaveProperty('name', 'country-of-birth-test');
      expect(typeof inputSpy.occurrences[0].autosuggestResults).toBe('string');
      expect(inputSpy.occurrences[0]).toHaveProperty('min');
      expect(inputSpy.occurrences[0]).toHaveProperty('max', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('minLength', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('maxLength', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('prefix.title', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('prefix.text', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('prefix.id', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('suffix.title', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('suffix.text', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('suffix.id', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('fieldId', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('fieldClasses', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('dontWrap', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.limit', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.charCountSingular', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.charCountPlural', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.charCountOverLimitSingular', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('charCheckLimit.charCountOverLimitPlural', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('searchButton.text', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('postTextboxLinkText', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('postTextboxLinkUrl', 'test');
      expect(inputSpy.occurrences[0]).toHaveProperty('listeners.click', 'test');
    });
  });

  describe('autosuggest results', () => {
    it('is rendered `mutallyExclusive` parameter is not defined', () => {
      const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      expect($('.ons-autosuggest-input__results').length).toBe(1);
    });

    it('is not rendered when `mutallyExclusive` parameter is defined', () => {
      const $ = cheerio.load(
        renderComponent('autosuggest', {
          ...EXAMPLE_AUTOSUGGEST,
          mutuallyExclusive: { fakeParam: true },
        }),
      );

      expect($('.ons-autosuggest-input__results').length).toBe(0);
    });

    it('renders div with the provided title identifier', () => {
      const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      expect($('.ons-autosuggest-input__results-title').attr('id')).toBe('country-of-birth-suggestions');
    });

    it('renders div with the provided title text', () => {
      const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      expect(
        $('.ons-autosuggest-input__results-title')
          .text()
          .trim(),
      ).toBe('Suggestions');
    });

    it('renders list with a generated identifier', () => {
      const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      expect($('.ons-autosuggest-input__listbox').attr('id')).toBe('country-of-birth-listbox');
    });

    it('renders an accessible list', () => {
      const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      expect($('.ons-autosuggest-input__listbox').attr('title')).toBe('Suggestions');
    });

    it('renders instructions with a generated identifier', () => {
      const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      expect($('.ons-autosuggest-input__instructions').attr('id')).toBe('country-of-birth-instructions');
    });

    it('adds aria-atomic=true value to status container', () => {
      const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      expect($('.ons-autosuggest-input__status').attr('aria-atomic')).toBe('true');
    });

    it('renders instructions text', () => {
      const $ = cheerio.load(renderComponent('autosuggest', EXAMPLE_AUTOSUGGEST));

      expect(
        $('.ons-autosuggest-input__instructions')
          .text()
          .trim(),
      ).toBe('Use up and down keys to navigate.');
    });
  });
});
