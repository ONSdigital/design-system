/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_CARD_WITHOUT_IMAGE = {
  title: 'Example card title',
  text: 'Example card text.',
  textId: 'example-text-id',
};

const EXAMPLE_CARD_WITH_IMAGE = {
  title: 'Example card title',
  text: 'Example card text.',
  textId: 'example-text-id',
  image: {
    smallSrc: 'example-small.png',
    largeSrc: 'example-large.png',
    alt: 'Example alt text',
  },
};

const EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE = {
  title: 'Example card title',
  text: 'Example card text.',
  textId: 'example-text-id',
  image: true,
};

const EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH = {
  title: 'Example card title',
  text: 'Example card text.',
  textId: 'example-text-id',
  image: {
    placeholderURL: '/placeholder-image-url',
  },
};

describe('macro: card', () => {
  describe('mode: without image', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITHOUT_IMAGE));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the provided `title` text', () => {
      const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITHOUT_IMAGE));

      expect(
        $('.ons-card__title')
          .text()
          .trim(),
      ).toBe('Example card title');
    });

    it.each([
      [1, 'h1'],
      [4, 'h4'],
    ])('has the correct element type for the provided `titleSize` (%i -> %s)', (titleSize, expectedTitleTag) => {
      const $ = cheerio.load(
        renderComponent('card', {
          ...EXAMPLE_CARD_WITHOUT_IMAGE,
          titleSize,
        }),
      );

      expect(
        $(`${expectedTitleTag}.ons-card__title`)
          .text()
          .trim(),
      ).toBe('Example card title');
    });

    it('has the provided `text` accessible via the `textId` identifier', () => {
      const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITHOUT_IMAGE));

      expect(
        $('#example-text-id')
          .text()
          .trim(),
      ).toBe('Example card text.');
    });

    it('renders the provided `itemsList` using the `list` component', () => {
      const faker = templateFaker();
      const listsSpy = faker.spy('lists');

      faker.renderComponent('card', {
        ...EXAMPLE_CARD_WITHOUT_IMAGE,
        itemsList: [{ text: 'Test item 1' }, { text: 'Test item 2' }],
      });

      expect(listsSpy.occurrences[0]).toEqual({
        variants: 'dashed',
        itemsList: [{ text: 'Test item 1' }, { text: 'Test item 2' }],
      });
    });

    it('outputs a hyperlink with the provided `url`', () => {
      const $ = cheerio.load(
        renderComponent('card', {
          ...EXAMPLE_CARD_WITHOUT_IMAGE,
          url: 'https://example.com',
        }),
      );

      expect($('.ons-card__link').attr('href')).toBe('https://example.com');
    });
  });

  describe('mode: with image', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_IMAGE));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the provided `title` text', () => {
      const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_IMAGE));

      expect(
        $('.ons-card__title')
          .text()
          .trim(),
      ).toBe('Example card title');
    });

    it.each([
      [1, 'h1'],
      [4, 'h4'],
    ])('has the correct element type for the provided `titleSize` (%i -> %s)', (titleSize, expectedTitleTag) => {
      const $ = cheerio.load(
        renderComponent('card', {
          ...EXAMPLE_CARD_WITH_IMAGE,
          titleSize,
        }),
      );

      expect(
        $(`${expectedTitleTag}.ons-card__title`)
          .text()
          .trim(),
      ).toBe('Example card title');
    });

    it('has the provided `text`', () => {
      const $ = cheerio.load(
        renderComponent('card', {
          ...EXAMPLE_CARD_WITH_IMAGE,
        }),
      );

      expect(
        $('#example-text-id')
          .text()
          .trim(),
      ).toBe('Example card text.');
    });

    it('outputs a hyperlink with the provided `url`', () => {
      const $ = cheerio.load(
        renderComponent('card', {
          ...EXAMPLE_CARD_WITH_IMAGE,
          url: 'https://example.com',
        }),
      );

      expect($('.ons-card__link').attr('href')).toBe('https://example.com');
    });

    describe('with a custom image', () => {
      it('outputs an `img` element', () => {
        const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_IMAGE));

        expect($('.ons-card__image')[0].tagName).toBe('img');
      });

      it('outputs an `img` element with the expected `srcset`', () => {
        const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_IMAGE));

        expect($('.ons-card__image').attr('srcset')).toBe('example-small.png 1x, example-large.png 2x');
      });

      it('outputs an `img` element with the expected `src`', () => {
        const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_IMAGE));

        expect($('.ons-card__image').attr('src')).toBe('example-small.png');
      });

      it('outputs an `img` element with the expected alt text', () => {
        const $ = cheerio.load(
          renderComponent('card', {
            ...EXAMPLE_CARD_WITH_IMAGE,
            alt: 'Example alt text',
          }),
        );

        expect($('.ons-card__image').attr('alt')).toBe('Example alt text');
      });
    });

    describe('with a default placeholder image', () => {
      it('outputs an `img` element', () => {
        const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE));

        expect($('.ons-card__image')[0].tagName).toBe('img');
      });

      it('outputs an `img` element with the expected `srcset`', () => {
        const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE));

        expect($('.ons-card__image').attr('srcset')).toBe('/img/small/placeholder-card.png 1x, /img/large/placeholder-card.png 2x');
      });

      it('outputs an `img` element with the expected `src`', () => {
        const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE));

        expect($('.ons-card__image').attr('src')).toBe('/img/small/placeholder-card.png');
      });

      it('outputs an `img` element with the expected empty alt text', () => {
        const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE));

        expect($('.ons-card__image').attr('alt')).toBe('');
      });
    });

    describe('with a default placeholder image with `placeholderURL`', () => {
      it('outputs an `img` element', () => {
        const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH));

        expect($('.ons-card__image')[0].tagName).toBe('img');
      });

      it('outputs an `img` element with the expected `srcset`', () => {
        const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH));

        expect($('.ons-card__image').attr('srcset')).toBe(
          '/placeholder-image-url/img/small/placeholder-card.png 1x, /placeholder-image-url/img/large/placeholder-card.png 2x',
        );
      });

      it('outputs an `img` element with the expected `src`', () => {
        const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH));

        expect($('.ons-card__image').attr('src')).toBe('/placeholder-image-url/img/small/placeholder-card.png');
      });

      it('outputs an `img` element with the expected empty alt text', () => {
        const $ = cheerio.load(renderComponent('card', EXAMPLE_CARD_WITH_PLACEHOLDER_IMAGE_WITH_PATH));

        expect($('.ons-card__image').attr('alt')).toBe('');
      });
    });
  });
});
