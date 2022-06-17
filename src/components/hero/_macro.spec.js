/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_HERO_MINIMAL = {
  title: 'Hero title',
  subtitle: 'Hero subtitle',
  text: 'Hero text',
  suffixText: 'Hero suffix text',
};

const EXAMPLE_HERO_CENSUS_THEME = {
  censusTheme: true,
  ...EXAMPLE_HERO_MINIMAL,
};

const EXAMPLE_HERO_CENSUS_THEME_WITH_IMAGE = {
  ...EXAMPLE_HERO_CENSUS_THEME,
  image: {
    smallSrc: 'example-small.png',
    largeSrc: 'example-large.png',
  },
};

const EXAMPLE_HERO_WITH_BUTTON = {
  ...EXAMPLE_HERO_MINIMAL,
  button: {
    url: '#0',
    text: 'Get started',
  },
};

const EXAMPLE_HERO_WITH_PRETITLE_IMAGE = {
  ...EXAMPLE_HERO_MINIMAL,
  preTitleImage: {
    name: 'example.svg',
    alt: 'svg alt text',
  },
};

const EXAMPLE_HERO_WITH_COLLAPSIBLE = {
  ...EXAMPLE_HERO_MINIMAL,
  collapsible: {
    classes: 'ons-u-mt-s',
    id: 'collapsible',
    title: 'Collapsible title',
    titleTag: 'h2',
    content: 'Collapsible content',
    closeButtonText: 'Hide this',
    closeButtonContextSuffix: 'content',
  },
};

describe('macro: hero', () => {
  describe.each([
    ['with text', EXAMPLE_HERO_MINIMAL],
    ['with census theme', EXAMPLE_HERO_CENSUS_THEME],
    ['with census theme and image', EXAMPLE_HERO_CENSUS_THEME_WITH_IMAGE],
    ['with button', EXAMPLE_HERO_WITH_BUTTON],
    ['with pre-title image', EXAMPLE_HERO_WITH_PRETITLE_IMAGE],
    ['with collapsible', EXAMPLE_HERO_WITH_COLLAPSIBLE],
  ])('mode: %s', (_, params) => {
    it('passes jest-axe checks with', async () => {
      const $ = cheerio.load(renderComponent('hero', params));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has expected `title`', () => {
      const $ = cheerio.load(renderComponent('hero', params));

      const title = $('.ons-hero__title')
        .html()
        .trim();
      expect(title).toBe('Hero title');
    });

    it('has expected `subtitle`', () => {
      const $ = cheerio.load(renderComponent('hero', params));

      const title = $('.ons-hero__subtitle')
        .html()
        .trim();
      expect(title).toBe('Hero subtitle');
    });

    it('has expected `text`', () => {
      const $ = cheerio.load(renderComponent('hero', params));

      const title = $('.ons-hero__text')
        .html()
        .trim();
      expect(title).toBe('Hero text');
    });

    it('has expected `suffixText`', () => {
      const $ = cheerio.load(renderComponent('hero', params));

      const title = $('.ons-hero__suffixText')
        .html()
        .trim();
      expect(title).toBe('Hero suffix text');
    });

    it('has expected class if `wide`', () => {
      const $ = cheerio.load(renderComponent('hero', { wide: true, ...params }));
      expect($('.ons-hero__container').hasClass('ons-container--wide')).toBe(true);
    });
  });

  describe('mode: with census theme', () => {
    it('has the correct theme class', () => {
      const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO_CENSUS_THEME));
      expect($('.ons-hero').hasClass('ons-hero--census')).toBe(true);
    });

    it('has the correct grid column class', () => {
      const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO_CENSUS_THEME));
      expect($('.ons-hero__details').hasClass('ons-col-6@m')).toBe(true);
    });

    it('has the correct title sizing class', () => {
      const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO_CENSUS_THEME));
      expect($('.ons-hero__title').hasClass('ons-u-fs-xxxl')).toBe(true);
    });
  });

  describe('mode: with census theme and image', () => {
    it('has expected `srcset` attribute', () => {
      const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO_CENSUS_THEME_WITH_IMAGE));

      const srcset = $('.ons-hero__circle-image img').attr('srcset');
      expect(srcset).toBe('example-small.png 1x, example-large.png 2x');
    });

    it('has expected `src` attribute', () => {
      const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO_CENSUS_THEME_WITH_IMAGE));

      const src = $('.ons-hero__circle-image img').attr('src');
      expect(src).toBe('example-small.png');
    });

    it('has a "circle-lined" icon', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('hero', EXAMPLE_HERO_CENSUS_THEME_WITH_IMAGE);

      expect(iconsSpy.occurrences[0].iconType).toBe('circle-lined');
    });
  });

  describe('mode: with button', () => {
    it('outputs the expected button', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('hero', EXAMPLE_HERO_WITH_BUTTON);

      expect(buttonSpy.occurrences[0]).toHaveProperty('text', 'Get started');
      expect(buttonSpy.occurrences[0]).toHaveProperty('url', '#0');
    });
  });

  describe('mode: with pre-title image', () => {
    it('has expected `src` attribute', () => {
      const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO_WITH_PRETITLE_IMAGE));

      const src = $('.ons-hero__pre-title').attr('src');
      expect(src).toBe('/img/example--light.svg');
    });

    it('has expected `src` attribute with `censusThemeDark`', () => {
      const $ = cheerio.load(
        renderComponent('hero', {
          censusThemeDark: true,
          ...EXAMPLE_HERO_WITH_PRETITLE_IMAGE,
        }),
      );

      const src = $('.ons-hero__pre-title').attr('src');
      expect(src).toBe('/img/example--dark.svg');
    });

    it('has expected `alt` attribute', () => {
      const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO_WITH_PRETITLE_IMAGE));

      const alt = $('.ons-hero__pre-title').attr('alt');
      expect(alt).toBe('svg alt text');
    });

    it('has provided `placeholderURL`', () => {
      const $ = cheerio.load(
        renderComponent('hero', {
          placeholderURL: '/some-path',
          ...EXAMPLE_HERO_WITH_PRETITLE_IMAGE,
        }),
      );

      const src = $('.ons-hero__pre-title').attr('src');
      expect(src).toBe('/some-path/img/example--light.svg');
    });
  });

  describe('mode: with collapsible', () => {
    it('outputs the expected collapsible', () => {
      const faker = templateFaker();
      const collapsibleSpy = faker.spy('collapsible');

      faker.renderComponent('hero', EXAMPLE_HERO_WITH_COLLAPSIBLE);

      expect(collapsibleSpy.occurrences[0]).toHaveProperty('classes', 'ons-u-mb-s ons-u-mt-s');
      expect(collapsibleSpy.occurrences[0]).toHaveProperty('id', 'collapsible');
      expect(collapsibleSpy.occurrences[0]).toHaveProperty('title', 'Collapsible title');
      expect(collapsibleSpy.occurrences[0]).toHaveProperty('titleTag', 'h2');
      expect(collapsibleSpy.occurrences[0]).toHaveProperty('button.close', 'Hide this');
      expect(collapsibleSpy.occurrences[0]).toHaveProperty('button.contextSuffix', 'content');
    });
  });
});
