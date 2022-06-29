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
  ariaListLabel: 'Menu',
  classes: 'custom-class',
  toggleServicesButton: {
    text: 'Menu',
    ariaLabel: 'Toggle services menu',
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

    it('has the correct container if `fullWidth`', () => {
      const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_BASIC, fullWidth: true }));

      expect($('.ons-container').hasClass('ons-container--full-width')).toBe(true);
    });

    it('has the correct container if `wide`', () => {
      const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_BASIC, wide: true }));

      expect($('.ons-container').hasClass('ons-container--wide')).toBe(true);
    });

    it('has the correct masthead logo link', () => {
      const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_BASIC, logoHref: '#0' }));

      expect($('.ons-header__logo-link').attr('href')).toBe('#0');
    });

    it('has the default masthead logo icon', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('header', EXAMPLE_HEADER_BASIC);

      expect(iconsSpy.occurrences[0].iconType).toBe('ons-logo-en');
    });

    it('has the provided masthead logo icon', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('header', { ...EXAMPLE_HEADER_BASIC, logo: 'another-logo' });

      expect(iconsSpy.occurrences[0].iconType).toBe('another-logo');
    });

    it('has the default masthead logo icon alt text', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('header', EXAMPLE_HEADER_BASIC);

      expect(iconsSpy.occurrences[0].altText).toBe('Office for National Statistics logo');
    });

    it('has the provided masthead logo icon alt text', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('header', { ...EXAMPLE_HEADER_BASIC, logoAlt: 'Custom alt text' });

      expect(iconsSpy.occurrences[0].altText).toBe('Custom alt text');
    });

    it('has the default masthead mobile logo icon', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('header', EXAMPLE_HEADER_BASIC);

      expect(iconsSpy.occurrences[1].iconType).toBe('ons-logo-stacked-en');
    });

    it('has the provided masthead mobile logo icon', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('header', { ...EXAMPLE_HEADER_BASIC, mobileLogo: 'another-mobile-logo' });

      expect(iconsSpy.occurrences[1].iconType).toBe('another-mobile-logo');
    });

    it('has the default masthead mobile logo icon alt text', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('header', EXAMPLE_HEADER_BASIC);

      expect(iconsSpy.occurrences[1].altText).toBe('Office for National Statistics logo');
    });

    it('has the provided masthead mobile logo icon alt text', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('header', { ...EXAMPLE_HEADER_BASIC, logoAlt: 'Custom alt text' });

      expect(iconsSpy.occurrences[1].altText).toBe('Custom alt text');
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
      const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_BASIC, titleLogoHref: '#0' }));

      expect($('.ons-header__title-link').attr('href')).toBe('#0');
    });

    it('has the provided title logo icon', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('header', { ...EXAMPLE_HEADER_BASIC, titleLogo: 'custom-title-logo', titleLogoAlt: 'custom logo alt' });

      expect(iconsSpy.occurrences[2].iconType).toBe('custom-title-logo');
    });

    it('has the correct class when using census title logo', () => {
      const $ = cheerio.load(
        renderComponent('header', { ...EXAMPLE_HEADER_BASIC, titleLogo: 'census-logo-en', titleLogoAlt: 'custom logo alt' }),
      );

      expect($('.ons-header__title-census-logo-en').length).toBe(1);
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
          iconType: 'button-icon',
          iconPosition: 'before',
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
        iconType: 'button-icon',
        iconPosition: 'before',
      });
    });

    it('renders the phase banner with expected parameters', () => {
      const faker = templateFaker();
      const phaseSpy = faker.spy('phase-banner');

      faker.renderComponent('header', { ...EXAMPLE_HEADER_BASIC, phase: { html: 'Example content with a <a href="#">link</a>' } });

      expect(phaseSpy.occurrences).toContainEqual({
        html: 'Example content with a <a href="#">link</a>',
      });
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

    it('has the provided `aria-label` for the list', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_SINGLE));

      expect($('.ons-header-service-nav--main .ons-header-service-nav__list').attr('aria-label')).toBe('Menu');
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

    it('has the provided `aria-label` for the list for mobile', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_SINGLE));

      expect($('.ons-header-service-nav--mobile .ons-header-service-nav__list').attr('aria-label')).toBe('Menu');
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
        buttonStyle: 'mobile',
        variants: 'text-link',
        attributes: {
          'aria-label': 'Toggle services menu',
          'aria-controls': 'service-links',
          'aria-haspopup': 'true',
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

      expect(buttonSpy.occurrences[0]).toHaveProperty('variants', ['text-link', 'text-link-inverse']);
    });

    it('does not render a button for a single services link', () => {
      const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_SINGLE));

      expect($('.ons-js-toggle-services').length).toBe(0);
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

      expect(navigationSpy.occurrences).toContainEqual({
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
      });
    });

    it('renders a button to toggle the menu on mobile', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('header', { ...EXAMPLE_HEADER_BASIC, ...EXAMPLE_HEADER_NAVIGATION_CONFIG });

      expect(buttonSpy.occurrences).toContainEqual({
        text: 'Menu',
        classes: 'ons-u-ml-xs ons-u-d-no ons-js-navigation-button',
        buttonStyle: 'mobile',
        variants: ['mobile', 'ghost'],
        attributes: {
          'aria-label': 'Toggle main menu',
          'aria-controls': 'main-nav',
          'aria-haspopup': 'true',
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
          siteSearchAutosuggest: {},
        },
      });

      expect(buttonSpy.occurrences).toContainEqual({
        text: 'Search',
        classes: 'ons-btn--search ons-u-ml-xs ons-u-d-no ons-js-toggle-search',
        variants: ['ghost', 'small'],
        iconType: 'search',
        iconPosition: 'only',
        attributes: {
          'aria-label': 'Toggle search',
          'aria-controls': 'ons-site-search',
          'aria-haspopup': 'true',
          'aria-expanded': 'false',
        },
      });
    });
  });
});
