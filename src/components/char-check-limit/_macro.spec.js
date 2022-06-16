/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_CHAR_CHECK_LIMIT = {
  id: 'example-char-check-limit',
  charCountSingular: 'You have {x} character remaining',
  charCountPlural: 'You have {x} characters remaining',
  charCountOverLimitSingular: '{x} character too many',
  charCountOverLimitPlural: '{x} characters too many',
};

describe('macro: char-check-limit', () => {
  it('passes jest-axe checks without check', async () => {
    const $ = cheerio.load(renderComponent('char-check-limit', EXAMPLE_CHAR_CHECK_LIMIT));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('passes jest-axe checks with check', async () => {
    const $ = cheerio.load(
      renderComponent(
        'char-check-limit',
        {
          ...EXAMPLE_CHAR_CHECK_LIMIT,
          type: 'check',
        },
        ['<p>Test content.</p>'],
      ),
    );

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `id` attribute', () => {
    const $ = cheerio.load(renderComponent('char-check-limit', EXAMPLE_CHAR_CHECK_LIMIT));

    expect($('.ons-input__limit').attr('id')).toBe('example-char-check-limit-remaining');
  });

  it('has the provided data attributes', () => {
    const $ = cheerio.load(renderComponent('char-check-limit', EXAMPLE_CHAR_CHECK_LIMIT));

    expect($('.ons-input__limit').attr('data-charcount-singular')).toBe('You have {x} character remaining');
    expect($('.ons-input__limit').attr('data-charcount-plural')).toBe('You have {x} characters remaining');
    expect($('.ons-input__limit').attr('data-charcount-limit-singular')).toBe('{x} character too many');
    expect($('.ons-input__limit').attr('data-charcount-limit-plural')).toBe('{x} characters too many');
  });

  it('has expected nested content', () => {
    const $ = cheerio.load(
      renderComponent(
        'char-check-limit',
        {
          ...EXAMPLE_CHAR_CHECK_LIMIT,
          type: 'check',
        },
        ['<p>Test content.</p>'],
      ),
    );

    expect(
      $('.ons-js-char-check-input')
        .html()
        .trim(),
    ).toBe('<p>Test content.</p>');
  });
});
