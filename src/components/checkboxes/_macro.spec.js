/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_CHECKBOX_ITEM = {
  id: 'example-checkbox-id',
  name: 'example-checkbox-name',
  value: '123',
  label: {
    classes: 'extra-label-class',
    text: 'Example checkbox',
    description: 'Example label description.',
  },
};

const EXAMPLE_CHECKBOX_ITEM_CHECKBOXES = {
  id: 'example-item-checkboxes',
  name: 'example-item-checkboxes',
  value: 'checkboxes',
  label: {
    text: 'Example item with checkboxes',
  },
  other: {
    otherType: 'checkboxes',
    selectAllChildren: true,
    id: 'example-checkboxes',
    name: 'example-checkboxes-name',
    legend: 'Select preferred times of day',
    legendClasses: 'extra-legend-class',
    attributes: { a: 42 },
    checkboxes: [
      {
        value: 'morning',
        id: 'morning',
        label: {
          text: 'Morning',
        },
      },
      {
        value: 'afternoon',
        id: 'afternoon',
        label: {
          text: 'Afternoon',
        },
      },
    ],
  },
};

const EXAMPLE_CHECKBOXES = {
  name: 'example-checkboxes-name',
  legend: 'Legend text',
  checkboxesLabel: 'Select all that apply',
  checkboxesLabelClasses: 'extra-checkboxes-label-class',
  checkboxes: [EXAMPLE_CHECKBOX_ITEM],
};

const EXAMPLE_CHECKBOXES_WITH_ERROR = {
  ...EXAMPLE_CHECKBOXES,
  error: {
    id: 'example-error-id',
    text: 'An unexpected error occurred.',
  },
};

const EXAMPLE_CHECKBOXES_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR = {
  ...EXAMPLE_CHECKBOXES_WITH_ERROR,
  dontWrap: true,
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear your feedback',
    deselectGroupAdjective: 'cleared',
    deselectExclusiveOptionAdjective: 'deselected',
    exclusiveOptions: [
      {
        id: 'feedback-exclusive-option',
        name: 'no-feedback',
        value: 'no-feedback',
        label: {
          text: 'I dont want to provide feedback',
        },
      },
    ],
  },
};

describe('macro: checkboxes', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('checkboxes', EXAMPLE_CHECKBOXES));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('renders `fieldset` component with the expected parameters', () => {
    const faker = templateFaker();
    const fieldsetSpy = faker.spy('fieldset');

    faker.renderComponent('checkboxes', {
      ...EXAMPLE_CHECKBOXES_WITH_ERROR,
      id: 'example-id',
      classes: 'extra-class',
      legendClasses: 'extra-legend-class',
      description: 'An example description.',
      dontWrap: true,
      legendIsQuestionTitle: false,
    });

    expect(fieldsetSpy.occurrences[0]).toEqual({
      id: 'example-id',
      classes: 'extra-class',
      legend: 'Legend text',
      legendClasses: 'extra-legend-class',
      description: 'An example description.',
      dontWrap: true,
      legendIsQuestionTitle: false,
      error: EXAMPLE_CHECKBOXES_WITH_ERROR.error,
    });
  });

  describe('label', () => {
    it('has the expected text', () => {
      const $ = cheerio.load(renderComponent('checkboxes', EXAMPLE_CHECKBOXES));

      expect(
        $('.ons-checkboxes__label')
          .text()
          .trim(),
      ).toBe('Select all that apply');
    });

    it('has additionally provided `checkboxesLabelClasses`', () => {
      const $ = cheerio.load(renderComponent('checkboxes', EXAMPLE_CHECKBOXES));

      expect($('.ons-checkboxes__label').hasClass('extra-checkboxes-label-class')).toBe(true);
    });
  });

  describe('mutually exclusive', () => {
    it('has the `ons-js-exclusive-group-item` class', () => {
      const $ = cheerio.load(renderComponent('checkboxes', EXAMPLE_CHECKBOXES_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR));

      expect($('.ons-js-exclusive-group-item').length).toBe(1);
    });

    it('renders mutually exclusive component', () => {
      const faker = templateFaker();
      const mutuallyExclusiveSpy = faker.spy('mutually-exclusive');

      faker.renderComponent('checkboxes', {
        ...EXAMPLE_CHECKBOXES_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR,
        id: 'example-field-id',
        classes: 'extra-class',
        legend: 'Legend text',
        legendClasses: 'extra-legend-class',
        description: 'Example description text',
        legendIsQuestionTitle: true,
        attributes: { a: 42 },
      });

      expect(mutuallyExclusiveSpy.occurrences).toContainEqual({
        id: 'example-field-id',
        description: 'Example description text',
        classes: 'extra-class',
        legend: 'Legend text',
        legendClasses: 'extra-legend-class',
        dontWrap: true,
        legendIsQuestionTitle: true,
        attributes: { a: 42 },
        exclusiveOptions: EXAMPLE_CHECKBOXES_WITH_MUTUALLY_EXCLUSIVE_WITH_ERROR.mutuallyExclusive.exclusiveOptions,
        or: 'Or',
        deselectMessage: 'Selecting this will clear your feedback',
        deselectGroupAdjective: 'cleared',
        deselectExclusiveOptionAdjective: 'deselected',
        error: EXAMPLE_CHECKBOXES_WITH_ERROR.error,
      });
    });
  });

  describe('checkbox items', () => {
    it('renders a border around each item by default', () => {
      const $ = cheerio.load(renderComponent('checkboxes', EXAMPLE_CHECKBOXES));

      expect($('.ons-checkboxes__item').hasClass('ons-checkboxes__item--no-border')).toBe(false);
    });

    it('does not render a border around each item when `borderless` is `false`', () => {
      const $ = cheerio.load(
        renderComponent('checkboxes', {
          ...EXAMPLE_CHECKBOXES,
          borderless: true,
        }),
      );

      expect($('.ons-checkboxes__item').hasClass('ons-checkboxes__item--no-border')).toBe(true);
    });

    it('does not mark radio with a class indicating that all child options should be selected', () => {
      const $ = cheerio.load(
        renderComponent('checkboxes', {
          ...EXAMPLE_CHECKBOXES,
          checkboxes: [EXAMPLE_CHECKBOX_ITEM],
        }),
      );

      expect($('.ons-js-other').hasClass('ons-js-select-all-children')).toBe(false);
    });

    it('marks radio with a class indicating that all child options should be selected', () => {
      const $ = cheerio.load(
        renderComponent('checkboxes', {
          ...EXAMPLE_CHECKBOXES,
          checkboxes: [EXAMPLE_CHECKBOX_ITEM_CHECKBOXES],
        }),
      );

      expect($('.ons-js-other').hasClass('ons-js-select-all-children')).toBe(true);
    });

    it('renders `checkboxes/checkbox` component', () => {
      const faker = templateFaker();
      const checkboxSpy = faker.spy('checkboxes/checkbox');

      faker.renderComponent('checkboxes', {
        ...EXAMPLE_CHECKBOXES,
        borderless: true,
        checkboxes: [
          {
            ...EXAMPLE_CHECKBOX_ITEM,
            classes: 'extra-checkbox-item-class',
            checked: false,
            disabled: false,
            attributes: { a: '123', b: '456' },
          },
        ],
      });

      expect(checkboxSpy.occurrences).toContainEqual({
        id: 'example-checkbox-id',
        name: 'example-checkbox-name',
        classes: 'extra-checkbox-item-class ons-checkbox--no-border',
        inputClasses: '',
        borderless: true,
        checked: false,
        disabled: false,
        attributes: { a: '123', b: '456' },
        label: {
          classes: 'extra-label-class',
          description: 'Example label description.',
          for: 'example-checkbox-id',
          text: 'Example checkbox',
        },
        value: '123',
      });
    });
  });

  describe('toggle selection button', () => {
    const params = {
      ...EXAMPLE_CHECKBOXES,
      autoSelect: {
        selectAllText: 'Select all',
        unselectAllText: 'Unselect all',
        context: 'following checkboxes',
      },
    };

    it('renders `button` component', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('checkboxes', params);

      expect(buttonSpy.occurrences[0]).toHaveProperty(
        'html',
        '<span class="ons-js-button-text">Select all</span><span class="ons-u-vh"> following checkboxes</span>',
      );
      expect(buttonSpy.occurrences[0]).toHaveProperty('variants', ['small', 'secondary']);
      expect(buttonSpy.occurrences[0]).toHaveProperty('classes', 'ons-u-mb-s ons-js-auto-selector');
      expect(buttonSpy.occurrences[0]).toHaveProperty('attributes.data-select-all', 'Select all');
      expect(buttonSpy.occurrences[0]).toHaveProperty('attributes.data-unselect-all', 'Unselect all');
    });

    it('does not render `button` component when a checkbox has an `other` input', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('checkboxes', {
        ...params,
        checkboxes: [
          {
            ...EXAMPLE_CHECKBOX_ITEM,
            other: {
              label: { text: 'Example input' },
            },
          },
        ],
      });

      expect(buttonSpy.occurrences.length).toBe(0);
    });
  });
});
