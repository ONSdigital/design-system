/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

describe('macro: icons', () => {
  describe.each([
    'arrow-forward',
    'arrow-next',
    'arrow-previous',
    'check',
    'chevron',
    'download',
    'exit',
    'external-link',
    'lock',
    'person',
    'print',
    'quote',
    'search',
    'sort-sprite',
    'facebook',
    'twitter',
    'instagram',
    'linkedin',
    'loader',
    'ons-logo-en',
    'ons-logo-cy',
    'ons-logo-stacked-en',
    'ons-logo-stacked-cy',
    'crest',
    'ogl',
    'circle-lined',
  ])('icon type: %s', iconType => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('icons', { iconType }));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has an svg element', () => {
      const $ = cheerio.load(renderComponent('icons', { iconType }));

      expect($('svg').length).toBe(1);
    });

    it('has additionally provided style classes', () => {
      const $ = cheerio.load(
        renderComponent('icons', {
          iconType,
          classes: 'extra-class another-extra-class',
        }),
      );

      expect($('svg').hasClass('extra-class')).toBe(true);
      expect($('svg').hasClass('another-extra-class')).toBe(true);
    });
  });

  describe.each([
    'arrow-next',
    'arrow-previous',
    'check',
    'chevron',
    'download',
    'exit',
    'external-link',
    'lock',
    'person',
    'print',
    'quote',
    'search',
    'facebook',
    'twitter',
    'instagram',
    'linkedin',
  ])('icon type: %s', iconType => {
    it('has style variation class for provided icon size', () => {
      const $ = cheerio.load(
        renderComponent('icons', {
          iconType,
          iconSize: 'xxl',
        }),
      );

      expect($('svg').hasClass('ons-svg-icon--xxl')).toBe(true);
    });
  });

  describe.each([
    ['ons-logo-en', 'Office for National Statistics logo'],
    ['ons-logo-cy', 'Logo Swyddfa Ystadegau Gwladol'],
    ['ons-logo-stacked-en', 'Office for National Statistics logo'],
    ['ons-logo-stacked-cy', 'Logo Swyddfa Ystadegau Gwladol'],
    ['crest', 'Royal coat of arms of the United Kingdom'],
    ['ogl', 'Open Government License logo'],
  ])('icon type: %s', (iconType, expectedAltText) => {
    it(`has default alt text '${expectedAltText}'`, () => {
      const $ = cheerio.load(renderComponent('icons', { iconType }));

      expect(
        $('title')
          .text()
          .trim(),
      ).toBe(expectedAltText);
    });

    it('has provided alt text', () => {
      const $ = cheerio.load(
        renderComponent('icons', {
          iconType,
          altText: 'Example alt text',
        }),
      );

      expect(
        $('title')
          .text()
          .trim(),
      ).toBe('Example alt text');
    });
  });
});
