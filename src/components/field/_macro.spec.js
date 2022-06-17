/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_FIELD_BASIC = {
  id: 'example-field',
};

describe('macro: field', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('field', EXAMPLE_FIELD_BASIC));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `id` attribute', () => {
    const $ = cheerio.load(renderComponent('field', EXAMPLE_FIELD_BASIC));

    expect($('.ons-field').attr('id')).toBe('example-field');
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('field', {
        ...EXAMPLE_FIELD_BASIC,
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-field').hasClass('extra-class')).toBe(true);
    expect($('.ons-field').hasClass('another-extra-class')).toBe(true);
  });

  it('has correct class when `inline` is provided', () => {
    const $ = cheerio.load(
      renderComponent('field', {
        ...EXAMPLE_FIELD_BASIC,
        inline: true,
      }),
    );

    expect($('.ons-field').hasClass('ons-field--inline')).toBe(true);
  });

  it('has additionally provided `attributes`', () => {
    const $ = cheerio.load(
      renderComponent('field', {
        ...EXAMPLE_FIELD_BASIC,
        attributes: {
          a: 123,
          b: 456,
        },
      }),
    );

    expect($('.ons-field').attr('a')).toBe('123');
    expect($('.ons-field').attr('b')).toBe('456');
  });

  it('has the correct element with `dontWrap`', () => {
    const $ = cheerio.load(
      renderComponent('field', {
        ...EXAMPLE_FIELD_BASIC,
        dontWrap: true,
      }),
    );

    expect($('.ons-field').length).toBe(0);
  });

  it('calls with content', () => {
    const $ = cheerio.load(renderComponent('field', EXAMPLE_FIELD_BASIC, 'Example content...'));

    const content = $('.ons-field')
      .html()
      .trim();
    expect(content).toEqual(expect.stringContaining('Example content...'));
  });

  it('calls the error component when `error` is provided', () => {
    const faker = templateFaker();
    const errorSpy = faker.spy('error');

    faker.renderComponent('field', {
      ...EXAMPLE_FIELD_BASIC,
      error: { text: 'There is an error' },
    });

    expect(errorSpy.occurrences[0]).toEqual({
      text: 'There is an error',
    });
  });
});
