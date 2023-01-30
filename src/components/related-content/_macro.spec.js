/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { mapAll } from '../../tests/helpers/cheerio';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_RELATED_CONTENT_GENERAL = {
  title: 'Related information',
  id: 'related-general-content',
};

const EXAMPLE_RELATED_CONTENT_LINKS = {
  rows: [
    {
      id: 'related-articles',
      title: 'Related articles',
      iconPosition: 'before',
      iconSize: 'xl',
      itemsList: [
        { text: 'First', url: '/article/first' },
        { text: 'Second', url: '/article/second' },
      ],
    },
    {
      id: 'related-links',
      title: 'Related links',
      iconPosition: 'after',
      iconSize: 'xxl',
      itemsList: [
        { text: 'A', url: '/article/a' },
        { text: 'B', url: '/article/b' },
      ],
    },
  ],
};

describe('macro: related-content', () => {
  describe.each([
    ['general content', EXAMPLE_RELATED_CONTENT_GENERAL],
    ['list of links', EXAMPLE_RELATED_CONTENT_LINKS],
  ])('mode: %s', (_, params) => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('related-content', params));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has a default `aria-label` of "Related content"', () => {
      const $ = cheerio.load(renderComponent('related-content', params));

      expect($('.ons-related-content').attr('aria-label')).toBe('Related content');
    });

    it('has the provided `aria-label`', () => {
      const $ = cheerio.load(
        renderComponent('related-content', {
          ...params,
          ariaLabel: 'Related articles',
        }),
      );

      expect($('.ons-related-content').attr('aria-label')).toBe('Related articles');
    });

    it('has additionally provided style classes', () => {
      const $ = cheerio.load(
        renderComponent('related-content', {
          ...params,
          classes: 'extra-class another-extra-class',
        }),
      );

      expect($('.ons-related-content').hasClass('extra-class')).toBe(true);
      expect($('.ons-related-content').hasClass('another-extra-class')).toBe(true);
    });
  });

  describe('mode: general content', () => {
    it('calls with content', () => {
      const $ = cheerio.load(renderComponent('related-content', { EXAMPLE_RELATED_CONTENT_GENERAL }, 'Example content...'));

      const content = $('.ons-related-content')
        .text()
        .trim();
      expect(content).toEqual(expect.stringContaining('Example content...'));
    });
  });

  describe('mode: list of links', () => {
    it('renders the expected output using the related-content/section macro', () => {
      const faker = templateFaker();
      const sectionSpy = faker.spy('related-content/section');

      faker.renderComponent('related-content', EXAMPLE_RELATED_CONTENT_LINKS);

      expect(sectionSpy.occurrences[0]).toHaveProperty('title', 'Related articles');
      expect(sectionSpy.occurrences[0]).toHaveProperty('id', 'related-articles');
      expect(sectionSpy.occurrences[1]).toHaveProperty('title', 'Related links');
      expect(sectionSpy.occurrences[1]).toHaveProperty('id', 'related-links');
    });

    it('has the `aria-labelledby` attribute for each section of links', () => {
      const $ = cheerio.load(renderComponent('related-content', EXAMPLE_RELATED_CONTENT_LINKS));

      const values = mapAll($('.ons-related-content__navigation'), node => node.attr('aria-labelledby'));
      expect(values).toEqual(['related-articles', 'related-links']);
    });

    it('renders the expected list items using the list macro', () => {
      const faker = templateFaker();
      const listsSpy = faker.spy('lists');

      faker.renderComponent('related-content', EXAMPLE_RELATED_CONTENT_LINKS);

      expect(listsSpy.occurrences[0]).toHaveProperty('iconPosition', 'before');
      expect(listsSpy.occurrences[0]).toHaveProperty('iconSize', 'xl');
      expect(listsSpy.occurrences[0]).toHaveProperty('itemsList', [
        { text: 'First', url: '/article/first' },
        { text: 'Second', url: '/article/second' },
      ]);

      expect(listsSpy.occurrences[1]).toHaveProperty('iconPosition', 'after');
      expect(listsSpy.occurrences[1]).toHaveProperty('iconSize', 'xxl');
      expect(listsSpy.occurrences[1]).toHaveProperty('itemsList', [
        { text: 'A', url: '/article/a' },
        { text: 'B', url: '/article/b' },
      ]);
    });
  });
});
