/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_HERO = {
  title: 'Hero title',
  subtitle: 'Hero subtitle',
  text: 'Hero text',
  button: {
    url: '#0',
    text: 'Get started',
  },
};

describe('macro: hero', () => {
  it('passes jest-axe checks with', async () => {
    const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has provided variant style classes', () => {
    const $ = cheerio.load(
      renderComponent('hero', {
        variants: ['variant-a', 'variant-b'],
      }),
    );

    expect($('.ons-hero--variant-a').length).toBe(1);
    expect($('.ons-hero--variant-b').length).toBe(1);
  });

  it('has expected `title`', () => {
    const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO));

    const title = $('.ons-hero__title')
      .html()
      .trim();
    expect(title).toBe('Hero title');
  });

  it('has expected `subtitle`', () => {
    const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO));

    const title = $('.ons-hero__subtitle')
      .html()
      .trim();
    expect(title).toBe('Hero subtitle');
  });

  it('has expected `text`', () => {
    const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO));

    const title = $('.ons-hero__text')
      .html()
      .trim();
    expect(title).toBe('Hero text');
  });

  it('has expected `html`', () => {
    const $ = cheerio.load(renderComponent('hero', { ...EXAMPLE_HERO, html: '<span class="some-html">some html</span>' }));

    const htmlOutput = $('.ons-hero__additional-html').html();
    expect(htmlOutput).toBe('<span class="some-html">some html</span>');
  });

  it('outputs the expected button', () => {
    const faker = templateFaker();
    const buttonSpy = faker.spy('button');

    faker.renderComponent('hero', EXAMPLE_HERO);

    expect(buttonSpy.occurrences[0]).toHaveProperty('text', 'Get started');
    expect(buttonSpy.occurrences[0]).toHaveProperty('url', '#0');
  });

  it('outputs the correct button class with `dark` variant', () => {
    const faker = templateFaker();
    const buttonSpy = faker.spy('button');

    faker.renderComponent('hero', { ...EXAMPLE_HERO, variants: 'dark' });

    expect(buttonSpy.occurrences[0]).toHaveProperty('classes', ' ons-btn--ghost');
  });

  it('calls with content', () => {
    const $ = cheerio.load(renderComponent('hero', { EXAMPLE_HERO }, 'Example content...'));

    const content = $('.ons-hero__additional-content')
      .text()
      .trim();
    expect(content).toEqual(expect.stringContaining('Example content...'));
  });
});
