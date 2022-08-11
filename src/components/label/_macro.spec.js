/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_LABEL = {
  id: 'example-label',
  for: 'some-input',
  text: 'Example label text',
};

const EXAMPLE_LABEL_WITH_INPUT_TYPE = {
  ...EXAMPLE_LABEL,
  inputType: 'checkbox',
};

const EXAMPLE_LABEL_WITH_DESCRIPTION = {
  ...EXAMPLE_LABEL,
  description: 'An example description',
};

const EXAMPLE_LABEL_WITH_ACCESSIBLE_PLACEHOLDER = {
  ...EXAMPLE_LABEL,
  accessiblePlaceholder: 'An example placeholder',
};

describe('macro: label', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('label', EXAMPLE_LABEL));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('passes jest-axe checks with description', async () => {
    const $ = cheerio.load(renderComponent('label', EXAMPLE_LABEL_WITH_DESCRIPTION));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `id` attribute', () => {
    const $ = cheerio.load(renderComponent('label', EXAMPLE_LABEL));

    expect($('.ons-label').attr('id')).toBe('example-label');
  });

  it('has the provided `for` attribute', () => {
    const $ = cheerio.load(renderComponent('label', EXAMPLE_LABEL));

    expect($('.ons-label').attr('for')).toBe('some-input');
  });

  it('has `aria-describedby` and correct value when description is provided', () => {
    const $ = cheerio.load(renderComponent('label', EXAMPLE_LABEL_WITH_DESCRIPTION));

    expect($('.ons-label').attr('aria-describedby')).toBe('example-label-description-hint');
  });

  it.each([
    ['`inputType` parameter is not provided', EXAMPLE_LABEL, true],
    ['`inputType` parameter is provided', EXAMPLE_LABEL_WITH_INPUT_TYPE, false],
  ])('has the `ons-label` block class when %s', (_, params, expectedState) => {
    const $ = cheerio.load(renderComponent('label', params));

    expect($('label').hasClass('ons-label')).toBe(expectedState);
  });

  it.each([
    ['`description` parameter is not provided', EXAMPLE_LABEL, false],
    ['`description` parameter is provided', EXAMPLE_LABEL_WITH_DESCRIPTION, true],
  ])('has the `ons-label--with-description` modifier class when %s', (_, params, expectedState) => {
    const $ = cheerio.load(renderComponent('label', params));

    expect($('.ons-label').hasClass('ons-label--with-description')).toBe(expectedState);
  });

  it.each([
    ['`accessiblePlaceholder` parameter is not provided', EXAMPLE_LABEL, false],
    ['`accessiblePlaceholder` parameter is provided', EXAMPLE_LABEL_WITH_ACCESSIBLE_PLACEHOLDER, true],
  ])('has the `ons-label--placeholder` modifier class when %s', (_, params, expectedState) => {
    const $ = cheerio.load(renderComponent('label', params));

    expect($('.ons-label').hasClass('ons-label--placeholder')).toBe(expectedState);
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('label', {
        ...EXAMPLE_LABEL,
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-label').hasClass('extra-class')).toBe(true);
    expect($('.ons-label').hasClass('another-extra-class')).toBe(true);
  });

  it('has additionally provided `attributes`', () => {
    const $ = cheerio.load(
      renderComponent('label', {
        ...EXAMPLE_LABEL,
        attributes: {
          a: 123,
          b: 456,
        },
      }),
    );

    expect($('.ons-label').attr('a')).toBe('123');
    expect($('.ons-label').attr('b')).toBe('456');
  });

  it.each([
    ['when without a description', EXAMPLE_LABEL],
    ['when with a description', EXAMPLE_LABEL_WITH_DESCRIPTION],
  ])('has the provided `text` %s', (_, params) => {
    const $ = cheerio.load(renderComponent('label', params));

    expect(
      $('.ons-label')
        .text()
        .trim()
        .startsWith('Example label text'),
    ).toBe(true);
  });

  describe('description element', () => {
    it.each([
      ['when the `inputType` parameter is not provided', EXAMPLE_LABEL_WITH_DESCRIPTION],
      [
        'when the "checkbox" `inputType` parameter is provided',
        {
          ...EXAMPLE_LABEL_WITH_DESCRIPTION,
          inputType: 'checkbox',
        },
      ],
      [
        'when the "radio" `inputType` parameter is provided',
        {
          ...EXAMPLE_LABEL_WITH_DESCRIPTION,
          inputType: 'radio',
        },
      ],
    ])('has the provided `description` text %s', (_, params) => {
      const $ = cheerio.load(renderComponent('label', params));

      expect(
        $('.ons-label__description')
          .text()
          .trim(),
      ).toBe('An example description');
    });

    it('has a default `id` attribute of `description-hint`', () => {
      const $ = cheerio.load(
        renderComponent('label', {
          ...EXAMPLE_LABEL_WITH_DESCRIPTION,
          id: undefined,
        }),
      );

      expect($('.ons-label__description').attr('id')).toBe('description-hint');
    });

    it('has an `id` attribute which adds `-description-hint` to the provided `id`', () => {
      const $ = cheerio.load(renderComponent('label', EXAMPLE_LABEL_WITH_DESCRIPTION));

      expect($('.ons-label__description').attr('id')).toBe('example-label-description-hint');
    });

    it('has the modifier class `ons-input--with-description` when `inputType` is not provided', () => {
      const $ = cheerio.load(renderComponent('label', EXAMPLE_LABEL_WITH_DESCRIPTION));

      expect($('.ons-label__description').hasClass('ons-input--with-description')).toBe(true);
    });

    it.each([
      ['checkbox', 'ons-checkbox__label--with-description'],
      ['radio', 'ons-radio__label--with-description'],
    ])('has an input-specific modifier class when "%s" `inputType` is provided', (inputType, expectedInputSpecificModifier) => {
      const $ = cheerio.load(
        renderComponent('label', {
          ...EXAMPLE_LABEL_WITH_DESCRIPTION,
          inputType,
        }),
      );

      expect($('.ons-label__description').hasClass(expectedInputSpecificModifier)).toBe(true);
      expect($('.ons-label__description').hasClass('ons-input--with-description')).toBe(false);
    });

    it.each([['checkbox'], ['radio']])('has the description in an `aria-hidden` element when "%s" `inputType` is provided', inputType => {
      const $ = cheerio.load(
        renderComponent('label', {
          ...EXAMPLE_LABEL_WITH_DESCRIPTION,
          inputType,
        }),
      );

      expect($('.ons-label__aria-hidden-description').attr('aria-hidden')).toBe('true');
    });

    it.each([['checkbox'], ['radio']])(
      'has a duplicate description in a visually hidden element when "%s" `inputType` is provided',
      inputType => {
        const $ = cheerio.load(
          renderComponent('label', {
            ...EXAMPLE_LABEL_WITH_DESCRIPTION,
            inputType,
          }),
        );

        expect($('.ons-label__visually-hidden-description').hasClass('ons-u-vh')).toBe(true);
      },
    );
  });
});
