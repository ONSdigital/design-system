/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_COOKIES_BANNER_MINIMAL = {
  statementTitle: 'Tell us whether you accept cookies',
  statementText:
    'We use <a href="#0">cookies to collect information</a> about how you use census.gov.uk. We use this information to make the website work as well as possible and improve our services.',
  confirmationText: 'You’ve accepted all cookies. You can <a href="#0">change your cookie preferences</a> at any time.',
};

const EXAMPLE_COOKIES_BANNER = {
  ...EXAMPLE_COOKIES_BANNER_MINIMAL,
  ariaLabel: 'the cookies banner',
  primaryButtonText: 'Accept cookies',
  secondaryButtonText: 'Set preferences',
  secondaryButtonUrl: 'https://example.com/cookies/set-preferences',
  confirmationButtonText: 'Close',
  confirmationButtonTextAria: 'the cookie banner',
};

describe('macro: cookies-banner', () => {
  it.each([
    ['minimal parameters', EXAMPLE_COOKIES_BANNER_MINIMAL],
    ['all parameters', EXAMPLE_COOKIES_BANNER],
  ])('passes jest-axe checks with %s', async (_, params) => {
    const $ = cheerio.load(renderComponent('cookies-banner', params));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has a `role` of "region"', () => {
    const $ = cheerio.load(renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER_MINIMAL));

    expect($('.ons-cookies-banner').attr('role')).toBe('region');
  });

  it('has a default `aria-label` of "Cookies banner"', () => {
    const $ = cheerio.load(renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER_MINIMAL));

    expect($('.ons-cookies-banner').attr('aria-label')).toBe('Cookies banner');
  });

  it('has the provided `ariaLabel` for `aria-label`', () => {
    const $ = cheerio.load(renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER));

    expect($('.ons-cookies-banner').attr('aria-label')).toBe('the cookies banner');
  });

  describe('content', () => {
    it('has provided `statementTitle` title text', () => {
      const $ = cheerio.load(renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER_MINIMAL));

      const statementTitle = $('.ons-cookies-banner__title')
        .text()
        .trim();
      expect(statementTitle).toBe('Tell us whether you accept cookies');
    });

    it('has provided `statementText` text', () => {
      const $ = cheerio.load(renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER_MINIMAL));

      const statementText = $('.ons-cookies-banner__primary .ons-cookies-banner__desc')
        .html()
        .trim();
      expect(statementText).toBe(
        'We use <a href="#0">cookies to collect information</a> about how you use census.gov.uk. We use this information to make the website work as well as possible and improve our services.',
      );
    });

    it('has provided `confirmationText` text', () => {
      const $ = cheerio.load(renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER_MINIMAL));

      const statementText = $('.ons-cookies-banner__confirmation .ons-cookies-banner__desc')
        .html()
        .trim();
      expect(statementText).toBe('You’ve accepted all cookies. You can <a href="#0">change your cookie preferences</a> at any time.');
    });
  });

  describe('primary button', () => {
    it('assumes default text "Accept all cookies"', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER_MINIMAL);

      expect(buttonSpy.occurrences[0].text).toBe('Accept all cookies');
    });

    it('has provided `primaryButtonText` text', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER);

      expect(buttonSpy.occurrences[0].text).toBe('Accept cookies');
    });
  });

  describe('secondary button', () => {
    it('assumes default text "Set cookie preferences"', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER_MINIMAL);

      expect(buttonSpy.occurrences[1].text).toBe('Set cookie preferences');
    });

    it('has provided `secondaryButtonText` text', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER);

      expect(buttonSpy.occurrences[1].text).toBe('Set preferences');
    });

    it('has provided `secondaryButtonUrl`', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER);

      expect(buttonSpy.occurrences[1].url).toBe('https://example.com/cookies/set-preferences');
    });
  });

  describe('confirmation button', () => {
    it('assumes default text "Hide"', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER_MINIMAL);

      expect(buttonSpy.occurrences[2].text).toBe('Hide');
    });

    it('has provided `confirmationButtonText` text', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER);

      expect(buttonSpy.occurrences[2].text).toBe('Close');
    });

    it('has a default `aria-label` of "cookie banner"', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER_MINIMAL);

      expect(buttonSpy.occurrences[2].buttonContext).toBe('the cookie message');
    });

    it('has the provided `ariaLabel` for `aria-label`', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('cookies-banner', EXAMPLE_COOKIES_BANNER);

      expect(buttonSpy.occurrences[2].buttonContext).toBe('the cookie banner');
    });
  });
});
