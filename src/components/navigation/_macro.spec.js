/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';
import { mapAll } from '../../tests/helpers/cheerio';

const PARAMS = {
  id: 'main-nav',
  ariaLabel: 'Main menu',
  currentPath: ['#1', '/sub-item-1', '/sub-item-2/child-item-1'],
  currentPageTitle: 'Main nav item 2',
  itemsList: [
    {
      title: 'Main nav item 1',
      ariaLabel: 'Main nav ariaLabel 1',
      url: '#0',
      classes: 'custom-class-main-item-1',
      id: 'main-item-1',
    },
    {
      title: 'Main nav item 2',
      ariaLabel: 'Main nav ariaLabel 2',
      url: '#1',
      classes: 'custom-class-main-item-2',
      id: 'main-item-2',
    },
  ],
  subNavigation: {
    id: 'sub-nav',
    overviewURL: '#overview',
    overviewText: 'Overview',
    ariaLabel: 'Section menu',
    itemsList: [
      {
        title: 'Sub nav item 1',
        ariaLabel: 'Sub nav ariaLabel 1',
        url: '/sub-item-1',
        classes: 'custom-class-sub-item-1',
        id: 'sub-item-1',
      },
      {
        title: 'Sub nav item 2',
        ariaLabel: 'Sub nav ariaLabel 2',
        url: '/sub-item-2',
        classes: 'custom-class-sub-item-2',
        id: 'sub-item-2',
        sections: [
          {
            sectionTitle: 'Section 1',
            children: [
              {
                title: 'Child item 1',
                ariaLabel: 'Child item ariaLabel 1',
                url: '/sub-item-2/child-item-1',
                id: 'child-item-1',
              },
              {
                title: 'Child item 2',
                ariaLabel: 'Child item ariaLabel 2',
                url: '/sub-item-2/child-item-2',
                id: 'child-item-2',
              },
            ],
          },
        ],
      },
    ],
  },
};

const SITE_SEARCH_AUTOSUGGEST = {
  label: 'Search the design system',
  instructions:
    "Use up and down keys to navigate results once you've typed more than two characters. Use the enter key to select a result. Touch device users, explore by touch or with swipe gestures.",
  ariaYouHaveSelected: 'You have selected',
  ariaMinChars: 'Enter 3 or more characters for results.',
  ariaResultsLabel: 'Search results',
  ariaOneResult: 'There is one result available.',
  ariaNResults: 'There are {n} results available.',
  ariaLimitedResults: 'Results have been limited to 10 results. Type more characters to improve your search',
  moreResults: 'Continue entering to improve results',
  resultsTitle: 'Search results',
  autosuggestData: '/search-index.json',
  noResults: 'No results found',
  typeMore: 'Continue entering to get results',
};

describe('macro: navigation', () => {
  describe('level: container', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has the correct container if `fullWidth`', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: { ...PARAMS, fullWidth: true } }));

      expect($('.ons-container').hasClass('ons-container--full-width')).toBe(true);
    });

    it('has the correct container if `params.wide` is provided', () => {
      const $ = cheerio.load(renderComponent('navigation', { wide: true, navigation: PARAMS }));

      expect($('.ons-navigation-wrapper .ons-container').hasClass('ons-container--wide')).toBe(true);
    });

    it('has the correct container if `params.navigation.wide` is provided', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: { ...PARAMS, wide: true } }));

      expect($('.ons-navigation-wrapper .ons-container').hasClass('ons-container--wide')).toBe(true);
    });

    it('has the search autosuggest with correct output', () => {
      const faker = templateFaker();
      const autosuggestSpy = faker.spy('autosuggest', { suppressOutput: true });

      faker.renderComponent('navigation', {
        navigation: PARAMS,
        siteSearchAutosuggest: {
          ...SITE_SEARCH_AUTOSUGGEST,
        },
      });

      expect(autosuggestSpy.occurrences[0]).toEqual({
        ...SITE_SEARCH_AUTOSUGGEST,
        accessiblePlaceholder: true,
        autocomplete: 'off',
        id: 'ons-site-search',
        containerClasses: 'ons-autosuggest-input--header',
        classes: 'ons-input-search ons-input-search--icon',
        label: {
          text: 'Search the design system',
          id: 'ons-site-search-label',
          classes: 'ons-u-pl-m ons-label--white',
        },
      });
    });
  });

  describe('level: main navigation', () => {
    it('has the provided `id` attribute', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect($('.ons-navigation--main').attr('id')).toBe('main-nav');
    });

    it('has the provided `aria-label` attribute', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect($('.ons-navigation--main').attr('aria-label')).toBe('Main menu');
    });

    it('has the correct link href for each list item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      const values = mapAll($('.ons-navigation--main .ons-navigation__link'), node => node.attr('href'));
      expect(values).toEqual(['#0', '#1']);
    });

    it('has the correct link text for each list item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      const values = mapAll($('.ons-navigation--main .ons-navigation__link'), node => node.text().trim());
      expect(values).toEqual(['Main nav item 1', 'Main nav item 2']);
    });

    it('has the correct aria-label for each list item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      const values = mapAll($('.ons-navigation--main .ons-navigation__link'), node => node.attr('aria-label'));
      expect(values).toEqual(['Main nav ariaLabel 1', 'Main nav ariaLabel 2']);
    });

    it('has the provided custom class for each list item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect($('.ons-navigation--main .ons-navigation__list > .ons-navigation__item').hasClass('custom-class-main-item-1')).toBe(true);
      expect($('.ons-navigation--main .ons-navigation__list .ons-navigation__item:last-child').hasClass('custom-class-main-item-2')).toBe(
        true,
      );
    });

    it('has the provided id for each list item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect($('.ons-navigation--main .ons-navigation__list > .ons-navigation__item .ons-navigation__link').attr('id')).toBe('main-item-1');
      expect($('.ons-navigation--main .ons-navigation__list .ons-navigation__item:last-child .ons-navigation__link').attr('id')).toBe(
        'main-item-2',
      );
    });

    it('has the active class on the correct item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect(
        $('.ons-navigation--main .ons-navigation__list .ons-navigation__item:last-child').hasClass('ons-navigation__item--active'),
      ).toBe(true);
    });
  });

  describe('level: sub navigation', () => {
    it('renders a button with expected parameters', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button', { suppressOutput: true });

      faker.renderComponent('navigation', { navigation: PARAMS });

      expect(buttonSpy.occurrences).toContainEqual({
        text: 'Main nav item 2',
        classes: 'ons-u-d-no ons-js-sub-navigation-button',
        variants: ['mobile', 'dropdown'],
        type: 'button',
        attributes: {
          'aria-label': 'Toggle section navigation',
          'aria-controls': 'sub-nav',
          'aria-expanded': 'false',
        },
      });
    });

    it('has the correct container if `params.wide` is provided', () => {
      const $ = cheerio.load(renderComponent('navigation', { wide: true, navigation: PARAMS }));

      expect($('.ons-navigation--sub .ons-container').hasClass('ons-container--wide')).toBe(true);
    });

    it('has the correct container if `params.navigation.wide` is provided', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: { ...PARAMS, wide: true } }));

      expect($('.ons-navigation--sub .ons-container').hasClass('ons-container--wide')).toBe(true);
    });

    it('has the provided `id` attribute', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect($('.ons-navigation--sub').attr('id')).toBe('sub-nav');
    });

    it('has the provided `aria-label` attribute', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect($('.ons-navigation--sub').attr('aria-label')).toBe('Section menu');
    });

    it('has the correct link href for each list item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      const values = mapAll($('.ons-navigation--sub .ons-navigation__link'), node => node.attr('href'));
      expect(values).toEqual(['/sub-item-1', '/sub-item-2']);
    });

    it('has the correct link text for each list item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      const values = mapAll($('.ons-navigation--sub .ons-navigation__link'), node => node.text().trim());
      expect(values).toEqual(['Sub nav item 1', 'Sub nav item 2']);
    });

    it('has the correct aria-label for each list item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      const values = mapAll($('.ons-navigation--sub .ons-navigation__link'), node => node.attr('aria-label'));
      expect(values).toEqual(['Sub nav ariaLabel 1', 'Sub nav ariaLabel 2']);
    });

    it('has the provided custom class for each list item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect($('.ons-navigation--sub .ons-navigation__list > .ons-navigation__item').hasClass('custom-class-sub-item-1')).toBe(true);
      expect($('.ons-navigation--sub .ons-navigation__list .ons-navigation__item:last-child').hasClass('custom-class-sub-item-2')).toBe(
        true,
      );
    });

    it('has the provided id for each list item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect($('.ons-navigation--sub .ons-navigation__list > .ons-navigation__item .ons-navigation__link').attr('id')).toBe('sub-item-1');
      expect($('.ons-navigation--sub .ons-navigation__list .ons-navigation__item:last-child .ons-navigation__link').attr('id')).toBe(
        'sub-item-2',
      );
    });

    it('has the active class on the correct item when a single current path is provided', () => {
      const $ = cheerio.load(
        renderComponent('navigation', {
          navigation: {
            ...PARAMS,
            currentPath: '/sub-item-1',
          },
        }),
      );
      expect($('#sub-nav .ons-navigation__item--active > #sub-item-1').length).toBe(1);
    });

    it('has the active class on the correct item when multiple current paths are provided', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect($('#sub-nav .ons-navigation__item--active > #sub-item-1').length).toBe(1);
    });
  });

  describe('level: sub navigation mobile', () => {
    it('has the provided `id` attribute', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect($('.ons-navigation--sub-mobile').attr('id')).toBe('sub-nav--mobile');
    });

    it('has the provided `aria-label` attribute', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect($('.ons-navigation--sub-mobile').attr('aria-label')).toBe('Section menu');
    });

    it('has the correct link href for each list item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      const values = mapAll(
        $('.ons-navigation__list--parent > li a').not('.ons-navigation__list--parent li .ons-navigation__list--child a'),
        node => node.attr('href'),
      );
      expect(values).toEqual(['#overview', '/sub-item-1', '/sub-item-2']);
    });

    it('has the correct link text for each list item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      const values = mapAll(
        $('.ons-navigation__list--parent > li a').not('.ons-navigation__list--parent li .ons-navigation__list--child a'),
        node => node.text().trim(),
      );
      expect(values).toEqual(['Overview', 'Sub nav item 1', 'Sub nav item 2']);
    });

    it('has the active class on the correct item when a single current path is provided', () => {
      const $ = cheerio.load(
        renderComponent('navigation', {
          navigation: {
            ...PARAMS,
            currentPath: '/sub-item-1',
          },
        }),
      );
      expect($('#sub-nav--mobile .ons-navigation__item--active > #sub-item-1--mobile').length).toBe(1);
    });

    it('has the active class on the correct item when multiple current paths are provided', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect($('#sub-nav--mobile .ons-navigation__item--active > #sub-item-1--mobile').length).toBe(1);
    });

    it('has the correct text for the child section title', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect($('.ons-navigation__list-header').text()).toBe('Section 1');
    });

    it('has the correct link href for each child list item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      const values = mapAll($('.ons-navigation__list--child > li a'), node => node.attr('href'));
      expect(values).toEqual(['/sub-item-2/child-item-1', '/sub-item-2/child-item-2']);
    });

    it('has the correct link text for each child list item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      const values = mapAll($('.ons-navigation__list--child > li a'), node => node.text().trim());
      expect(values).toEqual(['Child item 1', 'Child item 2']);
    });

    it('has the active class on the correct child item', () => {
      const $ = cheerio.load(renderComponent('navigation', { navigation: PARAMS }));

      expect($('#sub-nav--mobile .ons-navigation__item--active > #child-item-1').length).toBe(1);
    });
  });
});
