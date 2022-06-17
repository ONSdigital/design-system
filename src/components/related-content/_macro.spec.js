/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { mapAll } from '../../tests/helpers/cheerio';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_RELATED_CONTENT_BODY = {
  title: 'Related information',
  body: 'Example body text...',
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
    ['content', EXAMPLE_RELATED_CONTENT_BODY],
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

  describe('mode: content', () => {
    it('has provided body text', () => {
      const $ = cheerio.load(renderComponent('related-content', EXAMPLE_RELATED_CONTENT_BODY));

      expect(
        $('.ons-related-content__body .ons-related-content__body')
          .text()
          .trim(),
      ).toBe('Example body text...');
    });

    it('has inner content when the macro is called', () => {
      const $ = cheerio.load(renderComponent('related-content', EXAMPLE_RELATED_CONTENT_BODY, ['<strong>Content</strong>']));

      expect($('.ons-related-content__body .ons-related-content__body').html()).toContain('<strong>Content</strong>');
    });
  });

  describe('mode: list of links', () => {
    it('has a title heading for each section of links', () => {
      const $ = cheerio.load(renderComponent('related-content', EXAMPLE_RELATED_CONTENT_LINKS));

      const values = mapAll($('.ons-related-content__title'), node => node.text().trim());
      expect(values).toEqual(['Related articles', 'Related links']);
    });

    it('has the `id` attribute for each section heading', () => {
      const $ = cheerio.load(renderComponent('related-content', EXAMPLE_RELATED_CONTENT_LINKS));

      const values = mapAll($('.ons-related-content__title'), node => node.attr('id'));
      expect(values).toEqual(['related-articles', 'related-links']);
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
