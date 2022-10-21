/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';
import { mapAll } from '../../tests/helpers/cheerio';

const EXAMPLE_HEADER_BASIC = {
  title: 'Header title',
};

const EXAMPLE_SERVICE_LINKS_CONFIG = {
  id: 'service-links',
  ariaLabel: 'Services menu',
  classes: 'custom-class',
  toggleServicesButton: {
    text: 'Menu',
    ariaLabel: 'Toggle services menu',
  },
};

const EXAMPLE_HEADER_SERVICE_LIST_ITEMS = {
  ...EXAMPLE_HEADER_BASIC,
  serviceLinks: {
    ...EXAMPLE_SERVICE_LINKS_CONFIG,
    itemsList: [
      {
        title: 'Title 1',
      },
      {
        title: 'Title 2',
      },
      {
        title: 'Title 3',
      },
    ],
  },
};

const EXAMPLE_HEADER_SERVICE_LINKS_MULTIPLE = {
  ...EXAMPLE_HEADER_BASIC,
  serviceLinks: {
    ...EXAMPLE_SERVICE_LINKS_CONFIG,
    itemsList: [
      {
        title: 'Title 1',
        url: '#1',
      },
      {
        title: 'Title 2',
        url: '#2',
      },
      {
        title: 'Title 3',
        url: '#3',
      },
    ],
  },
};

const EXAMPLE_HEADER_SERVICE_LINKS_SINGLE = {
  ...EXAMPLE_HEADER_BASIC,
  serviceLinks: {
    ...EXAMPLE_SERVICE_LINKS_CONFIG,
    itemsList: [
      {
        title: 'Title',
        url: '#0',
      },
    ],
  },
};

const EXAMPLE_HEADER_LANGUAGE_CONFIG = {
  language: {
    languages: [
      {
        url: '#0',
        ISOCode: 'en',
        text: 'English',
        buttonAriaLabel: 'Language selector. Current language: English',
        chooseLanguage: 'Choose language',
        current: true,
      },
      {
        url: '#0',
        ISOCode: 'cy',
        text: 'Cymraeg',
        buttonAriaLabel: 'Dewisydd iaith. Iaith gyfredol: Cymraeg',
        chooseLanguage: 'Dewiswch iaith',
        current: false,
      },
    ],
  },
};

const EXAMPLE_HEADER_NAVIGATION_CONFIG = {
  navigation: {
    id: 'main-nav',
    ariaLabel: 'Main menu',
    currentPath: '#home',
    itemsList: [
      {
        title: 'Home',
        url: '#home',
      },
      {
        title: 'Guidance',
        url: '#0',
      },
    ],
    toggleNavigationButton: {
      text: 'Menu',
      ariaLabel: 'Toggle main menu',
    },
  },
};

describe('macro: header', () => {
  describe('mode: basic', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_BASIC));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has provided variant style classes', () => {
      const $ = cheerio.load(
        renderComponent('header', {
          ...EXAMPLE_HEADER_BASIC,
          variants: ['variant-a', 'variant-b'],
        }),
      );

      expect($('.ons-header--variant-a').length).toBe(1);
      expect($('.ons-header--variant-b').length).toBe(1);
    });

    it('has additionally provided `classes`', () => {
      const $ = cheerio.load(
        renderComponent('header', {
          ...EXAMPLE_HEADER_BASIC,
          classes: 'extra-class another-extra-class',
        }),
      );

      expect($('.ons-header').hasClass('extra-class')).toBe(true);
      expect($('.ons-header').hasClass('another-extra-class')).toBe(true);
    });

    it('has the correct container if `fullWidth`', () => {
      const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_BASIC, fullWidth: true }));

      expect($('.ons-container').hasClass('ons-container--full-width')).toBe(true);
    });

    it('has the correct container if `wide`', () => {
      const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_BASIC, wide: true }));

      expect($('.ons-container').hasClass('ons-container--wide')).toBe(true);
    });

    it('has the correct masthead logo link', () => {
      const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_BASIC, mastheadLogoUrl: '#0' }));

      expect($('.ons-header__org-logo-link').attr('href')).toBe('#0');
    });

    it('has the default masthead logo icon', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('header', EXAMPLE_HEADER_BASIC);

      expect(iconsSpy.occurrences[0].iconType).toBe('ons-logo-en');
    });

    it('has the default masthead mobile logo icon', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('header', EXAMPLE_HEADER_BASIC);

      expect(iconsSpy.occurrences[1].iconType).toBe('ons-logo-stacked-en');
    });

    it('has the default masthead logo icon alt text', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('header', EXAMPLE_HEADER_BASIC);

      expect(iconsSpy.occurrences[0].altText).toBe('Office for National Statistics logo');
    });

    it('has the default masthead mobile logo icon alt text', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('header', EXAMPLE_HEADER_BASIC);

      expect(iconsSpy.occurrences[1].altText).toBe('Office for National Statistics logo');
    });

    it('has the provided large masthead logo', () => {
      const $ = cheerio.load(
        renderComponent('header', { ...EXAMPLE_HEADER_BASIC, mastheadLogo: { large: '<img src="another-logo.svg">' } }),
      );

      expect($('.ons-header__org-logo--large img').attr('src')).toBe('another-logo.svg');
    });

    it('has the provided masthead logo custom classes', () => {
      const $ = cheerio.load(
        renderComponent('header', {
          ...EXAMPLE_HEADER_BASIC,
          mastheadLogo: { large: '<img src="another-logo.svg">', classes: 'custom-class another-custom-class' },
        }),
      );

      expect($('.ons-header__grid-top').hasClass('custom-class')).toBe(true);
      expect($('.ons-header__grid-top').hasClass('another-custom-class')).toBe(true);
    });

    it('has the provided small masthead logo', () => {
      const $ = cheerio.load(
        renderComponent('header', {
          ...EXAMPLE_HEADER_BASIC,
          mastheadLogo: { large: 'another-logo.svg', small: '<img src="another-logo-small.svg">' },
        }),
      );

      expect($('.ons-header__org-logo--small img').attr('src')).toBe('another-logo-small.svg');
    });

    it('displays the `title` text', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_BASIC));

      expect($('.ons-header__title').text()).toBe('Header title');
    });

    it('displays the `title` using the default tag', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_BASIC));

      expect($('.ons-header__title')[0].tagName).toBe('div');
    });

    it('displays the `title` using a H1 if `titleAsH1`', () => {
      const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_BASIC, titleAsH1: true }));

      expect($('.ons-header__title')[0].tagName).toBe('h1');
    });

    it('has the correct `title` link', () => {
      const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_BASIC, titleUrl: '#0' }));

      expect($('.ons-header__title-link').attr('href')).toBe('#0');
    });

    it('has the provided large title logo', () => {
      const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_BASIC, titleLogo: { large: '<img src="another-logo.svg">' } }));

      expect($('.ons-header__title-logo--large img').attr('src')).toBe('another-logo.svg');
    });

    it('has the provided title logo custom classes', () => {
      const $ = cheerio.load(
        renderComponent('header', {
          ...EXAMPLE_HEADER_BASIC,
          titleLogo: { large: 'another-logo.svg', classes: 'custom-class another-custom-class' },
        }),
      );

      expect($('.ons-header__title-logo--large').hasClass('custom-class')).toBe(true);
      expect($('.ons-header__title-logo--large').hasClass('another-custom-class')).toBe(true);
    });

    it('has the provided small title logo', () => {
      const $ = cheerio.load(
        renderComponent('header', {
          ...EXAMPLE_HEADER_BASIC,
          titleLogo: { large: '<img src="another-logo.svg">', small: '<img src="another-logo-small.svg">' },
        }),
      );

      expect($('.ons-header__title-logo--small img').attr('src')).toBe('another-logo-small.svg');
    });

    it('displays the `description` text', () => {
      const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_BASIC, description: 'Header description' }));

      expect($('.ons-header__description').text()).toBe('Header description');
    });

    it('renders a button with expected parameters', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button', { suppressOutput: true });

      faker.renderComponent('header', {
        ...EXAMPLE_HEADER_BASIC,
        button: {
          text: 'Save and sign out',
          name: 'button-name',
          attributes: {
            a: 'b',
          },
          url: '#0',
        },
      });

      expect(buttonSpy.occurrences).toContainEqual({
        text: 'Save and sign out',
        classes: 'ons-u-d-no@xxs@m',
        variants: 'ghost',
        name: 'button-name',
        attributes: {
          a: 'b',
        },
        url: '#0',
        iconType: 'exit',
        iconPosition: 'after',
      });
    });

    it('renders the phase banner with expected parameters', () => {
      const faker = templateFaker();
      const phaseSpy = faker.spy('phase-banner');

      faker.renderComponent('header', {
        ...EXAMPLE_HEADER_BASIC,
        phase: {
          badge: 'Example',
          html: 'Example content with a <a href="#">link</a>',
        },
      });

      expect(phaseSpy.occurrences).toContainEqual({
        badge: 'Example',
        html: 'Example content with a <a href="#">link</a>',
      });
    });

    it('renders the phase banner in the correct container if `wide`', () => {
      const $ = cheerio.load(
        renderComponent('header', {
          ...EXAMPLE_HEADER_BASIC,
          wide: true,
          phase: {
            badge: 'Example',
            html: 'Example content with a <a href="#">link</a>',
          },
        }),
      );

      const phaseContainer = $('.ons-phase-banner .ons-container');
      expect($(phaseContainer).hasClass('ons-container--wide')).toBe(true);
    });

    it('renders the phase banner in the correct container if `fullWidth`', () => {
      const $ = cheerio.load(
        renderComponent('header', {
          ...EXAMPLE_HEADER_BASIC,
          fullWidth: true,
          phase: {
            badge: 'Example',
            html: 'Example content with a <a href="#">link</a>',
          },
        }),
      );

      const phaseContainer = $('.ons-phase-banner .ons-container');
      expect($(phaseContainer).hasClass('ons-container--full-width')).toBe(true);
    });
  });

  describe('mode: with service links', () => {
    it('has the correct display class when multiple links are provided', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_MULTIPLE));

      expect($('.ons-header__links .ons-grid__col').hasClass('ons-u-d-no@xxs@m')).toBe(true);
    });

    it('has the correct display class when a single link and language is provided', () => {
      const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_SERVICE_LINKS_SINGLE, ...EXAMPLE_HEADER_LANGUAGE_CONFIG }));

      expect($('.ons-header__links .ons-grid__col').hasClass('ons-u-d-no@xxs@xs')).toBe(true);
    });

    it('does not have the display class when only single link is provided', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_SINGLE));

      expect($('.ons-header__links .ons-grid__col').hasClass('ons-u-d-no@xxs@')).toBe(false);
    });

    it('has the provided custom class', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_SINGLE));

      expect($('.ons-header-service-nav--main').hasClass('custom-class')).toBe(true);
    });

    it('has the provided `aria-label`', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_SINGLE));

      expect($('.ons-header-service-nav--main').attr('aria-label')).toBe('Services menu');
    });

    it('has the text for each list item', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LIST_ITEMS));

      const values = mapAll($('.ons-header-service-nav--main .ons-header-service-nav__item'), node => node.text().trim());
      expect(values).toEqual(['Title 1', 'Title 2', 'Title 3']);
    });

    it('has the link text for each list item', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_MULTIPLE));

      const values = mapAll($('.ons-header-service-nav--main .ons-header-service-nav__link'), node => node.text().trim());
      expect(values).toEqual(['Title 1', 'Title 2', 'Title 3']);
    });

    it('has the link href for each list item', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_MULTIPLE));

      const values = mapAll($('.ons-header-service-nav--main .ons-header-service-nav__link'), node => node.attr('href'));
      expect(values).toEqual(['#1', '#2', '#3']);
    });

    it('has the provided custom class', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_SINGLE));

      expect($('.ons-header-service-nav--main').hasClass('custom-class')).toBe(true);
    });

    it('has the provided `aria-label` for the list for mobile', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_SINGLE));

      expect($('.ons-header-service-nav--mobile').attr('aria-label')).toBe('Services menu');
    });

    it('has the link text for each list item for mobile', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_MULTIPLE));

      const values = mapAll($('.ons-header-service-nav--mobile .ons-header-service-nav__link'), node => node.text().trim());
      expect(values).toEqual(['Title 1', 'Title 2', 'Title 3']);
    });

    it('has the link href for each list item for mobile', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_MULTIPLE));

      const values = mapAll($('.ons-header-service-nav--mobile .ons-header-service-nav__link'), node => node.attr('href'));
      expect(values).toEqual(['#1', '#2', '#3']);
    });

    it('renders a button with expected parameters', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button', { suppressOutput: true });

      faker.renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_MULTIPLE);

      expect(buttonSpy.occurrences).toContainEqual({
        text: 'Menu',
        classes: 'ons-u-d-no ons-js-toggle-services',
        type: 'button',
        variants: ['mobile', 'text-link'],
        attributes: {
          'aria-label': 'Toggle services menu',
          'aria-controls': 'service-links',
          'aria-expanded': 'false',
        },
      });
    });

    it('renders a button with correct variant if `internal`', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('header', {
        ...EXAMPLE_HEADER_BASIC,
        variants: 'internal',
        serviceLinks: {
          ...EXAMPLE_SERVICE_LINKS_CONFIG,
          itemsList: [
            {
              title: 'Title',
              url: '#0',
            },
            {
              title: 'Title 2',
              url: '#0',
            },
          ],
        },
      });

      expect(buttonSpy.occurrences[0]).toHaveProperty('variants', ['mobile', 'text-link', 'text-link-inverse']);
    });

    it('does not render a button for a single services link', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_SINGLE));

      expect($('.ons-js-toggle-services').length).toBe(0);
    });

    it('has the correct list item icon', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('header', {
        ...EXAMPLE_HEADER_BASIC,
        serviceLinks: {
          ...EXAMPLE_SERVICE_LINKS_CONFIG,
          itemsList: [
            {
              title: 'Title 1',
              iconType: 'check',
            },
          ],
        },
      });

      expect(iconsSpy.occurrences[2].iconType).toBe('check');
    });
  });

  describe('mode: with language selector', () => {
    it('displays the language selector with expected parameters', () => {
      const faker = templateFaker();
      const languageSpy = faker.spy('language-selector', { suppressOutput: true });

      faker.renderComponent('header', { ...EXAMPLE_HEADER_BASIC, ...EXAMPLE_HEADER_LANGUAGE_CONFIG });

      expect(languageSpy.occurrences).toContainEqual({
        languages: [
          {
            url: '#0',
            ISOCode: 'en',
            text: 'English',
            buttonAriaLabel: 'Language selector. Current language: English',
            chooseLanguage: 'Choose language',
            current: true,
          },
          {
            url: '#0',
            ISOCode: 'cy',
            text: 'Cymraeg',
            buttonAriaLabel: 'Dewisydd iaith. Iaith gyfredol: Cymraeg',
            chooseLanguage: 'Dewiswch iaith',
            current: false,
          },
        ],
      });
    });
  });

  describe('mode: with navigation', () => {
    it('renders the navigation with expected parameters', () => {
      const faker = templateFaker();
      const navigationSpy = faker.spy('navigation', { suppressOutput: true });

      faker.renderComponent('header', { ...EXAMPLE_HEADER_BASIC, ...EXAMPLE_HEADER_NAVIGATION_CONFIG });

      expect(navigationSpy.occurrences[0]).toEqual({
        navigation: {
          id: 'main-nav',
          ariaLabel: 'Main menu',
          currentPath: '#home',
          itemsList: [
            {
              title: 'Home',
              url: '#home',
            },
            {
              title: 'Guidance',
              url: '#0',
            },
          ],
          toggleNavigationButton: {
            text: 'Menu',
            ariaLabel: 'Toggle main menu',
          },
        },
        title: 'Header title',
      });
    });

    it('renders a button to toggle the menu on mobile', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('header', { ...EXAMPLE_HEADER_BASIC, ...EXAMPLE_HEADER_NAVIGATION_CONFIG });

      expect(buttonSpy.occurrences[0]).toEqual({
        text: 'Menu',
        classes: 'ons-u-ml-xs ons-u-d-no ons-js-navigation-button ons-u-d-no@l',
        variants: ['mobile', 'ghost'],
        attributes: {
          'aria-label': 'Toggle main menu',
          'aria-controls': 'main-nav',
          'aria-expanded': 'false',
        },
      });
    });

    it('renders a button to toggle the search on mobile', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('header', {
        ...EXAMPLE_HEADER_BASIC,
        navigation: {
          id: 'main-nav',
          ariaLabel: 'Main menu',
          currentPath: '#home',
          itemsList: [
            {
              title: 'Home',
              url: '#home',
            },
            {
              title: 'Guidance',
              url: '#0',
            },
          ],
          toggleNavigationButton: {
            text: 'Menu',
            ariaLabel: 'Toggle main menu',
          },
        },
        siteSearchAutosuggest: {},
      });

      expect(buttonSpy.occurrences[0]).toEqual({
        text: 'Search',
        classes: 'ons-btn--search ons-u-ml-xs ons-u-d-no ons-js-toggle-search',
        variants: ['small', 'ghost'],
        iconType: 'search',
        iconPosition: 'only',
        attributes: {
          'aria-label': 'Toggle search',
          'aria-controls': 'ons-site-search',
          'aria-expanded': 'false',
        },
      });
    });
  });
});
