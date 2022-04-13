/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_SHARE_PAGE = {
  title: 'Share page',
  pageTitle: 'An example page',
  pageURL: 'https://example.com/an-example-page',
  facebook: true,
  twitter: true,
};

describe('macro: share-page', () => {
  it('passes jest-axe checks with', async () => {
    const $ = cheerio.load(renderComponent('share-page', EXAMPLE_SHARE_PAGE));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('wraps title in <h2> element by default', () => {
    const $ = cheerio.load(renderComponent('share-page', EXAMPLE_SHARE_PAGE));

    expect(
      $('h2')
        .text()
        .trim(),
    ).toBe('Share page');
  });

  it('wraps title in custom element when `titleTag` is provided', () => {
    const $ = cheerio.load(
      renderComponent('share-page', {
        ...EXAMPLE_SHARE_PAGE,
        titleTag: 'h4',
      }),
    );

    expect(
      $('h4')
        .text()
        .trim(),
    ).toBe('Share page');
  });

  it('uses the provided icon size', () => {
    const faker = templateFaker();
    const listsSpy = faker.spy('lists');

    faker.renderComponent('share-page', {
      ...EXAMPLE_SHARE_PAGE,
      iconSize: 'xl',
    });

    expect(listsSpy.occurrences[0].iconSize).toBe('xl');
  });

  describe('Share on Twitter', () => {
    it('has a link with the expected url', () => {
      const faker = templateFaker();
      const listsSpy = faker.spy('lists');

      faker.renderComponent('share-page', EXAMPLE_SHARE_PAGE);

      const twitterItem = listsSpy.occurrences[0].itemsList.find(item => item.text === 'Twitter');
      expect(twitterItem.url).toBe(
        'https://twitter.com/intent/tweet?original_referer&text=An%20example%20page&url=https%3A%2F%2Fexample.com%2Fan-example-page',
      );
    });

    it('has a link which opens in a new tab', () => {
      const faker = templateFaker();
      const listsSpy = faker.spy('lists');

      faker.renderComponent('share-page', EXAMPLE_SHARE_PAGE);

      const twitterItem = listsSpy.occurrences[0].itemsList.find(item => item.text === 'Twitter');
      expect(twitterItem.rel).toContain('noreferrer');
      expect(twitterItem.rel).toContain('external');
      expect(twitterItem.target).toBe('_blank');
    });
  });

  describe('Share on Facebook', () => {
    it('has a link with the expected url', () => {
      const faker = templateFaker();
      const listsSpy = faker.spy('lists');

      faker.renderComponent('share-page', EXAMPLE_SHARE_PAGE);

      const facebookItem = listsSpy.occurrences[0].itemsList.find(item => item.text === 'Facebook');
      expect(facebookItem.url).toBe('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexample.com%2Fan-example-page');
    });

    it('has a link which opens in a new tab', () => {
      const faker = templateFaker();
      const listsSpy = faker.spy('lists');

      faker.renderComponent('share-page', EXAMPLE_SHARE_PAGE);

      const facebookItem = listsSpy.occurrences[0].itemsList.find(item => item.text === 'Facebook');
      expect(facebookItem.rel).toContain('noreferrer');
      expect(facebookItem.rel).toContain('external');
      expect(facebookItem.target).toBe('_blank');
    });
  });
});
