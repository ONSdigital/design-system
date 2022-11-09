/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_RADIOS_MINIMAL = {
  name: 'example-radios-name',
  legend: 'Legend text',
  radios: [],
};

const EXAMPLE_RADIO_ITEM = {
  id: 'example-item-id',
  value: 'plain',
  label: {
    classes: 'extra-label-class',
    text: 'Example item',
    description: 'An example description.',
  },
};

const EXAMPLE_RADIO_ITEM_INPUT = {
  id: 'example-item-input',
  name: 'example-item-input',
  value: 'input',
  label: {
    text: 'Example item with input',
  },
  other: {
    id: 'example-text-input',
    name: 'example-text-input-name',
    type: 'text',
    label: {
      text: 'Enter your own answer',
    },
    classes: 'extra-textbox-class',
    width: 42,
    value: '42',
    attributes: { a: 42 },
  },
};

const EXAMPLE_RADIO_ITEM_SELECT = {
  id: 'example-item-select',
  name: 'example-item-select',
  value: 'select',
  label: {
    text: 'Example item with select',
  },
  other: {
    otherType: 'select',
    id: 'example-select',
    name: 'example-select-name',
    label: {
      text: 'Enter your own answer',
    },
    classes: 'extra-select-class',
    options: [
      { text: 'First', value: '1' },
      { text: 'Second', value: '2' },
    ],
    value: '1',
  },
};

const EXAMPLE_RADIO_ITEM_CHECKBOXES = {
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
    autoSelect: {
      selectAllText: 'Select all',
      unselectAllText: 'Unselect all',
      context: 'checkboxes',
    },
  },
};

const EXAMPLE_RADIO_ITEM_RADIOS = {
  id: 'example-item-radios',
  name: 'example-item-radios',
  value: 'radios',
  label: {
    text: 'Example item with radios',
  },
  other: {
    otherType: 'radios',
    id: 'example-radios',
    name: 'example-radios-name',
    legend: 'Select preferred times of day',
    legendClasses: 'extra-legend-class',
    attributes: { a: 42 },
    radios: [EXAMPLE_RADIO_ITEM],
  },
};

describe('macro: radios', () => {
  it.each([
    ['plain', EXAMPLE_RADIO_ITEM],
    ['input', EXAMPLE_RADIO_ITEM_INPUT],
    ['select', EXAMPLE_RADIO_ITEM_SELECT],
    ['checkboxes', EXAMPLE_RADIO_ITEM_CHECKBOXES],
    ['radios', EXAMPLE_RADIO_ITEM_RADIOS],
  ])('passes jest-axe checks with a %s item', async (_, radioItem) => {
    const $ = cheerio.load(
      renderComponent('radios', {
        ...EXAMPLE_RADIOS_MINIMAL,
        radios: [radioItem],
      }),
    );

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('renders `fieldset` component with the expected parameters', () => {
    const faker = templateFaker();
    const fieldsetSpy = faker.spy('fieldset');

    faker.renderComponent('radios', {
      ...EXAMPLE_RADIOS_MINIMAL,
      id: 'example-id',
      classes: 'extra-class',
      legendClasses: 'extra-legend-class',
      description: 'An example description.',
      dontWrap: true,
      legendIsQuestionTitle: false,
      error: {
        id: 'example-error-id',
        text: 'An unexpected error occurred.',
      },
    });

    expect(fieldsetSpy.occurrences[0]).toEqual({
      id: 'example-id',
      classes: 'extra-class',
      legend: 'Legend text',
      legendClasses: 'extra-legend-class',
      description: 'An example description.',
      dontWrap: true,
      legendIsQuestionTitle: false,
      error: {
        id: 'example-error-id',
        text: 'An unexpected error occurred.',
      },
    });
  });

  describe('radio item', () => {
    it('renders `or` label before last radio item', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [EXAMPLE_RADIO_ITEM, EXAMPLE_RADIO_ITEM_INPUT, EXAMPLE_RADIO_ITEM_SELECT],
          or: 'Or',
        }),
      );

      const label = $('.ons-radios__item + br + .ons-radios__item + br + .ons-radios__label');
      expect(label.text().trim()).toBe('Or');
    });

    it('is of the "radio" input type', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [EXAMPLE_RADIO_ITEM],
        }),
      );

      expect($('.ons-radio__input').attr('type')).toBe('radio');
    });

    it('has the provided `id` attribute', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [EXAMPLE_RADIO_ITEM],
        }),
      );

      expect($('.ons-radio__input').attr('id')).toBe('example-item-id');
    });

    it('has additionally provided attributes', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          inputClasses: 'extra-input-class another-extra-input-class',
          radios: [
            {
              ...EXAMPLE_RADIO_ITEM,
              attributes: { a: '123', b: '456' },
            },
          ],
        }),
      );

      expect($('.ons-radio__input').attr('a')).toBe('123');
      expect($('.ons-radio__input').attr('b')).toBe('456');
    });

    it('has the provided `name` attribute', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [EXAMPLE_RADIO_ITEM],
        }),
      );

      expect($('.ons-radio__input').attr('name')).toBe('example-radios-name');
    });

    it('has the provided `value` attribute', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [EXAMPLE_RADIO_ITEM],
        }),
      );

      expect($('.ons-radio__input').attr('value')).toBe('plain');
    });

    it('does not have a `checked` attribute', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [EXAMPLE_RADIO_ITEM],
        }),
      );

      expect($('.ons-radio__input').attr('checked')).toBeUndefined();
    });

    it('has a `checked` attribute when `checked` parameter is provided', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [
            {
              ...EXAMPLE_RADIO_ITEM,
              checked: true,
            },
          ],
        }),
      );

      expect($('.ons-radio__input').attr('checked')).toBe('checked');
    });

    it('has a `checked` attribute when `value` parameter matches root `value` parameter', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          value: 'plain',
          radios: [EXAMPLE_RADIO_ITEM],
        }),
      );

      expect($('.ons-radio__input').attr('checked')).toBe('checked');
    });

    it('has additionally provided style classes (from `inputClasses` parameter)', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          inputClasses: 'extra-input-class another-extra-input-class',
          radios: [EXAMPLE_RADIO_ITEM],
        }),
      );

      expect($('.ons-radio__input').hasClass('extra-input-class')).toBe(true);
      expect($('.ons-radio__input').hasClass('another-extra-input-class')).toBe(true);
    });

    it('has additionally provided style classes (from `radio.classes` parameter)', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [
            {
              ...EXAMPLE_RADIO_ITEM,
              classes: 'extra-item-class another-extra-item-class',
            },
          ],
        }),
      );

      expect($('.ons-radio__input').hasClass('extra-item-class')).toBe(true);
      expect($('.ons-radio__input').hasClass('another-extra-item-class')).toBe(true);
    });

    it('renders a border around each item by default', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [EXAMPLE_RADIO_ITEM],
        }),
      );

      expect($('.ons-radios__item').hasClass('ons-radios__item--no-border')).toBe(false);
      expect($('.ons-radio').hasClass('ons-radio--no-border')).toBe(false);
    });

    it('does not render a border around each item when `borderless` is `false`', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [EXAMPLE_RADIO_ITEM],
          borderless: true,
        }),
      );

      expect($('.ons-radios__item').hasClass('ons-radios__item--no-border')).toBe(true);
      expect($('.ons-radio').hasClass('ons-radio--no-border')).toBe(true);
    });

    it('does not mark radio with a class indicating that all child options should be selected', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [EXAMPLE_RADIO_ITEM],
        }),
      );

      expect($('.ons-radio__input').hasClass('ons-js-select-all-children')).toBe(false);
    });

    it('marks radio with a class indicating that all child options should be selected', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [EXAMPLE_RADIO_ITEM_CHECKBOXES],
        }),
      );

      expect($('.ons-radio__input').hasClass('ons-js-select-all-children')).toBe(true);
    });

    it('does not mark radio with a class indicating that there is an `other` input', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [EXAMPLE_RADIO_ITEM],
        }),
      );

      expect($('.ons-js-other').hasClass('ons-js-select-all-children')).toBe(false);
    });

    it('marks radio with a class indicating that there is an `other` input', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [EXAMPLE_RADIO_ITEM_CHECKBOXES],
        }),
      );

      expect($('.ons-js-other').hasClass('ons-js-select-all-children')).toBe(true);
    });

    it('renders label for the radio item', () => {
      const faker = templateFaker();
      const labelSpy = faker.spy('label');

      faker.renderComponent('radios', {
        ...EXAMPLE_RADIOS_MINIMAL,
        radios: [EXAMPLE_RADIO_ITEM],
      });

      expect(labelSpy.occurrences).toContainEqual({
        id: 'example-item-id-label',
        for: 'example-item-id',
        inputType: 'radio',
        text: 'Example item',
        classes: 'ons-radio__label extra-label-class',
        description: 'An example description.',
      });
    });

    it('wraps `other` component without a class indicating that it is open', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [EXAMPLE_RADIO_ITEM_INPUT],
        }),
      );

      expect($('.ons-radio__other').hasClass('ons-radio__other--open')).toBe(false);
      expect($('.ons-radio__other').attr('id')).toBe('example-item-input-other-wrap');
      expect($('.ons-radio__input').attr('aria-controls')).toBe('example-item-input-other-wrap');
      expect($('.ons-radio__input').attr('aria-haspopup')).toBe('true');
    });

    it('wraps `other` component with class indicating that it is open', () => {
      const $ = cheerio.load(
        renderComponent('radios', {
          ...EXAMPLE_RADIOS_MINIMAL,
          radios: [
            {
              ...EXAMPLE_RADIO_ITEM_INPUT,
              other: {
                ...EXAMPLE_RADIO_ITEM_INPUT.other,
                open: true,
              },
            },
          ],
        }),
      );

      expect($('.ons-radio__other').hasClass('ons-radio__other--open')).toBe(true);
      expect($('.ons-radio__other').attr('id')).toBe('example-item-input-other-wrap');
      expect($('.ons-radio__input').attr('aria-controls')).toBeUndefined();
      expect($('.ons-radio__input').attr('aria-haspopup')).toBeUndefined();
    });

    it('renders other "input" component for item', () => {
      const faker = templateFaker();
      const inputSpy = faker.spy('input');

      faker.renderComponent('radios', {
        ...EXAMPLE_RADIOS_MINIMAL,
        radios: [EXAMPLE_RADIO_ITEM_INPUT],
      });

      expect(inputSpy.occurrences).toContainEqual({
        id: 'example-text-input',
        name: 'example-text-input-name',
        type: 'text',
        label: {
          id: 'example-text-input-label',
          text: 'Enter your own answer',
          classes: 'ons-u-fw-n',
        },
        classes: 'extra-textbox-class',
        width: 42,
        attributes: EXAMPLE_RADIO_ITEM_INPUT.other.attributes,
        dontWrap: true,
        value: '42',
      });
    });

    it('renders other "select" component for item', () => {
      const faker = templateFaker();
      const selectSpy = faker.spy('select');

      faker.renderComponent('radios', {
        ...EXAMPLE_RADIOS_MINIMAL,
        radios: [EXAMPLE_RADIO_ITEM_SELECT],
      });

      expect(selectSpy.occurrences).toContainEqual({
        id: 'example-select',
        name: 'example-select-name',
        label: {
          id: 'example-select-label',
          text: 'Enter your own answer',
          classes: 'ons-u-fw-n',
        },
        classes: 'extra-select-class',
        dontWrap: true,
        options: EXAMPLE_RADIO_ITEM_SELECT.other.options,
        value: '1',
      });
    });

    it('renders other "checkboxes" component for item', () => {
      const faker = templateFaker();
      const checkboxesSpy = faker.spy('checkboxes');

      faker.renderComponent('radios', {
        ...EXAMPLE_RADIOS_MINIMAL,
        radios: [EXAMPLE_RADIO_ITEM_CHECKBOXES],
      });

      expect(checkboxesSpy.occurrences).toContainEqual({
        id: 'example-checkboxes',
        name: 'example-checkboxes-name',
        checked: undefined,
        borderless: true,
        legend: 'Select preferred times of day',
        legendClasses: 'extra-legend-class',
        attributes: { a: 42 },
        classes: 'ons-js-other-fieldset-radio',
        checkboxes: EXAMPLE_RADIO_ITEM_CHECKBOXES.other.checkboxes,
        autoSelect: EXAMPLE_RADIO_ITEM_CHECKBOXES.other.autoSelect,
        selectAllChildren: true,
      });
    });

    it('renders other "radios" component for item', () => {
      const faker = templateFaker();
      const radiosSpy = faker.spy('radios');

      faker.renderComponent('radios', {
        ...EXAMPLE_RADIOS_MINIMAL,
        radios: [EXAMPLE_RADIO_ITEM_RADIOS],
      });

      expect(radiosSpy.occurrences).toContainEqual({
        id: 'example-radios',
        name: 'example-radios-name',
        borderless: true,
        legend: 'Select preferred times of day',
        legendClasses: 'extra-legend-class ons-u-mb-xs',
        attributes: { a: 42 },
        classes: 'ons-js-other-fieldset-radio',
        radios: EXAMPLE_RADIO_ITEM_RADIOS.other.radios,
      });
    });
  });

  describe('clear radios button', () => {
    const params = {
      ...EXAMPLE_RADIOS_MINIMAL,
      clearRadios: {
        text: 'Clear selection',
        name: 'clear-radios-button',
        ariaClearText: 'You can clear your answer using the clear selection button after the radio inputs',
        ariaClearedText: 'You have cleared your answer',
      },
    };

    it('renders `button` component', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('radios', params);

      expect(buttonSpy.occurrences[0]).toHaveProperty('text', 'Clear selection');
      expect(buttonSpy.occurrences[0]).toHaveProperty('name', 'clear-radios-button');
      expect(buttonSpy.occurrences[0]).toHaveProperty('type', 'submit');
    });

    it('renders a visually hidden element for aria alerts', () => {
      const $ = cheerio.load(renderComponent('radios', params));

      expect($('span[role=alert]').hasClass('ons-u-vh')).toBe(true);
      expect($('span[role=alert]').attr('aria-live')).toBe('polite');
      expect($('span[role=alert]').attr('data-clear')).toBe(params.clearRadios.ariaClearText);
      expect($('span[role=alert]').attr('data-cleared')).toBe(params.clearRadios.ariaClearedText);
    });
  });
});
