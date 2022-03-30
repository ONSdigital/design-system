/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_PASSWORD_MINIMAL = {
  id: 'example-password',
  name: 'example-password-name',
  label: {
    text: 'Label text',
    description: 'Description text',
    classes: 'extra-label-class',
  },
  showPasswordText: 'Show password',
};

const EXAMPLE_PASSWORD = {
  ...EXAMPLE_PASSWORD_MINIMAL,
  fieldId: 'example-password-field',
  fieldClasses: 'extra-field-class',
};

const EXAMPLE_PASSWORD_WITH_ERROR = {
  ...EXAMPLE_PASSWORD,
  error: {
    id: 'example-error',
    text: 'Error text...',
  },
};

describe('macro: password', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('password', EXAMPLE_PASSWORD));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('passes jest-axe checks when error is shown', async () => {
    const $ = cheerio.load(renderComponent('password', EXAMPLE_PASSWORD_WITH_ERROR));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('provides expected parameters to the inner `field` component', () => {
    const faker = templateFaker();
    const fieldSpy = faker.spy('field');

    cheerio.load(faker.renderComponent('password', EXAMPLE_PASSWORD));

    expect(fieldSpy.occurrences[0]).toEqual({
      id: 'example-password-field',
      classes: 'ons-js-password extra-field-class',
      error: undefined,
    });
  });

  it('provides expected parameters to the inner `field` component when there is an error', () => {
    const faker = templateFaker();
    const fieldSpy = faker.spy('field');

    cheerio.load(faker.renderComponent('password', EXAMPLE_PASSWORD_WITH_ERROR));

    expect(fieldSpy.occurrences[0]).toEqual({
      id: 'example-password-field',
      classes: 'ons-js-password extra-field-class',
      error: {
        id: 'example-error',
        text: 'Error text...',
      },
    });
  });

  it('provides expected parameters to the inner `label` component', () => {
    const faker = templateFaker();
    const labelSpy = faker.spy('label');

    cheerio.load(faker.renderComponent('password', EXAMPLE_PASSWORD));

    expect(labelSpy.occurrences[0]).toEqual({
      for: 'example-password',
      text: 'Label text',
      description: 'Description text',
      classes: 'extra-label-class',
    });
  });

  it('provides expected parameters to the inner `checkbox` component', () => {
    const faker = templateFaker();
    const checkboxSpy = faker.spy('checkboxes/checkbox');

    cheerio.load(faker.renderComponent('password', EXAMPLE_PASSWORD));

    expect(checkboxSpy.occurrences[0]).toEqual({
      id: 'example-password-toggle',
      classes: 'ons-js-password-toggle-wrap ons-checkbox--toggle ons-u-d-no',
      inputClasses: 'ons-js-password-toggle',
      name: 'show-password',
      label: {
        text: 'Show password',
      },
    });
  });

  it('provides expected parameters to the inner `input` component', () => {
    const faker = templateFaker();
    const inputSpy = faker.spy('input');

    cheerio.load(faker.renderComponent('password', EXAMPLE_PASSWORD));

    expect(inputSpy.occurrences[0]).toEqual({
      id: 'example-password',
      name: 'example-password-name',
      type: 'password',
      classes: 'ons-u-mt-xs ons-js-password-input',
      dontWrap: true,
    });
  });

  it('provides expected parameters to the inner `input` component when error is shown', () => {
    const faker = templateFaker();
    const inputSpy = faker.spy('input');

    cheerio.load(faker.renderComponent('password', EXAMPLE_PASSWORD_WITH_ERROR));

    expect(inputSpy.occurrences[0]).toEqual({
      id: 'example-password',
      name: 'example-password-name',
      type: 'password',
      classes: 'ons-u-mt-xs ons-js-password-input ons-input--error',
      dontWrap: true,
    });
  });
});
