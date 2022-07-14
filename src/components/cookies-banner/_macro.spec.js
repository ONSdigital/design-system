/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_COOKIES_BANNER_PARAMS = {
  ariaLabel: 'Cookies banner',
  serviceName: 'ons.gov.uk',
  statementTitle: 'Cookies on',
  settingsLinkText: 'Cookie settings',
  settingsLinkURL: '/cookies',
  statementText:
    '<p>Cookies are small files stored on your device when you visit a website. We store some cookies that are essential to make the site work.</p><p>We would like to set <a href="/cookies">additional cookies</a> to remember your settings and understand how you use the site. This helps us to improve our services. </p>',
  acceptButtonText: 'Accept additional cookies',
  rejectButtonText: 'Reject additional cookies',
  preferencesText: 'You can <a href="/cookies">change your cookie preferences</a> at any time.',
  confirmationButtonText: 'Hide',
  confirmationButtonTextAria: 'the cookie message',
};

describe('macro: cookies-banner', () => {
  describe.each([
    ['no parameters provided', {}],
    ['all parameters provided', EXAMPLE_COOKIES_BANNER_PARAMS],
  ])('mode: %s', (_, params) => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('cookies-banner', params));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has `aria-label` of "Cookies banner"', () => {
      const $ = cheerio.load(renderComponent('cookies-banner', params));

      expect($('.ons-cookies-banner').attr('aria-label')).toBe('Cookies banner');
    });

    describe('initial banner', () => {
      it('has `statementTitle` title text', () => {
        const $ = cheerio.load(renderComponent('cookies-banner', params));

        const statementTitle = $('.ons-cookies-banner__title')
          .text()
          .trim();
        expect(statementTitle).toBe('Cookies on ons.gov.uk');
      });

      it('has `statementText` text', () => {
        const $ = cheerio.load(renderComponent('cookies-banner', params));

        const statementText = $('.ons-cookies-banner__primary .ons-cookies-banner__statement')
          .html()
          .trim();
        expect(statementText).toBe(
          '<p>Cookies are small files stored on your device when you visit a website. We store some cookies that are essential to make the site work.</p><p>We would like to set <a href="/cookies">additional cookies</a> to remember your settings and understand how you use the site. This helps us to improve our services. </p>',
        );
      });

      it('Renders an `accept` button with correct text', () => {
        const faker = templateFaker();
        const buttonSpy = faker.spy('button');

        faker.renderComponent('cookies-banner', params);

        expect(buttonSpy.occurrences[0].text).toBe('Accept additional cookies');
      });

      it('Renders a `reject` button with correct text', () => {
        const faker = templateFaker();
        const buttonSpy = faker.spy('button');

        faker.renderComponent('cookies-banner', params);

        expect(buttonSpy.occurrences[1].text).toBe('Reject additional cookies');
      });

      it('Renders a link with text', () => {
        const $ = cheerio.load(renderComponent('cookies-banner', params));

        const linkText = $('.ons-cookies-banner__link')
          .text()
          .trim();
        expect(linkText).toBe('Cookie settings');
      });

      it('Renders a link with url', () => {
        const $ = cheerio.load(renderComponent('cookies-banner', params));

        const linkText = $('.ons-cookies-banner__link').attr('href');
        expect(linkText).toBe('/cookies');
      });
    });

    describe('confirmation banner', () => {
      it('has `preferencesText` text', () => {
        const $ = cheerio.load(renderComponent('cookies-banner', params));

        const preferencesText = $('.ons-cookies-banner__confirmation .ons-cookies-banner__preferences-text')
          .html()
          .trim();
        expect(preferencesText).toBe('You can <a href="/cookies">change your cookie preferences</a> at any time.');
      });

      it('renders a button with text', () => {
        const faker = templateFaker();
        const buttonSpy = faker.spy('button');

        faker.renderComponent('cookies-banner', params);

        expect(buttonSpy.occurrences[2].text).toBe('Hide');
      });

      it('has the correct `confirmationButtonTextAria` for `buttonContext`', () => {
        const faker = templateFaker();
        const buttonSpy = faker.spy('button');

        faker.renderComponent('cookies-banner', params);

        expect(buttonSpy.occurrences[2].buttonContext).toBe('the cookie message');
      });
    });
  });

  describe('mode: Welsh language', () => {
    it('has the welsh version of default values', () => {
      const $ = cheerio.load(renderComponent('cookies-banner', { lang: 'cy' }));

      const statementTitle = $('.ons-cookies-banner__title')
        .text()
        .trim();
      expect(statementTitle).toBe('Cwcis ar ons.gov.uk');
    });
  });
});
