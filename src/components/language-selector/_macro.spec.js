/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_WITH_TWO_LANGUAGES = {
  languages: [
    {
      url: '/english',
      ISOCode: 'en',
      text: 'English',
      abbrText: 'EN',
      current: true,
    },
    {
      url: '/cymraeg',
      ISOCode: 'cy',
      text: 'Cymraeg',
      abbrText: 'CY',
      current: false,
      attributes: {
        a: 123,
        b: 456,
      },
    },
  ],
};

const EXAMPLE_WITH_THREE_LANGUAGES = {
  languages: [
    {
      url: '/english',
      ISOCode: 'en',
      text: 'English',
      current: false,
    },
    {
      url: '/cymraeg',
      ISOCode: 'cy',
      text: 'Cymraeg',
      current: true,
    },
    {
      url: '/polski',
      ISOCode: 'pl',
      text: 'Polski',
      current: false,
    },
  ],
};

describe('macro: language-selector', () => {
  describe('mode: with two languages', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has one language selector displayed', () => {
      const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

      const $items = $('.ons-language-links__item');
      expect($items.length).toBe(1);
    });

    it('does not show the current language', () => {
      const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

      expect($('.ons-language-links__item a span:last-child').text()).toBe('Cymraeg');
    });

    it('has the expected hyperlink URL', async () => {
      const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

      const $hyperlink = $('.ons-language-links__item a');
      expect($hyperlink.attr('href')).toBe('/cymraeg');
    });

    it('has the expected lang attribute value', async () => {
      const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

      expect($('.ons-language-links__item a').attr('lang')).toBe('cy');
    });

    it('has additionally provided `attributes`', () => {
      const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

      expect($('.ons-language-links__item a').attr('a')).toBe('123');
      expect($('.ons-language-links__item a').attr('b')).toBe('456');
    });

    it('does not have a visibility class applied', () => {
      const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

      expect($('.ons-language-links').hasClass('ons-u-d-no@xxs@m')).toBe(false);
    });

    it('has the `abbrText` rendered', () => {
      const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

      expect($('.ons-language-links__item a span:first-child').text()).toBe('CY');
    });
  });

  describe('mode: with three languages', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_THREE_LANGUAGES));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has two language selectors displayed', () => {
      const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_THREE_LANGUAGES));

      const $items = $('.ons-language-links__item');
      expect($items.length).toBe(2);
    });

    it('does not show the current language', () => {
      const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_THREE_LANGUAGES));

      expect($('.ons-language-links__item:first-child a').text()).toBe('English');
      expect($('.ons-language-links__item:last-child a').text()).toBe('Polski');
    });

    it('has the visibility class applied', () => {
      const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_THREE_LANGUAGES));

      expect($('.ons-language-links').hasClass('ons-u-d-no@xxs@m')).toBe(true);
    });
  });
});
