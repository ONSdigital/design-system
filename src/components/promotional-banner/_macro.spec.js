/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_PROMOTIONAL_BANNER_MINIMAL = {
  content: 'Example content with a <a href="#">link</a>',
};

const EXAMPLE_PROMOTIONAL_BANNER_WITH_IMAGE_URL = {
  content: 'Example content with a <a href="#">link</a>',
  image: {
    src: 'example.png',
    alt: 'Example image',
  },
};

const EXAMPLE_PROMOTIONAL_BANNER_WITH_IMAGE_IMAGE = {
  content: 'Example content with a <a href="#">link</a>',
  image: {
    smallSrc: 'example-small.png',
    largeSrc: 'example-large.png',
    alt: 'Example image',
  },
};

describe('macro: promotional-banner', () => {
  describe.each([
    ['without image', EXAMPLE_PROMOTIONAL_BANNER_MINIMAL],
    ['with image url', EXAMPLE_PROMOTIONAL_BANNER_WITH_IMAGE_URL],
    ['with image small/large source', EXAMPLE_PROMOTIONAL_BANNER_WITH_IMAGE_IMAGE],
  ])('mode: %s', (_, params) => {
    it('passes jest-axe checks with', async () => {
      const $ = cheerio.load(renderComponent('promotional-banner', params));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has expected html content', () => {
      const $ = cheerio.load(renderComponent('promotional-banner', params));

      const htmlContent = $('.ons-promo-banner__content')
        .html()
        .trim();
      expect(htmlContent).toBe('Example content with a <a href="#">link</a>');
    });

    it('has expected html content when called', () => {
      const $ = cheerio.load(renderComponent('promotional-banner', params, ['<p>Nested content</p>']));

      const htmlContent = $('.ons-promo-banner__content').html();
      expect(htmlContent).toContain('<p>Nested content</p>');
    });
  });

  describe('mode: with image url', () => {
    it('has expected `src` attribute', () => {
      const $ = cheerio.load(renderComponent('promotional-banner', EXAMPLE_PROMOTIONAL_BANNER_WITH_IMAGE_URL));

      const src = $('.ons-promo-banner__image img').attr('src');
      expect(src).toBe('example.png');
    });

    it('has expected `alt` attribute', () => {
      const $ = cheerio.load(renderComponent('promotional-banner', EXAMPLE_PROMOTIONAL_BANNER_WITH_IMAGE_URL));

      const alt = $('.ons-promo-banner__image img').attr('alt');
      expect(alt).toBe('Example image');
    });
  });

  describe('mode: with image small/large source', () => {
    it('has expected `srcset` attribute', () => {
      const $ = cheerio.load(renderComponent('promotional-banner', EXAMPLE_PROMOTIONAL_BANNER_WITH_IMAGE_IMAGE));

      const srcset = $('.ons-promo-banner__image img').attr('srcset');
      expect(srcset).toBe('example-small.png 1x, example-large.png 2x');
    });

    it('has expected `src` attribute', () => {
      const $ = cheerio.load(renderComponent('promotional-banner', EXAMPLE_PROMOTIONAL_BANNER_WITH_IMAGE_IMAGE));

      const src = $('.ons-promo-banner__image img').attr('src');
      expect(src).toBe('example-small.png');
    });

    it('has expected `alt` attribute', () => {
      const $ = cheerio.load(renderComponent('promotional-banner', EXAMPLE_PROMOTIONAL_BANNER_WITH_IMAGE_IMAGE));

      const alt = $('.ons-promo-banner__image img').attr('alt');
      expect(alt).toBe('Example image');
    });
  });
});
