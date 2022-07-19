/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_CHECKBOX_OPTION = {
  id: 'example-option-id',
  name: 'example-option-name',
  value: 'example-option-value',
  checked: false,
  classes: 'extra-option-class',
  attributes: {
    'data-attribute': 'Example attribute',
  },
  label: {
    text: 'Example option text',
    description: 'Example option description',
  },
};

const EXAMPLE_MUTUALLY_EXCLUSIVE = {
  id: 'example-mutually-exclusive',
  classes: 'extra-class',
  exclusiveOptions: [EXAMPLE_CHECKBOX_OPTION],
  or: 'Or',
  deselectMessage: 'Selecting this will uncheck all other checkboxes',
  deselectGroupAdjective: 'Group was unselected',
  deselectExclusiveOptionAdjective: 'Exclusive option was unselected',
  legend: 'Legend text',
  legendClasses: 'extra-legend-class',
  description: 'An example description.',
  attributes: { a: 42 },
  dontWrap: true,
  legendIsQuestionTitle: true,
  error: {
    id: 'file-error',
    text: 'Select a file that is an XLS, XLSX or PDF',
  },
};

const EXAMPLE_MUTUALLY_EXCLUSIVE_RADIOS = {
  ...EXAMPLE_MUTUALLY_EXCLUSIVE,
  exclusiveOptions: [
    {
      id: 'house',
      name: 'mutuallyExclusiveRadio',
      label: {
        text: 'House or bungalow',
      },
      value: 'house',
    },
    {
      id: 'flat',
      name: 'mutuallyExclusiveRadio',
      label: {
        text: 'Flat, maisonette or apartment',
      },
      value: 'flat',
    },
  ],
};

const FAKE_FIELD = '<span id="fake-field">Fake field</span>';

describe('macro: mutually-exclusive', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('mutually-exclusive', EXAMPLE_MUTUALLY_EXCLUSIVE, FAKE_FIELD));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('renders `fieldset` component with the expected parameters', () => {
    const faker = templateFaker();
    const fieldsetSpy = faker.spy('fieldset');

    faker.renderComponent('mutually-exclusive', EXAMPLE_MUTUALLY_EXCLUSIVE, FAKE_FIELD);

    expect(fieldsetSpy.occurrences).toContainEqual({
      id: 'example-mutually-exclusive',
      classes: 'extra-class',
      legend: 'Legend text',
      legendClasses: 'extra-legend-class',
      description: 'An example description.',
      attributes: EXAMPLE_MUTUALLY_EXCLUSIVE.attributes,
      dontWrap: true,
      legendIsQuestionTitle: true,
      error: EXAMPLE_MUTUALLY_EXCLUSIVE.error,
    });
  });

  it('renders inner field via `caller` mechanism', () => {
    const $ = cheerio.load(renderComponent('mutually-exclusive', EXAMPLE_MUTUALLY_EXCLUSIVE, FAKE_FIELD));

    expect($('.ons-mutually-exclusive > #fake-field').length).toBe(1);
  });

  it('renders `autosuggestResults` after the field', () => {
    const $ = cheerio.load(
      renderComponent(
        'mutually-exclusive',
        {
          ...EXAMPLE_MUTUALLY_EXCLUSIVE,
          autosuggestResults: '<span id="autosuggest-results"></span>',
        },
        FAKE_FIELD,
      ),
    );

    expect($('#fake-field + #autosuggest-results').length).toBe(1);
  });

  it('renders `deselectGroupAdjective` and `deselectExclusiveOptionAdjective` for the alert', () => {
    const $ = cheerio.load(renderComponent('mutually-exclusive', EXAMPLE_MUTUALLY_EXCLUSIVE, FAKE_FIELD));

    expect($('.ons-js-exclusive-alert').attr('data-group-adjective')).toBe('Group was unselected');
    expect($('.ons-js-exclusive-alert').attr('data-option-adjective')).toBe('Exclusive option was unselected');
  });

  describe('mode: with single checkbox', () => {
    it('renders visually hidden "Or" label', () => {
      const $ = cheerio.load(renderComponent('mutually-exclusive', EXAMPLE_MUTUALLY_EXCLUSIVE, FAKE_FIELD));

      expect(
        $('.ons-checkboxes__label')
          .text()
          .trim(),
      ).toBe('Or');
    });

    it('renders a checkbox component with the expected parameters', () => {
      const faker = templateFaker();
      const checkboxSpy = faker.spy('checkboxes/checkbox');

      faker.renderComponent('mutually-exclusive', EXAMPLE_MUTUALLY_EXCLUSIVE, FAKE_FIELD);

      expect(checkboxSpy.occurrences).toContainEqual({
        id: 'example-option-id',
        name: 'example-option-name',
        value: 'example-option-value',
        checked: false,
        classes: 'extra-option-class',
        attributes: {
          'data-attribute': 'Example attribute',
        },
        deselectMessage: 'Selecting this will uncheck all other checkboxes',
        inputClasses: 'ons-js-exclusive-option',
        label: {
          text: '<span class="ons-u-vh">Or, </span> Example option text',
          description: 'Example option description',
        },
      });
    });
  });

  describe('mode: with multiple radio options', () => {
    it('renders visually hidden "Or" label', () => {
      const $ = cheerio.load(renderComponent('mutually-exclusive', EXAMPLE_MUTUALLY_EXCLUSIVE_RADIOS, FAKE_FIELD));

      expect(
        $('.ons-checkboxes__label')
          .text()
          .trim(),
      ).toBe('Or');
    });

    it('renders a radios component with the expected parameters', () => {
      const faker = templateFaker();
      const radiosSpy = faker.spy('radios');

      faker.renderComponent('mutually-exclusive', EXAMPLE_MUTUALLY_EXCLUSIVE_RADIOS, FAKE_FIELD);

      expect(radiosSpy.occurrences).toContainEqual({
        dontWrap: true,
        radios: EXAMPLE_MUTUALLY_EXCLUSIVE_RADIOS.exclusiveOptions,
        inputClasses: 'ons-js-exclusive-option',
        name: 'mutuallyExclusiveRadio',
        deselectMessage: 'Selecting this will uncheck all other checkboxes',
      });
    });
  });
});
