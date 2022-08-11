/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_EXTERNAL_LINK = {
  url: 'http://example.com',
  linkText: 'Example link',
};

describe('macro: external-link', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('external-link', EXAMPLE_EXTERNAL_LINK));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('external-link', {
        ...EXAMPLE_EXTERNAL_LINK,
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-external-link').hasClass('extra-class')).toBe(true);
    expect($('.ons-external-link').hasClass('another-extra-class')).toBe(true);
  });

  it('has the expected hyperlink URL', async () => {
    const $ = cheerio.load(renderComponent('external-link', EXAMPLE_EXTERNAL_LINK));

    const $hyperlink = $('a.ons-external-link');
    expect($hyperlink.attr('href')).toBe('http://example.com');
  });

  it('opens in a new window when `newWindow` is `true`', () => {
    const $ = cheerio.load(renderComponent('external-link', EXAMPLE_EXTERNAL_LINK));

    expect($('a').attr('target')).toBe('_blank');
    expect($('a').attr('rel')).toBe('noopener');
  });

  it('has the expected link text', async () => {
    const $ = cheerio.load(renderComponent('external-link', EXAMPLE_EXTERNAL_LINK));

    const $hyperlink = $('a.ons-external-link .ons-external-link__text');
    expect($hyperlink.text().trim()).toBe('Example link');
  });

  it('has a default new window description', async () => {
    const $ = cheerio.load(renderComponent('external-link', EXAMPLE_EXTERNAL_LINK));

    expect($('.ons-external-link__new-window-description').text()).toBe(' (opens in a new tab)');
  });

  it('has a custom new window description when `newWindowDescription` is provided', () => {
    const $ = cheerio.load(
      renderComponent('external-link', {
        ...EXAMPLE_EXTERNAL_LINK,
        newWindowDescription: 'custom opens in a new tab text',
      }),
    );

    expect($('.ons-external-link__new-window-description').text()).toBe(' (custom opens in a new tab text)');
  });

  it('has an "external-link" icon', async () => {
    const $ = cheerio.load(renderComponent('external-link', EXAMPLE_EXTERNAL_LINK));

    const $svg = $('.ons-external-link__icon svg');
    expect($svg.length).toBe(1);
  });
});
