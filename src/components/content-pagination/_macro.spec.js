/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_CONTENT_PAGINATION_NONE = {
  contentPaginationItems: [],
};

const EXAMPLE_CONTENT_PAGINATION_PREV_ONLY = {
  contentPaginationItems: [
    {
      rel: 'prev',
      text: 'Previous',
      url: '/guide/overview',
      label: 'Overview',
    },
  ],
};

const EXAMPLE_CONTENT_PAGINATION_NEXT_ONLY = {
  contentPaginationItems: [
    {
      rel: 'next',
      text: 'Next',
      url: '/guide/who-and-why',
      label: 'Who should take part and why',
    },
  ],
};

const EXAMPLE_CONTENT_PAGINATION_BOTH = {
  contentPaginationItems: [
    {
      rel: 'prev',
      text: 'Previous',
      url: '/guide/overview',
      label: 'Overview',
    },
    {
      rel: 'next',
      text: 'Next',
      url: '/guide/who-and-why',
      label: 'Who should take part and why',
    },
  ],
};

describe('macro: content-pagination', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('content-pagination', EXAMPLE_CONTENT_PAGINATION_NONE));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has a default `aria-label` of "Guide pagination"', () => {
    const $ = cheerio.load(renderComponent('content-pagination', EXAMPLE_CONTENT_PAGINATION_NONE));

    expect($('.ons-content-pagination').attr('aria-label')).toBe('Guide pagination');
  });

  it('has the provided `aria-label`', () => {
    const $ = cheerio.load(
      renderComponent('content-pagination', {
        ...EXAMPLE_CONTENT_PAGINATION_NONE,
        ariaLabel: 'Other pages',
      }),
    );

    expect($('.ons-content-pagination').attr('aria-label')).toBe('Other pages');
  });

  it('outputs no list items when `contentPaginationItems` is empty', () => {
    const $ = cheerio.load(renderComponent('content-pagination', EXAMPLE_CONTENT_PAGINATION_NONE));

    expect($('.ons-content-pagination__item').length).toBe(0);
  });

  it('renders the `arrow-previous` icon for the previous link entry', () => {
    const faker = templateFaker();
    const iconsSpy = faker.spy('icons');

    faker.renderComponent('content-pagination', EXAMPLE_CONTENT_PAGINATION_PREV_ONLY);

    expect(iconsSpy.occurrences[0]).toHaveProperty('iconType', 'arrow-previous');
    expect(iconsSpy.occurrences[0]).toHaveProperty('iconSize', 'm');
  });

  it('renders the `arrow-next` icon for the next link entry', () => {
    const faker = templateFaker();
    const iconsSpy = faker.spy('icons');

    faker.renderComponent('content-pagination', EXAMPLE_CONTENT_PAGINATION_NEXT_ONLY);

    expect(iconsSpy.occurrences[0]).toHaveProperty('iconType', 'arrow-next');
    expect(iconsSpy.occurrences[0]).toHaveProperty('iconSize', 'm');
  });

  describe('previous link', () => {
    describe.each([
      ['with only the previous link', EXAMPLE_CONTENT_PAGINATION_PREV_ONLY],
      ['with both the previous and next links', EXAMPLE_CONTENT_PAGINATION_BOTH],
    ])('%s', (_, params) => {
      it('renders a link with the correct URL', () => {
        const $ = cheerio.load(renderComponent('content-pagination', params));

        const prevLink = $('.ons-content-pagination__link[rel="prev"]');
        expect(prevLink.attr('href')).toBe('/guide/overview');
      });

      it('renders the correct pagination item text', () => {
        const $ = cheerio.load(renderComponent('content-pagination', params));

        const linkText = $('.ons-content-pagination__link[rel="prev"] .ons-content-pagination__link-text');
        expect(linkText.text().trim()).toBe('Previous');
      });

      it('renders the expected default `bridgingText`', () => {
        const $ = cheerio.load(renderComponent('content-pagination', params));

        const bridgingText = $('.ons-content-pagination__link[rel="prev"] .ons-content-pagination__link-divider');
        expect(bridgingText.text().trim()).toBe('page in this guide is:');
      });

      it('renders the provided `bridgingText`', () => {
        const $ = cheerio.load(
          renderComponent('content-pagination', {
            contentPaginationItems: params.contentPaginationItems.map(item => ({
              ...item,
              bridgingText: 'custom bridging text:',
            })),
          }),
        );

        const bridgingText = $('.ons-content-pagination__link[rel="prev"] .ons-content-pagination__link-divider');
        expect(bridgingText.text().trim()).toBe('custom bridging text:');
      });

      it('renders the provided `label`', () => {
        const $ = cheerio.load(renderComponent('content-pagination', params));

        const labelText = $('.ons-content-pagination__link[rel="prev"] .ons-content-pagination__link-label');
        expect(labelText.text().trim()).toBe('Overview');
      });
    });
  });

  describe('next link', () => {
    describe.each([
      ['with only the next link', EXAMPLE_CONTENT_PAGINATION_NEXT_ONLY],
      ['with both the previous and next links', EXAMPLE_CONTENT_PAGINATION_BOTH],
    ])('%s', (_, params) => {
      it('renders a link with the correct URL', () => {
        const $ = cheerio.load(renderComponent('content-pagination', params));

        const prevLink = $('.ons-content-pagination__link[rel="next"]');
        expect(prevLink.attr('href')).toBe('/guide/who-and-why');
      });

      it('renders the correct pagination item text', () => {
        const $ = cheerio.load(renderComponent('content-pagination', params));

        const linkText = $('.ons-content-pagination__link[rel="next"] .ons-content-pagination__link-text');
        expect(linkText.text().trim()).toBe('Next');
      });

      it('renders the expected default `bridgingText`', () => {
        const $ = cheerio.load(renderComponent('content-pagination', params));

        const bridgingText = $('.ons-content-pagination__link[rel="next"] .ons-content-pagination__link-divider');
        expect(bridgingText.text().trim()).toBe('page in this guide is:');
      });

      it('renders the provided `bridgingText`', () => {
        const $ = cheerio.load(
          renderComponent('content-pagination', {
            contentPaginationItems: params.contentPaginationItems.map(item => ({
              ...item,
              bridgingText: 'custom bridging text:',
            })),
          }),
        );

        const bridgingText = $('.ons-content-pagination__link[rel="next"] .ons-content-pagination__link-divider');
        expect(bridgingText.text().trim()).toBe('custom bridging text:');
      });

      it('renders the provided `label`', () => {
        const $ = cheerio.load(renderComponent('content-pagination', params));

        const labelText = $('.ons-content-pagination__link[rel="next"] .ons-content-pagination__link-label');
        expect(labelText.text().trim()).toBe('Who should take part and why');
      });
    });
  });
});
