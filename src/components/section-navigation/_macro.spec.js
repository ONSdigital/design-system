/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { mapAll } from '../../tests/helpers/cheerio';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_SECTION_NAVIGATION = {
  id: 'section-menu',
  currentPath: '/results',
  itemsList: [
    {
      title: 'Results',
      url: '/results',
    },
    {
      title: 'Dashboard',
      url: '/results/dashboard',
    },
  ],
};

const EXAMPLE_SECTION_NAVIGATION_VERTICAL = {
  variants: 'vertical',
  currentPath: '#section-2',
  itemsList: [
    {
      title: 'Section 1',
      url: '#section-1',
    },
    {
      title: 'Section 2',
      url: '#section-2',
      anchors: [
        {
          title: 'Sub section 1',
          url: '#sub-section-1',
        },
        {
          title: 'Sub section 2',
          url: '#sub-section-2',
        },
        {
          title: 'Sub section 3',
          url: '#sub-section-3',
        },
      ],
    },
    {
      title: 'Section 3',
      url: '#0',
    },
  ],
};

describe('macro: section-navigation', () => {
  describe('variant: horizontal', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('section-navigation', EXAMPLE_SECTION_NAVIGATION));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('does not have the `vertical` modifier class', async () => {
      const $ = cheerio.load(renderComponent('section-navigation', EXAMPLE_SECTION_NAVIGATION));

      expect($('.ons-section-nav').hasClass('ons-section-nav--vertical')).toBe(false);
    });
  });

  describe('variant: vertical', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('section-navigation', EXAMPLE_SECTION_NAVIGATION_VERTICAL));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the `vertical` modifier class', async () => {
      const $ = cheerio.load(renderComponent('section-navigation', EXAMPLE_SECTION_NAVIGATION_VERTICAL));

      expect($('.ons-section-nav').hasClass('ons-section-nav--vertical')).toBe(true);
    });
  });

  it('has the provided `id` attribute', () => {
    const $ = cheerio.load(renderComponent('section-navigation', EXAMPLE_SECTION_NAVIGATION));

    expect($('.ons-section-nav').attr('id')).toBe('section-menu');
  });

  it('has the provided custom `classes`', () => {
    const $ = cheerio.load(renderComponent('section-navigation', { ...EXAMPLE_SECTION_NAVIGATION, classes: 'custom-class' }));

    expect($('.ons-section-nav').hasClass('custom-class')).toBe(true);
  });

  it('has the provided `ariaLabel` parameter', () => {
    const $ = cheerio.load(
      renderComponent('section-navigation', {
        ...EXAMPLE_SECTION_NAVIGATION,
        ariaLabel: 'Section navigation menu',
      }),
    );

    expect($('.ons-section-nav').attr('aria-label')).toBe('Section navigation menu');
  });

  it('assumes a default `ariaLabel` of "Section menu"', () => {
    const $ = cheerio.load(renderComponent('section-navigation', EXAMPLE_SECTION_NAVIGATION));

    expect($('.ons-section-nav').attr('aria-label')).toBe('Section menu');
  });

  describe('navigation items', () => {
    it('renders top level navigation items', () => {
      const $ = cheerio.load(renderComponent('section-navigation', EXAMPLE_SECTION_NAVIGATION));

      const itemLabels = mapAll($('.ons-section-nav__item .ons-section-nav__link'), node => node.text().trim());
      expect(itemLabels).toEqual(['Results', 'Dashboard']);

      const itemLinks = mapAll($('.ons-section-nav__item .ons-section-nav__link'), node => node.attr('href'));
      expect(itemLinks).toEqual(['/results', '/results/dashboard']);
    });

    it('has additionally provided style classes', () => {
      const $ = cheerio.load(
        renderComponent('section-navigation', {
          currentPath: '#section-1',
          itemsList: [
            {
              classes: 'extra-class another-extra-class',
              title: 'Section 1',
              url: '#section-1',
            },
          ],
        }),
      );

      expect($('.ons-section-nav__item').hasClass('extra-class')).toBe(true);
      expect($('.ons-section-nav__item').hasClass('another-extra-class')).toBe(true);
    });

    it('marks the current item with a class when `currentPath` is provided', () => {
      const $ = cheerio.load(renderComponent('section-navigation', EXAMPLE_SECTION_NAVIGATION));

      expect(
        $('.ons-section-nav__item--active')
          .text()
          .trim(),
      ).toBe('Results');
    });

    it('marks the current item with a class when `tabQuery` is provided', () => {
      const $ = cheerio.load(
        renderComponent('section-navigation', {
          ...EXAMPLE_SECTION_NAVIGATION,
          currentPath: undefined,
          tabQuery: 'dashboard',
        }),
      );

      expect(
        $('.ons-section-nav__item--active')
          .text()
          .trim(),
      ).toBe('Dashboard');
    });

    it('marks the current item with `aria-current` when `currentPath` is provided', () => {
      const $ = cheerio.load(renderComponent('section-navigation', EXAMPLE_SECTION_NAVIGATION));

      expect($('.ons-section-nav__item--active .ons-section-nav__link').attr('aria-current')).toBe('location');
    });

    it('marks the current item with `aria-current` when `tabQuery` is provided', () => {
      const $ = cheerio.load(
        renderComponent('section-navigation', {
          ...EXAMPLE_SECTION_NAVIGATION,
          currentPath: undefined,
          tabQuery: 'dashboard',
        }),
      );

      expect($('.ons-section-nav__item--active .ons-section-nav__link').attr('aria-current')).toBe('location');
    });

    describe('nested anchor navigation items', () => {
      it('renders anchor navigation list for top-level items that define `anchors`', () => {
        const $ = cheerio.load(renderComponent('section-navigation', EXAMPLE_SECTION_NAVIGATION_VERTICAL));

        expect($('.ons-section-nav__list > .ons-section-nav__item:nth-child(1) .ons-section-nav__sub-items').length).toBe(0);
        expect($('.ons-section-nav__list > .ons-section-nav__item:nth-child(2) .ons-section-nav__sub-items').length).toBe(1);
        expect($('.ons-section-nav__list > .ons-section-nav__item:nth-child(3) .ons-section-nav__sub-items').length).toBe(0);
      });

      it('renders the expected anchor navigation items', () => {
        const $ = cheerio.load(renderComponent('section-navigation', EXAMPLE_SECTION_NAVIGATION_VERTICAL));

        const itemLabels = mapAll($('.ons-section-nav__sub-items .ons-section-nav__item .ons-section-nav__link'), node =>
          node.text().trim(),
        );
        expect(itemLabels).toEqual(['Sub section 1', 'Sub section 2', 'Sub section 3']);

        const itemLinks = mapAll($('.ons-section-nav__sub-items .ons-section-nav__item .ons-section-nav__link'), node => node.attr('href'));
        expect(itemLinks).toEqual(['#sub-section-1', '#sub-section-2', '#sub-section-3']);
      });
    });
  });
});
