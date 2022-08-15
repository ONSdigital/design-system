/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_BROWSER_BANNER_DEFAULT = {};

describe('macro: browser-banner', () => {
  it('passes jest-axe checks with', async () => {
    const $ = cheerio.load(renderComponent('browser-banner', EXAMPLE_BROWSER_BANNER_DEFAULT));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the default `bannerLeadingText`', () => {
    const $ = cheerio.load(renderComponent('browser-banner', EXAMPLE_BROWSER_BANNER_DEFAULT));

    const bannerLeadingText = $('.ons-browser-banner__lead')
      .text()
      .trim();
    expect(bannerLeadingText).toBe('This website no longer supports your browser.');
  });

  it('has the default `bannerCTA`', () => {
    const $ = cheerio.load(renderComponent('browser-banner', EXAMPLE_BROWSER_BANNER_DEFAULT));

    const bannerCtaHtml = $('.ons-browser-banner__cta')
      .text()
      .trim();
    expect(bannerCtaHtml).toBe('You can upgrade your browser to the latest version.');
  });

  it('has the default `bannerLinkUrl`', () => {
    const $ = cheerio.load(renderComponent('browser-banner', EXAMPLE_BROWSER_BANNER_DEFAULT));

    expect($('.ons-browser-banner__link').attr('href')).toBe('https://www.ons.gov.uk/help/browsers');
  });

  it('has `container--wide` class when `wide` is true', () => {
    const $ = cheerio.load(
      renderComponent('browser-banner', {
        ...EXAMPLE_BROWSER_BANNER_DEFAULT,
        wide: true,
      }),
    );

    expect($('.ons-container').hasClass('ons-container--wide')).toBe(true);
  });

  it('does not have `container--wide` class when `wide` is not set', () => {
    const $ = cheerio.load(
      renderComponent('browser-banner', {
        ...EXAMPLE_BROWSER_BANNER_DEFAULT,
      }),
    );

    expect($('.ons-container').hasClass('ons-container--wide')).toBe(false);
  });

  it('has `container--full-width` class when `fullWidth` is true', () => {
    const $ = cheerio.load(
      renderComponent('browser-banner', {
        ...EXAMPLE_BROWSER_BANNER_DEFAULT,
        fullWidth: true,
      }),
    );

    expect($('.ons-container').hasClass('ons-container--full-width')).toBe(true);
  });

  it('does not have `container--full-width` class when `fullWidth` is not set', () => {
    const $ = cheerio.load(
      renderComponent('browser-banner', {
        ...EXAMPLE_BROWSER_BANNER_DEFAULT,
      }),
    );

    expect($('.ons-container').hasClass('ons-container--full-width')).toBe(false);
  });
});

describe('mode: Welsh language', () => {
  it('has the welsh version of default `bannerLeadingText`', () => {
    const $ = cheerio.load(
      renderComponent('browser-banner', {
        ...EXAMPLE_BROWSER_BANNER_DEFAULT,
        lang: 'cy',
      }),
    );

    const bannerLeadingText = $('.ons-browser-banner__lead')
      .text()
      .trim();
    expect(bannerLeadingText).toBe('Nid yw’r wefan hon yn cefnogi eich porwr mwyach.');
  });

  it('has the welsh version of default `bannerCTA`', () => {
    const $ = cheerio.load(renderComponent('browser-banner', { lang: 'cy' }));

    const bannerCtaHtml = $('.ons-browser-banner__cta')
      .text()
      .trim();
    expect(bannerCtaHtml).toBe('Gallwch ddiweddaru eich porwr i’r fersiwn ddiweddaraf.');
  });

  it('has the welsh version of default `bannerLinkUrl`', () => {
    const $ = cheerio.load(renderComponent('browser-banner', { lang: 'cy' }));

    expect($('.ons-browser-banner__link').attr('href')).toBe('https://cy.ons.gov.uk/help/browsers');
  });
});
