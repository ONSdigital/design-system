/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

describe('macro: code-highlight', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(
      renderComponent('code-highlight', {
        language: 'js',
        code: 'let a = 42;',
      }),
    );

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the default language modifier style class "markup" when not specified', () => {
    const $ = cheerio.load(
      renderComponent('code-highlight', {
        code: '<p>Example paragraph...</p>',
      }),
    );

    expect($('.ons-patternlib-example__code').hasClass('ons-language-markup')).toBe(true);
  });

  it('has the provided language modifier style class "markup" when not specified', () => {
    const $ = cheerio.load(
      renderComponent('code-highlight', {
        language: 'js',
        code: 'let a = 42;',
      }),
    );

    expect($('.ons-patternlib-example__code').hasClass('ons-language-js')).toBe(true);
  });

  it('has the provided code', () => {
    const $ = cheerio.load(
      renderComponent('code-highlight', {
        language: 'js',
        code: 'let a = 42;',
      }),
    );

    expect(
      $('.ons-patternlib-example__code')
        .text()
        .trim(),
    ).toBe('let a = 42;');
  });
});
