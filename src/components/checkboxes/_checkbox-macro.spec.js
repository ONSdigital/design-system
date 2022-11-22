/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_CHECKBOX = {
  id: 'example-checkbox-id',
  name: 'example-checkbox-name',
  value: '123',
  label: {
    classes: 'extra-label-class',
    text: 'Example checkbox',
    description: 'Example label description.',
  },
};

const EXAMPLE_CHECKBOXES_ITEM_INPUT = {
  value: 'input',
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

const EXAMPLE_CHECKBOXES_ITEM_SELECT = {
  value: 'select',
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

const EXAMPLE_CHECKBOXES_ITEM_CHECKBOXES = {
  value: 'checkboxes',
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

const EXAMPLE_CHECKBOXES_ITEM_RADIOS = {
  value: 'radios',
  other: {
    otherType: 'radios',
    id: 'example-radios',
    name: 'example-radios-name',
    legend: 'Select preferred times of day',
    legendClasses: 'extra-legend-class',
    attributes: { a: 42 },
    radios: [EXAMPLE_CHECKBOX],
  },
};

describe('macro: checkboxes/checkbox', () => {
  it('passes jest-axe checks without check', async () => {
    const $ = cheerio.load(renderComponent('checkboxes/checkbox', EXAMPLE_CHECKBOX));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has additionally provided `classes`', () => {
    const $ = cheerio.load(
      renderComponent('checkboxes/checkbox', {
        ...EXAMPLE_CHECKBOX,
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-checkbox').hasClass('extra-class')).toBe(true);
    expect($('.ons-checkbox').hasClass('another-extra-class')).toBe(true);
  });

  it('does not have `no-label` modifier class', () => {
    const $ = cheerio.load(renderComponent('checkboxes/checkbox', EXAMPLE_CHECKBOX));

    expect($('.ons-checkbox').hasClass('ons-checkbox--no-label')).toBe(false);
  });

  it('has `no-label` modifier class when `hideLabel` is `true`', () => {
    const $ = cheerio.load(
      renderComponent('checkboxes/checkbox', {
        ...EXAMPLE_CHECKBOX,
        hideLabel: true,
      }),
    );

    expect($('.ons-checkbox').hasClass('ons-checkbox--no-label')).toBe(true);
  });

  describe('input element', () => {
    it('renders `input` element of type "checkbox"', () => {
      const $ = cheerio.load(renderComponent('checkboxes/checkbox', EXAMPLE_CHECKBOX));

      expect($('.ons-checkbox__input').is('input')).toBe(true);
      expect($('.ons-checkbox__input').attr('type')).toBe('checkbox');
    });

    it('has the provided `id` attribute', () => {
      const $ = cheerio.load(renderComponent('checkboxes/checkbox', EXAMPLE_CHECKBOX));

      expect($('.ons-checkbox__input').attr('id')).toBe('example-checkbox-id');
    });

    it('has the provided `name` attribute', () => {
      const $ = cheerio.load(renderComponent('checkboxes/checkbox', EXAMPLE_CHECKBOX));

      expect($('.ons-checkbox__input').attr('name')).toBe('example-checkbox-name');
    });

    it('does not have the `disabled` attribute when not disabled', () => {
      const $ = cheerio.load(renderComponent('checkboxes/checkbox', EXAMPLE_CHECKBOX));

      expect($('.ons-checkbox__input').attr('disabled')).toBeUndefined();
      expect($('.ons-checkbox__input').attr('aria-disabled')).toBeUndefined();
    });

    it('has the `disabled` attribute when disabled', () => {
      const $ = cheerio.load(
        renderComponent('checkboxes/checkbox', {
          ...EXAMPLE_CHECKBOX,
          disabled: true,
        }),
      );

      expect($('.ons-checkbox__input').attr('disabled')).toBe('disabled');
      expect($('.ons-checkbox__input').attr('aria-disabled')).toBe('true');
    });

    it('does not have the `checked` attribute when not checked', () => {
      const $ = cheerio.load(renderComponent('checkboxes/checkbox', EXAMPLE_CHECKBOX));

      expect($('.ons-checkbox__input').attr('checked')).toBeUndefined();
    });

    it('has the `checked` attribute when checked', () => {
      const $ = cheerio.load(
        renderComponent('checkboxes/checkbox', {
          ...EXAMPLE_CHECKBOX,
          checked: true,
        }),
      );

      expect($('.ons-checkbox__input').attr('checked')).toBe('checked');
    });

    it('has additionally provided `inputClasses`', () => {
      const $ = cheerio.load(
        renderComponent('checkboxes/checkbox', {
          ...EXAMPLE_CHECKBOX,
          inputClasses: 'extra-input-class another-extra-input-class',
        }),
      );

      expect($('.ons-checkbox__input').hasClass('extra-input-class')).toBe(true);
      expect($('.ons-checkbox__input').hasClass('another-extra-input-class')).toBe(true);
    });

    it('does not associate with "other" input when there is none', () => {
      const $ = cheerio.load(renderComponent('checkboxes/checkbox', EXAMPLE_CHECKBOX));

      expect($('.ons-checkbox__input').attr('aria-controls')).toBeUndefined();
      expect($('.ons-checkbox__input').attr('aria-haspopup')).toBeUndefined();
    });

    it('does not associate with "other" input when marked `open`', () => {
      const $ = cheerio.load(
        renderComponent('checkboxes/checkbox', {
          ...EXAMPLE_CHECKBOX,
          other: {
            open: true,
            id: 'other-input-id',
            label: {
              text: 'Other input',
            },
          },
        }),
      );

      expect($('.ons-checkbox__input').attr('aria-controls')).toBeUndefined();
      expect($('.ons-checkbox__input').attr('aria-haspopup')).toBeUndefined();
    });

    it('associates with "other" input when not marked `open`', () => {
      const $ = cheerio.load(
        renderComponent('checkboxes/checkbox', {
          ...EXAMPLE_CHECKBOX,
          other: {
            id: 'other-input-id',
            label: {
              text: 'Other input',
            },
          },
        }),
      );

      expect($('.ons-checkbox__input').attr('aria-controls')).toBe('example-checkbox-id-other-wrap');
      expect($('.ons-checkbox__input').attr('aria-haspopup')).toBe('true');
    });

    it('has additionally provided attributes', () => {
      const $ = cheerio.load(
        renderComponent('checkboxes/checkbox', {
          ...EXAMPLE_CHECKBOX,
          attributes: { a: '123', b: '456' },
        }),
      );

      expect($('.ons-checkbox__input').attr('a')).toBe('123');
      expect($('.ons-checkbox__input').attr('b')).toBe('456');
    });

    it('does not have `data-deselect-message` when `deselectMessage` is not provided', () => {
      const $ = cheerio.load(renderComponent('checkboxes/checkbox', EXAMPLE_CHECKBOX));

      expect($('.ons-checkbox__input').attr('data-deselect-message')).toBeUndefined();
    });

    it('has `data-deselect-message` when `deselectMessage` is provided', () => {
      const $ = cheerio.load(
        renderComponent('checkboxes/checkbox', {
          ...EXAMPLE_CHECKBOX,
          deselectMessage: 'Selecting this will clear your feedback',
        }),
      );

      expect($('.ons-checkbox__input').attr('data-deselect-message')).toBe('Selecting this will clear your feedback');
    });
  });

  describe('label element', () => {
    it('renders label using `label` component', () => {
      const faker = templateFaker();
      const labelSpy = faker.spy('label');

      faker.renderComponent('checkboxes/checkbox', EXAMPLE_CHECKBOX);

      expect(labelSpy.occurrences).toContainEqual({
        id: 'example-checkbox-id-label',
        for: 'example-checkbox-id',
        inputType: 'checkbox',
        text: 'Example checkbox',
        classes: 'ons-checkbox__label extra-label-class',
        description: 'Example label description.',
      });
    });
  });

  it('wraps `other` component without a class indicating that it is open', () => {
    const $ = cheerio.load(
      renderComponent('checkboxes/checkbox', {
        ...EXAMPLE_CHECKBOX,
        ...EXAMPLE_CHECKBOXES_ITEM_INPUT,
      }),
    );

    expect($('.ons-checkbox__other').hasClass('ons-checkbox__other--open')).toBe(false);
    expect($('.ons-checkbox__other').attr('id')).toBe('example-checkbox-id-other-wrap');
  });

  it('wraps `other` component with class indicating that it is open', () => {
    const $ = cheerio.load(
      renderComponent('checkboxes/checkbox', {
        ...EXAMPLE_CHECKBOX,
        ...EXAMPLE_CHECKBOXES_ITEM_INPUT,
        other: {
          ...EXAMPLE_CHECKBOXES_ITEM_INPUT.other,
          open: true,
        },
      }),
    );

    expect($('.ons-checkbox__other').hasClass('ons-checkbox__other--open')).toBe(true);
    expect($('.ons-checkbox__other').attr('id')).toBe('example-checkbox-id-other-wrap');
  });

  it('renders other "input" component for item', () => {
    const faker = templateFaker();
    const inputSpy = faker.spy('input');

    faker.renderComponent('checkboxes/checkbox', {
      ...EXAMPLE_CHECKBOX,
      ...EXAMPLE_CHECKBOXES_ITEM_INPUT,
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
      attributes: EXAMPLE_CHECKBOXES_ITEM_INPUT.other.attributes,
      dontWrap: true,
      value: '42',
    });
  });

  it('renders other "select" component for item', () => {
    const faker = templateFaker();
    const selectSpy = faker.spy('select');

    faker.renderComponent('checkboxes/checkbox', {
      ...EXAMPLE_CHECKBOX,
      ...EXAMPLE_CHECKBOXES_ITEM_SELECT,
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
      options: EXAMPLE_CHECKBOXES_ITEM_SELECT.other.options,
      value: '1',
    });
  });

  it('renders other "checkboxes" component for item', () => {
    const faker = templateFaker();
    const checkboxesSpy = faker.spy('checkboxes');

    faker.renderComponent('checkboxes/checkbox', {
      ...EXAMPLE_CHECKBOX,
      ...EXAMPLE_CHECKBOXES_ITEM_CHECKBOXES,
    });

    expect(checkboxesSpy.occurrences).toContainEqual({
      id: 'example-checkboxes',
      name: 'example-checkboxes-name',
      checked: undefined,
      borderlessParent: false,
      borderless: true,
      legend: 'Select preferred times of day',
      legendClasses: 'extra-legend-class',
      attributes: { a: 42 },
      classes: 'ons-js-other-fieldset-checkbox',
      checkboxes: EXAMPLE_CHECKBOXES_ITEM_CHECKBOXES.other.checkboxes,
      autoSelect: EXAMPLE_CHECKBOXES_ITEM_CHECKBOXES.other.autoSelect,
    });
  });

  it('renders other "radios" component for item', () => {
    const faker = templateFaker();
    const radiosSpy = faker.spy('radios');

    faker.renderComponent('checkboxes/checkbox', {
      ...EXAMPLE_CHECKBOX,
      ...EXAMPLE_CHECKBOXES_ITEM_RADIOS,
    });

    expect(radiosSpy.occurrences).toContainEqual({
      id: 'example-radios',
      name: 'example-radios-name',
      borderless: true,
      legend: 'Select preferred times of day',
      legendClasses: 'extra-legend-class',
      attributes: { a: 42 },
      classes: 'ons-js-other-fieldset-checkbox',
      radios: EXAMPLE_CHECKBOXES_ITEM_RADIOS.other.radios,
    });
  });
});
