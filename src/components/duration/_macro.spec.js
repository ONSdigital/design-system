/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_DURATION_INPUT_BASE = {
  id: 'duration',
  legendOrLabel: 'How long have you lived at this address?',
  description: 'Enter “0” into the years field if you have lived at this address for less than a year',
};

const EXAMPLE_FIELD_1 = {
  field1: {
    id: 'address-duration-years',
    name: 'address-duration-years',
    value: '0',
    suffix: {
      text: 'Years',
      id: 'address-duration-years-suffix',
    },
  },
};

const EXAMPLE_FIELD_2 = {
  field2: {
    id: 'address-duration-months',
    name: 'address-duration-months',
    value: '0',
    suffix: {
      text: 'Months',
      id: 'address-duration-months-suffix',
    },
  },
};

const EXAMPLE_DURATION_SINGLE_FIELD = {
  ...EXAMPLE_DURATION_INPUT_BASE,
  ...EXAMPLE_FIELD_1,
};

const EXAMPLE_DURATION_MULTIPLE_FIELDS = {
  ...EXAMPLE_DURATION_INPUT_BASE,
  ...EXAMPLE_FIELD_1,
  ...EXAMPLE_FIELD_2,
};

describe('macro: duration', () => {
  describe('mode: multiple fields', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('duration', EXAMPLE_DURATION_MULTIPLE_FIELDS));
      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the expected `input` output for `field1`', () => {
      const faker = templateFaker();
      const inputSpy = faker.spy('input');

      faker.renderComponent('duration', EXAMPLE_DURATION_MULTIPLE_FIELDS);

      expect(inputSpy.occurrences[0]).toEqual({
        id: 'address-duration-years',
        type: 'number',
        width: '2',
        classes: '',
        value: '0',
        attributes: undefined,
        classes: '',
        error: '',
        fieldId: '',
        label: {
          description: '',
          text: '',
        },
        name: 'address-duration-years',
        suffix: {
          id: 'address-duration-years-suffix',
          text: 'Years',
        },
      });

      expect(inputSpy.occurrences[1]).toEqual({
        id: 'address-duration-months',
        type: 'number',
        width: '2',
        classes: '',
        value: '0',
        attributes: undefined,
        classes: '',
        error: '',
        fieldId: '',
        label: {
          description: '',
          text: '',
        },
        name: 'address-duration-months',
        suffix: {
          id: 'address-duration-months-suffix',
          text: 'Months',
        },
      });
    });

    it('has the group class div', () => {
      const $ = cheerio.load(renderComponent('duration', EXAMPLE_DURATION_MULTIPLE_FIELDS));
      const div = $('.ons-field:first-child').parent();
      expect($(div).hasClass('ons-field-group')).toBe(true);
    });

    it('has the expected `fieldset` output', () => {
      const faker = templateFaker();
      const fieldsetSpy = faker.spy('fieldset');

      faker.renderComponent('duration', {
        ...EXAMPLE_DURATION_MULTIPLE_FIELDS,
        legendClasses: 'custom-legend-class',
        dontWrap: true,
        legendIsQuestionTitle: true,
        error: false,
      });

      expect(fieldsetSpy.occurrences[0]).toEqual({
        id: 'duration',
        legend: 'How long have you lived at this address?',
        description: 'Enter “0” into the years field if you have lived at this address for less than a year',
        legendClasses: 'custom-legend-class',
        dontWrap: true,
        legendIsQuestionTitle: true,
        error: false,
      });
    });
  });

  describe('mode: multiple fields with mutually exclusive', () => {
    it('has the correct class on each input', async () => {
      const $ = cheerio.load(
        renderComponent('duration', {
          ...EXAMPLE_DURATION_MULTIPLE_FIELDS,
          mutuallyExclusive: {
            legendClasses: 'custom-legend-class',
            dontWrap: true,
            legendIsQuestionTitle: true,
            error: false,
            mutuallyExclusive: {
              checkbox: {},
              or: 'Or',
              deselectMessage: 'Deselect message',
              deselectGroupAdjective: 'Deselect group adjective',
              deselectExclusiveOptionAdjective: 'Deselect checkbox adjective',
            },
          },
        }),
      );

      const exclusiveClassCount = $('.ons-js-exclusive-group-item').length;
      expect(exclusiveClassCount).toBe(2);
    });

    it('has the expected `mutuallyExclusive` output', () => {
      const faker = templateFaker();
      const mutuallyExclusiveSpy = faker.spy('mutually-exclusive');

      faker.renderComponent('duration', {
        ...EXAMPLE_DURATION_MULTIPLE_FIELDS,
        legendClasses: 'custom-legend-class',
        dontWrap: true,
        legendIsQuestionTitle: true,
        error: false,
        mutuallyExclusive: {
          checkbox: {},
          or: 'Or',
          deselectMessage: 'Deselect message',
          deselectGroupAdjective: 'Deselect group adjective',
          deselectExclusiveOptionAdjective: 'Deselect checkbox adjective',
        },
      });

      expect(mutuallyExclusiveSpy.occurrences[0]).toEqual({
        id: 'duration',
        legend: 'How long have you lived at this address?',
        description: 'Enter “0” into the years field if you have lived at this address for less than a year',
        legendClasses: 'custom-legend-class',
        dontWrap: true,
        legendIsQuestionTitle: true,
        error: false,
        checkbox: {},
        or: 'Or',
        deselectMessage: 'Deselect message',
        deselectGroupAdjective: 'Deselect group adjective',
        deselectExclusiveOptionAdjective: 'Deselect checkbox adjective',
      });
    });
  });

  describe('mode: single field', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('duration', EXAMPLE_DURATION_SINGLE_FIELD));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the expected `input` output for the field', () => {
      const faker = templateFaker();
      const inputSpy = faker.spy('input');

      faker.renderComponent('duration', EXAMPLE_DURATION_SINGLE_FIELD);

      expect(inputSpy.occurrences[0]).toEqual({
        id: 'address-duration-years',
        type: 'number',
        width: '2',
        classes: '',
        value: '0',
        attributes: undefined,
        classes: '',
        error: undefined,
        fieldId: 'duration',
        label: {
          text: 'How long have you lived at this address?',
          description: 'Enter “0” into the years field if you have lived at this address for less than a year',
        },
        name: 'address-duration-years',
        suffix: {
          id: 'address-duration-years-suffix',
          text: 'Years',
        },
      });
    });

    it('has the expected `error` output', () => {
      const faker = templateFaker();
      const errorSpy = faker.spy('error');

      faker.renderComponent('duration', {
        ...EXAMPLE_DURATION_SINGLE_FIELD,
        error: { text: 'Put something else' },
      });

      expect(errorSpy.occurrences[0]).toEqual({
        text: 'Put something else',
      });
    });
  });
});
