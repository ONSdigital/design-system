/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_IMAGE_URL_MINIMAL = {
  url: 'example.png',
};

const EXAMPLE_IMAGE_IMAGE_MINIMAL = {
  image: {
    smallSrc: 'example-small.png',
    largeSrc: 'example-large.png',
  },
};

describe('macro: images', () => {
  it('outputs a `figure` element', () => {
    const $ = cheerio.load(renderComponent('images', EXAMPLE_IMAGE_URL_MINIMAL));

    expect($('.ons-figure')[0].tagName).toBe('figure');
  });

  it('outputs a `figurecaption` element when `caption` is provided', () => {
    const $ = cheerio.load(
      renderComponent('images', {
        ...EXAMPLE_IMAGE_URL_MINIMAL,
        caption: 'Example image caption',
      }),
    );

    expect($('.ons-figure__caption')[0].tagName).toBe('figcaption');
  });

  it('outputs a `figurecaption` element with provided `caption` text', () => {
    const $ = cheerio.load(
      renderComponent('images', {
        ...EXAMPLE_IMAGE_URL_MINIMAL,
        caption: 'Example image caption',
      }),
    );

    expect(
      $('.ons-figure__caption')
        .text()
        .trim(),
    ).toBe('Example image caption');
  });

  describe('mode: url', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('images', EXAMPLE_IMAGE_URL_MINIMAL));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('outputs an `img` element', () => {
      const $ = cheerio.load(renderComponent('images', EXAMPLE_IMAGE_URL_MINIMAL));

      expect($('.ons-figure__image')[0].tagName).toBe('img');
    });

    it('outputs an `img` element with the expected `src`', () => {
      const $ = cheerio.load(renderComponent('images', EXAMPLE_IMAGE_URL_MINIMAL));

      expect($('.ons-figure__image').attr('src')).toBe('example.png');
    });

    it('outputs an `img` element with the expected alt text', () => {
      const $ = cheerio.load(
        renderComponent('images', {
          ...EXAMPLE_IMAGE_URL_MINIMAL,
          alt: 'Example alt text',
        }),
      );

      expect($('.ons-figure__image').attr('alt')).toBe('Example alt text');
    });
  });

  describe('mode: image', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('images', EXAMPLE_IMAGE_IMAGE_MINIMAL));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('outputs an `img` element', () => {
      const $ = cheerio.load(renderComponent('images', EXAMPLE_IMAGE_IMAGE_MINIMAL));

      expect($('.ons-figure__image')[0].tagName).toBe('img');
    });

    it('outputs an `img` element with the expected `srcset`', () => {
      const $ = cheerio.load(renderComponent('images', EXAMPLE_IMAGE_IMAGE_MINIMAL));

      expect($('.ons-figure__image').attr('srcset')).toBe('example-small.png 1x, example-large.png 2x');
    });

    it('outputs an `img` element with the expected `src`', () => {
      const $ = cheerio.load(renderComponent('images', EXAMPLE_IMAGE_IMAGE_MINIMAL));

      expect($('.ons-figure__image').attr('src')).toBe('example-small.png');
    });

    it('outputs an `img` element with the expected alt text', () => {
      const $ = cheerio.load(
        renderComponent('images', {
          ...EXAMPLE_IMAGE_IMAGE_MINIMAL,
          alt: 'Example alt text',
        }),
      );

      expect($('.ons-figure__image').attr('alt')).toBe('Example alt text');
    });
  });
});
