/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

describe('macro: quote', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(
      renderComponent('quote', {
        text: 'Example quote text.',
        ref: 'Example quote reference.',
      }),
    );

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `text` text', () => {
    const $ = cheerio.load(
      renderComponent('quote', {
        text: 'Example quote text.',
      }),
    );

    expect(
      $('.ons-quote__text')
        .text()
        .trim(),
    ).toBe('Example quote text.');
  });

  it('has the provided `ref` text with a leading "—" character', () => {
    const $ = cheerio.load(
      renderComponent('quote', {
        text: 'Example quote text.',
        ref: 'Example quote reference.',
      }),
    );

    expect(
      $('.ons-quote__ref')
        .text()
        .trim(),
    ).toBe('— Example quote reference.');
  });

  it('has a default `textFontSize` of "l"', () => {
    const $ = cheerio.load(
      renderComponent('quote', {
        text: 'Example quote text.',
      }),
    );

    expect($('.ons-quote__text').hasClass('ons-u-fs-l')).toBe(true);
  });

  it('has the provided `textFontSize`', () => {
    const $ = cheerio.load(
      renderComponent('quote', {
        text: 'Example quote text.',
        textFontSize: 's',
      }),
    );

    expect($('.ons-quote__text').hasClass('ons-u-fs-s')).toBe(true);
  });

  it('has `quote` icon', () => {
    const faker = templateFaker();
    const iconsSpy = faker.spy('icons');

    faker.renderComponent('quote', {
      text: 'Example quote text.',
    });

    expect(iconsSpy.occurrences[0].iconType).toBe('quote');
  });
});
