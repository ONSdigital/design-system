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
    smallSrc: '/example-small.png',
    largeSrc: '/example-large.png',
    alt: 'Alternative text',
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
  });
});
