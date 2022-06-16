/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { mapAll } from '../../tests/helpers/cheerio';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_SELECT_MINIMAL = {
  id: 'example-select',
  name: 'example-select-name',
  label: {
    text: 'Label text',
    description: 'Description text',
    classes: 'extra-label-class',
  },
  options: [
    {
      text: 'First option',
      value: 1,
    },
    {
      id: 'second-option',
      text: 'Second option',
      value: 2,
      selected: true,
    },
    {
      text: 'Disabled option',
      value: 3,
      disabled: true,
    },
  ],
};

const EXAMPLE_SELECT = {
  ...EXAMPLE_SELECT_MINIMAL,
  fieldId: 'example-select-field',
  fieldClasses: 'extra-field-class',
  legendClasses: 'extra-legend-class',
  dontWrap: true,
};

const EXAMPLE_SELECT_WITH_ERROR = {
  ...EXAMPLE_SELECT,
  error: {
    id: 'example-error',
    text: 'Error text...',
  },
};

describe('macro: select', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('select', EXAMPLE_SELECT));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('passes jest-axe checks when error is shown', async () => {
    const $ = cheerio.load(renderComponent('select', EXAMPLE_SELECT_WITH_ERROR));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('provides expected parameters to the inner `field` component', () => {
    const faker = templateFaker();
    const fieldSpy = faker.spy('field');

    cheerio.load(faker.renderComponent('select', EXAMPLE_SELECT));

    expect(fieldSpy.occurrences[0]).toEqual({
      id: 'example-select-field',
      classes: 'extra-field-class',
      legendClasses: 'extra-legend-class',
      dontWrap: true,
      error: undefined,
    });
  });

  it('provides expected parameters to the inner `field` component when there is an error', () => {
    const faker = templateFaker();
    const fieldSpy = faker.spy('field');

    cheerio.load(faker.renderComponent('select', EXAMPLE_SELECT_WITH_ERROR));

    expect(fieldSpy.occurrences[0]).toEqual({
      id: 'example-select-field',
      classes: 'extra-field-class',
      legendClasses: 'extra-legend-class',
      dontWrap: true,
      error: {
        id: 'example-error',
        text: 'Error text...',
      },
    });
  });

  it('provides expected parameters to the inner `label` component', () => {
    const faker = templateFaker();
    const labelSpy = faker.spy('label');

    cheerio.load(faker.renderComponent('select', EXAMPLE_SELECT));

    expect(labelSpy.occurrences[0]).toEqual({
      for: 'example-select',
      text: 'Label text',
      description: 'Description text',
      classes: 'extra-label-class',
    });
  });

  describe('select element', () => {
    it('has the provided `id` attribute', () => {
      const $ = cheerio.load(renderComponent('select', EXAMPLE_SELECT));

      expect($('select').attr('id')).toBe('example-select');
    });

    it('has the provided `name` attribute', () => {
      const $ = cheerio.load(renderComponent('select', EXAMPLE_SELECT));

      expect($('select').attr('name')).toBe('example-select-name');
    });

    it('has additionally provided style classes', () => {
      const $ = cheerio.load(
        renderComponent('select', {
          ...EXAMPLE_SELECT,
          classes: 'extra-class another-extra-class',
        }),
      );

      expect($('select').hasClass('extra-class')).toBe(true);
      expect($('select').hasClass('another-extra-class')).toBe(true);
    });

    it('has additionally provided `attributes`', () => {
      const $ = cheerio.load(
        renderComponent('select', {
          ...EXAMPLE_SELECT,
          attributes: {
            a: 123,
            b: 456,
          },
        }),
      );

      expect($('select').attr('a')).toBe('123');
      expect($('select').attr('b')).toBe('456');
    });

    describe('option element', () => {
      it('has expected text', () => {
        const $ = cheerio.load(renderComponent('select', EXAMPLE_SELECT));

        const values = mapAll($('select > option'), node => node.text().trim());
        expect(values).toEqual(['First option', 'Second option', 'Disabled option']);
      });

      it('has a provided `id` attribute', () => {
        const $ = cheerio.load(renderComponent('select', EXAMPLE_SELECT));

        const values = mapAll($('select > option'), node => node.attr('id'));
        expect(values).toEqual([undefined, 'second-option', undefined]);
      });

      it('marks the correct option as selected', () => {
        const $ = cheerio.load(renderComponent('select', EXAMPLE_SELECT));

        const values = mapAll($('select > option'), node => node.attr('selected'));
        expect(values).toEqual([undefined, 'selected', undefined]);
      });

      it('marks the correct option as disabled', () => {
        const $ = cheerio.load(renderComponent('select', EXAMPLE_SELECT));

        const values = mapAll($('select > option'), node => node.attr('disabled'));
        expect(values).toEqual([undefined, undefined, 'disabled']);
      });

      it('has a provided `value` attribute', () => {
        const $ = cheerio.load(renderComponent('select', EXAMPLE_SELECT));

        const values = mapAll($('select > option'), node => node.attr('value'));
        expect(values).toEqual(['1', '2', '3']);
      });

      it('uses option text as a default `value` attribute', () => {
        const $ = cheerio.load(
          renderComponent('select', {
            ...EXAMPLE_SELECT,
            options: [{ text: 'First option' }, { text: 'Second option' }],
          }),
        );

        const values = mapAll($('select > option'), node => node.attr('value'));
        expect(values).toEqual(['First option', 'Second option']);
      });
    });
  });
});
