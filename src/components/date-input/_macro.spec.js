/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_DATE_INPUT_BASE = {
  id: 'date',
  legendOrLabel: 'Date of birth',
  description: 'For example, 31 3 1980',
};

const EXAMPLE_DAY_FIELD = {
  day: {
    label: {
      text: 'Day',
      description: 'The day',
    },
    value: 'Day',
    name: 'day',
    attributes: {
      autocomplete: 'bday-day',
    },
  },
};

const EXAMPLE_MONTH_FIELD = {
  month: {
    label: {
      text: 'Month',
      description: 'The month',
    },
    value: 'Month',
    name: 'month',
    attributes: {
      autocomplete: 'bday-month',
    },
  },
};

const EXAMPLE_YEAR_FIELD = {
  year: {
    label: {
      text: 'Year',
      description: 'The year',
    },
    value: 'Year',
    name: 'year',
    attributes: {
      autocomplete: 'bday-year',
    },
  },
};

const EXAMPLE_DATE_SINGLE_FIELD = {
  ...EXAMPLE_DATE_INPUT_BASE,
  ...EXAMPLE_YEAR_FIELD,
};

const EXAMPLE_DATE_MULTIPLE_FIELDS = {
  ...EXAMPLE_DATE_INPUT_BASE,
  ...EXAMPLE_DAY_FIELD,
  ...EXAMPLE_MONTH_FIELD,
  ...EXAMPLE_YEAR_FIELD,
};

describe('macro: date input', () => {
  describe('mode: multiple fields', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('date-input', EXAMPLE_DATE_MULTIPLE_FIELDS));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the expected `input` output for the `day` field', () => {
      const faker = templateFaker();
      const inputSpy = faker.spy('input');

      faker.renderComponent('date-input', EXAMPLE_DATE_MULTIPLE_FIELDS);

      expect(inputSpy.occurrences[0]).toEqual({
        id: 'date-day',
        type: 'number',
        name: 'day',
        width: '2',
        min: 1,
        max: 31,
        maxLength: 2,
        classes: '',
        label: {
          text: 'Day',
          description: 'The day',
          id: 'date-day-label',
        },
        value: 'Day',
        attributes: {
          autocomplete: 'bday-day',
        },
      });
    });

    it('has the expected `input` output for the `month` field', () => {
      const faker = templateFaker();
      const inputSpy = faker.spy('input');

      faker.renderComponent('date-input', EXAMPLE_DATE_MULTIPLE_FIELDS);

      expect(inputSpy.occurrences[1]).toEqual({
        id: 'date-month',
        type: 'number',
        name: 'month',
        width: '2',
        min: 1,
        max: 12,
        maxLength: 2,
        classes: '',
        label: {
          text: 'Month',
          description: 'The month',
          id: 'date-month-label',
        },
        value: 'Month',
        attributes: {
          autocomplete: 'bday-month',
        },
      });
    });

    it('has the expected `input` output for the `year` field', () => {
      const faker = templateFaker();
      const inputSpy = faker.spy('input');

      faker.renderComponent('date-input', EXAMPLE_DATE_MULTIPLE_FIELDS);

      expect(inputSpy.occurrences[2]).toEqual({
        id: 'date-year',
        type: 'number',
        name: 'year',
        width: '4',
        min: 1000,
        max: 3000,
        maxLength: 4,
        classes: '',
        label: {
          text: 'Year',
          description: 'The year',
          id: 'date-year-label',
        },
        value: 'Year',
        attributes: {
          autocomplete: 'bday-year',
        },
      });
    });

    it('has the group class div', () => {
      const $ = cheerio.load(renderComponent('date-input', EXAMPLE_DATE_MULTIPLE_FIELDS));
      const div = $('.ons-field:first-child').parent();
      expect($(div).hasClass('ons-field-group')).toBe(true);
    });

    it('has the expected `fieldset` output', () => {
      const faker = templateFaker();
      const fieldsetSpy = faker.spy('fieldset');

      faker.renderComponent('date-input', {
        ...EXAMPLE_DATE_MULTIPLE_FIELDS,
        legendClasses: 'custom-legend-class',
        classes: 'custom-class',
        dontWrap: true,
        legendIsQuestionTitle: true,
        error: false,
      });

      expect(fieldsetSpy.occurrences[0]).toEqual({
        id: 'date',
        legend: 'Date of birth',
        description: 'For example, 31 3 1980',
        legendClasses: 'custom-legend-class',
        classes: 'custom-class',
        dontWrap: true,
        legendIsQuestionTitle: true,
        error: false,
      });
    });
  });

  describe('mode: multiple fields with mutually exclusive', () => {
    it('has the correct class on each input', async () => {
      const $ = cheerio.load(renderComponent('date-input', { ...EXAMPLE_DATE_MULTIPLE_FIELDS, mutuallyExclusive: {} }));

      const exclusiveClassCount = $('.ons-js-exclusive-group-item').length;
      expect(exclusiveClassCount).toBe(3);
    });

    it('has the expected `mutuallyExclusive` output', () => {
      const faker = templateFaker();
      const mutuallyExclusiveSpy = faker.spy('mutually-exclusive');

      faker.renderComponent('date-input', {
        ...EXAMPLE_DATE_MULTIPLE_FIELDS,
        legendClasses: 'custom-legend-class',
        classes: 'custom-class',
        dontWrap: true,
        legendIsQuestionTitle: true,
        error: false,
        mutuallyExclusive: {
          exclusiveOptions: {},
          or: 'Or',
          deselectMessage: 'Deselect message',
          deselectGroupAdjective: 'Deselect group adjective',
          deselectExclusiveOptionAdjective: 'Deselect checkbox adjective',
        },
      });

      expect(mutuallyExclusiveSpy.occurrences[0]).toEqual({
        id: 'date',
        legend: 'Date of birth',
        description: 'For example, 31 3 1980',
        legendClasses: 'custom-legend-class',
        classes: 'custom-class',
        dontWrap: true,
        legendIsQuestionTitle: true,
        error: false,
        exclusiveOptions: {},
        or: 'Or',
        deselectMessage: 'Deselect message',
        deselectGroupAdjective: 'Deselect group adjective',
        deselectExclusiveOptionAdjective: 'Deselect checkbox adjective',
      });
    });
  });

  describe('mode: single field', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('date-input', EXAMPLE_DATE_SINGLE_FIELD));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the expected `input` output for the field', () => {
      const faker = templateFaker();
      const inputSpy = faker.spy('input');

      faker.renderComponent('date-input', EXAMPLE_DATE_SINGLE_FIELD);

      expect(inputSpy.occurrences[0]).toEqual({
        id: 'date-year',
        type: 'number',
        name: 'year',
        width: '4',
        min: 1000,
        max: 3000,
        maxLength: 4,
        classes: '',
        label: {
          text: 'Date of birth',
          description: 'For example, 31 3 1980',
          id: 'date-year-label',
        },
        value: 'Year',
        attributes: {
          autocomplete: 'bday-year',
        },
      });
    });

    it('has the expected `error` output', () => {
      const faker = templateFaker();
      const errorSpy = faker.spy('error');

      faker.renderComponent('date-input', {
        ...EXAMPLE_DATE_SINGLE_FIELD,
        error: { text: 'Enter a date that is after 1 January 2019' },
      });

      expect(errorSpy.occurrences[0]).toEqual({
        text: 'Enter a date that is after 1 January 2019',
      });
    });
  });
});
