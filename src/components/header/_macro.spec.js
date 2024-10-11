/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';
import { mapAll } from '../../tests/helpers/cheerio';

import {
    EXAMPLE_HEADER_BASIC,
    EXAMPLE_SERVICE_LINKS_CONFIG,
    EXAMPLE_HEADER_SERVICE_LINKS_MULTIPLE,
    EXAMPLE_HEADER_SERVICE_LINKS_SINGLE,
    EXAMPLE_HEADER_LANGUAGE_CONFIG,
    EXAMPLE_HEADER_NAVIGATION_WITH_SUBNAVIGATION_CONFIG,
    EXAMPLE_HEADER_NAVIGATION_WITH_SITESEARCHAUTOSUGGEST,
} from './_test-examples';

describe('FOR: Macro: Header', () => {
    describe('GIVEN: Params: none', () => {
        describe('WHEN: All params are at default state', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                }),
            );
            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
        });
    });
    describe('GIVEN: Params: variants', () => {
        describe('WHEN: variants are provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    variants: ['variant-a', 'variant-b'],
                }),
            );
            test('THEN: renders with variant style classes matching variant provided', () => {
                expect($('.ons-header--variant-a').length).toBe(1);
                expect($('.ons-header--variant-b').length).toBe(1);
            });
        });
    });
    describe('GIVEN: Params: classes', () => {
        describe('WHEN: classes are provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    classes: 'extra-class another-extra-class',
                }),
            );
            test('THEN: renders with correct additional classes', () => {
                expect($('.ons-header').hasClass('extra-class')).toBe(true);
                expect($('.ons-header').hasClass('another-extra-class')).toBe(true);
            });
        });
    });
    describe('GIVEN: Params: fullWidth & wide', () => {
        describe('WHEN: fullWidth parameter is set to true', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    fullWidth: true,
                }),
            );
            test('THEN: renders container with fullWidth class', () => {
                expect($('.ons-container').hasClass('ons-container--full-width')).toBe(true);
            });
        });
        describe('WHEN: wide parameter is set to true', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    wide: true,
                }),
            );
            test('THEN: renders container with wide class', () => {
                expect($('.ons-container').hasClass('ons-container--wide')).toBe(true);
            });
        });
    });
    describe('GIVEN: Params: mastheadLogo', () => {
        describe('WHEN: default params are provided', () => {
            const faker = templateFaker();
            const iconsSpy = faker.spy('icon');
            faker.renderComponent('header', EXAMPLE_HEADER_BASIC);

            test('THEN: renders default large logo on large screen', () => {
                expect(iconsSpy.occurrences[0].iconType).toBe('ons-logo-en');
            });
            test('THEN: renders logo with correct default alt-text on large screen', () => {
                expect(iconsSpy.occurrences[0].altText).toBe('Office for National Statistics homepage');
            });
            test('THEN: renders default small logo on small screen', () => {
                expect(iconsSpy.occurrences[1].iconType).toBe('ons-logo-stacked-en');
            });
            test('THEN: renders logo with correct default alt-text on small screen', () => {
                expect(iconsSpy.occurrences[1].altText).toBe('Office for National Statistics logo');
            });
        });
        describe('WHEN: large & small parameters are provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    mastheadLogo: { large: '<img src="another-logo.svg">', small: '<img src="another-logo-small.svg">' },
                }),
            );
            test('THEN: renders provided large logo on large screen', () => {
                expect($('.ons-header__org-logo--large img').attr('src')).toBe('another-logo.svg');
            });
            test('THEN: renders provided small logo on small screen', () => {
                expect($('.ons-header__org-logo--small img').attr('src')).toBe('another-logo-small.svg');
            });
        });
        describe('WHEN: classes parameter is provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    mastheadLogo: { large: '<img src="another-logo.svg">', classes: 'custom-class another-custom-class' },
                }),
            );
            test('THEN: renders logo with provided additional classes', () => {
                expect($('.ons-header__grid-top').hasClass('custom-class')).toBe(true);
                expect($('.ons-header__grid-top').hasClass('another-custom-class')).toBe(true);
            });
        });
        describe('WHEN: mastheadLogoUrl parameter is provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    mastheadLogoUrl: '#0',
                }),
            );
            test('THEN: renders logo with provided URL', () => {
                expect($('.ons-header__org-logo-link').attr('href')).toBe('#0');
            });
        });
    });
    describe('GIVEN: Params: multipleLogos', () => {
        describe('WHEN: image parameter is set to "ONS Logo"', () => {
            const faker = templateFaker();
            const iconsSpy = faker.spy('icon');

            faker.renderComponent('header', {
                ...EXAMPLE_HEADER_BASIC,
                mastheadLogo: {
                    multipleLogos: {
                        logo1: {
                            image: 'ONS Logo',
                        },
                    },
                },
            });
            test('THEN: renders default ONS icon', () => {
                expect(iconsSpy.occurrences[0].iconType).toBe('ons-logo-stacked-en');
            });
        });
        describe('WHEN: url parameter is set ', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    mastheadLogo: {
                        multipleLogos: {
                            logo1: {
                                image: '<img src="a-logo.svg">',
                                url: '#0',
                            },
                        },
                    },
                }),
            );
            test('THEN: renders provided link', () => {
                expect($('.ons-header__org-logo-link').attr('href')).toBe('#0');
            });
        });
        describe('WHEN: logo1, logo2, logo3 image parameters are all provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    mastheadLogo: {
                        multipleLogos: {
                            logo1: {
                                image: '<img src="a-logo.svg">',
                            },
                            logo2: {
                                image: '<img src="a-second-logo.svg">',
                            },
                            logo3: {
                                image: '<img src="a-third-logo.svg">',
                            },
                        },
                    },
                }),
            );
            test('THEN: renders all provided logos', () => {
                expect($('.ons-header__org-logo--multi img').attr('src')).toBe('a-logo.svg');
                expect($('.ons-header__org-logo--multi img:nth-of-type(2)').attr('src')).toBe('a-second-logo.svg');
                expect($('.ons-header__org-logo--multi img:nth-of-type(3)').attr('src')).toBe('a-third-logo.svg');
            });
        });
        describe('WHEN: multipleLogos & mastheadLogo:Large parameters are both provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    mastheadLogo: {
                        large: '<img src="big-logo.svg">',
                        multipleLogos: {
                            logo1: {
                                image: '<img src="a-logo.svg">',
                            },
                        },
                    },
                }),
            );
            test('THEN: renders only logos provided via multipleLogos parameter', () => {
                expect($('.ons-header__org-logo--large').attr('src')).toBe(undefined);
                expect($('.ons-header__org-logo--multi img').attr('src')).toBe('a-logo.svg');
            });
        });
    });
    describe('GIVEN: Params: title', () => {
        describe('WHEN: title parameter is provided', () => {
            const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_BASIC));
            test('THEN: renders provided title text', () => {
                expect($('.ons-header__title').text()).toBe('Header title');
            });
            test('THEN: renders title with default title tag', () => {
                expect($('.ons-header__title')[0].tagName).toBe('div');
            });
        });
        describe('WHEN: titleAsH1 parameter is set to true', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    titleAsH1: true,
                }),
            );
            test('THEN: renders title with H1 title tag', () => {
                expect($('.ons-header__title')[0].tagName).toBe('h1');
            });
        });
        describe('WHEN: titleURL param is provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    titleUrl: '#0',
                }),
            );
            test('THEN: renders title with provided link', () => {
                expect($('.ons-header__title-link').attr('href')).toBe('#0');
            });
        });
        describe('WHEN: titleLogo: large and small are provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    titleLogo: { large: '<img src="another-logo.svg">', small: '<img src="another-logo-small.svg">' },
                }),
            );
            test('THEN: renders provided large title logo on large screen', () => {
                expect($('.ons-header__title-logo--large img').attr('src')).toBe('another-logo.svg');
            });
            test('THEN: renders provided small title logo on small screen', () => {
                expect($('.ons-header__title-logo--small img').attr('src')).toBe('another-logo-small.svg');
            });
        });
        describe('WHEN: titleLogo: classes parameter is provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    titleLogo: { large: 'another-logo.svg', classes: 'custom-class another-custom-class' },
                }),
            );
            test('THEN: renders title logo with provided additional classes', () => {
                expect($('.ons-header__title-logo--large').hasClass('custom-class')).toBe(true);
                expect($('.ons-header__title-logo--large').hasClass('another-custom-class')).toBe(true);
            });
        });
        describe('WHEN: description parameter is provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    description: 'Header description',
                }),
            );
            test('THEN: renders title with provided description', () => {
                expect($('.ons-header__description').text()).toBe('Header description');
            });
        });
    });
    describe('GIVEN: Params: button: SignOutButton', () => {
        describe('WHEN: no button parameters are provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                }),
            );
            test('THEN: renders title grid with gutterless class', () => {
                const titleGridDiv = $('.ons-header__main .ons-container .ons-grid');
                expect($(titleGridDiv).hasClass('ons-grid--gutterless')).toBe(true);
            });
        });
        describe('WHEN: signOutButton parameters are provided', () => {
            const button = {
                text: 'Save and sign out',
                name: 'button-name',
                attributes: {
                    a: 'b',
                },
                url: '#0',
            };

            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    button,
                }),
            );

            const faker = templateFaker();
            const buttonSpy = faker.spy('button', { suppressOutput: true });
            faker.renderComponent('header', {
                ...EXAMPLE_HEADER_BASIC,
                button,
            });
            test('THEN: renders button with provided parameters', () => {
                expect(buttonSpy.occurrences).toContainEqual({
                    text: 'Save and sign out',
                    classes: 'ons-u-d-no@2xs@m',
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
            test('THEN: renders title grid without gutterless class', () => {
                const titleGridDiv = $('.ons-header__main .ons-container .ons-grid');
                expect($(titleGridDiv).hasClass('ons-grid--gutterless')).toBe(false);
            });
        });
    });
    describe('GIVEN: Params: PhaseBanner', () => {
        describe('WHEN: phaseBanner parameters are provided', () => {
            const faker = templateFaker();
            const phaseSpy = faker.spy('phase-banner');

            faker.renderComponent('header', {
                ...EXAMPLE_HEADER_BASIC,
                phase: {
                    badge: 'Example',
                    html: 'Example content with a <a href="#">link</a>',
                },
            });
            test('THEN: renders phase banner with provided parameters', () => {
                expect(phaseSpy.occurrences).toContainEqual({
                    badge: 'Example',
                    html: 'Example content with a <a href="#">link</a>',
                });
            });
        });
        describe('WHEN: wide parameter is set to true', () => {
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
            test('THEN: renders container with wide class', () => {
                const phaseContainer = $('.ons-phase-banner .ons-container');
                expect($(phaseContainer).hasClass('ons-container--wide')).toBe(true);
            });
        });
        describe('WHEN: fullWidth parameter is set to true', () => {
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
            test('THEN: renders container with fullWidth class', () => {
                const phaseContainer = $('.ons-phase-banner .ons-container');
                expect($(phaseContainer).hasClass('ons-container--full-width')).toBe(true);
            });
        });
    });
    describe('GIVEN: Params: serviceLinks', () => {
        describe('WHEN: multiple items are provided to itemsList parameter', () => {
            const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_MULTIPLE));

            const faker = templateFaker();
            const buttonSpy = faker.spy('button', { suppressOutput: true });
            faker.renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_MULTIPLE);

            test('THEN: renders with correct display class on large screen', () => {
                expect($('.ons-header__links .ons-grid__col').hasClass('ons-u-d-no@2xs@m')).toBe(true);
            });
            test('THEN: renders button on small screen', () => {
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
        });
        describe('WHEN: one item is provided to the itemsList parameter', () => {
            const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_SINGLE));
            test('THEN: renders without multiple link display class on large screen', () => {
                expect($('.ons-header__links .ons-grid__col').hasClass('ons-u-d-no@2xs@m')).toBe(false);
                expect($('.ons-header__links .ons-grid__col').hasClass('ons-u-d-no@2xs@xs')).toBe(false);
            });
            test('THEN: does not render button on small screen', () => {
                expect($('.ons-js-toggle-services').length).toBe(0);
            });
            test('THEN: renders with provided ariaLabel on small screen', () => {
                expect($('.ons-header-service-nav--mobile').attr('aria-label')).toBe('Services menu');
            });
        });
        describe('WHEN: internal is provided to the variant parameter', () => {
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
            test('THEN: renders button with corresponding variants', () => {
                expect(buttonSpy.occurrences[0]).toHaveProperty('variants', ['mobile', 'text-link', 'text-link-inverse']);
            });
        });
        describe('WHEN: classes parameter is provided', () => {
            const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_SINGLE));
            test('THEN: renders with provided additional classes', () => {
                expect($('.ons-header-service-nav--main').hasClass('custom-class')).toBe(true);
            });
        });
        describe('WHEN: item title and url parameters are provided', () => {
            const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SERVICE_LINKS_MULTIPLE));

            test('THEN: renders item with provided title on large screen', () => {
                const values = mapAll($('.ons-header-service-nav--main .ons-header-service-nav__link'), (node) => node.text().trim());
                expect(values).toEqual(['Title 1', 'Title 2', 'Title 3']);
            });
            test('THEN: renders item with provided title on small screen', () => {
                const values = mapAll($('.ons-header-service-nav--mobile .ons-header-service-nav__link'), (node) => node.text().trim());
                expect(values).toEqual(['Title 1', 'Title 2', 'Title 3']);
            });
            test('THEN: renders item with provided url on large screen', () => {
                const values = mapAll($('.ons-header-service-nav--main .ons-header-service-nav__link'), (node) => node.attr('href'));
                expect(values).toEqual(['#1', '#2', '#3']);
            });
            test('THEN: renders item with provided url on small screen', () => {
                const values = mapAll($('.ons-header-service-nav--mobile .ons-header-service-nav__link'), (node) => node.attr('href'));
                expect(values).toEqual(['#1', '#2', '#3']);
            });
        });
        describe('WHEN: item iconType parameter is provided', () => {
            const faker = templateFaker();
            const iconsSpy = faker.spy('icon');

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
            test('THEN: renders item with provided iconType', () => {
                expect(iconsSpy.occurrences[2].iconType).toBe('check');
            });
        });
        describe('WHEN: language and a single item itemsList parameters are provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_SERVICE_LINKS_SINGLE,
                    ...EXAMPLE_HEADER_LANGUAGE_CONFIG,
                }),
            );
            test('THEN: renders with correct display class', () => {
                expect($('.ons-header__links .ons-grid__col').hasClass('ons-u-d-no@2xs@xs')).toBe(true);
            });
        });
    });
    describe('GIVEN: Params: navigation', () => {
        describe('WHEN: navigation parameters are provided', () => {
            const faker = templateFaker();
            const navigationSpy = faker.spy('navigation', { suppressOutput: true });
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
            });
            test('THEN: renders navigation with provided parameters', () => {
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
            test('THEN: renders button to toggle menu on small screen', () => {
                expect(buttonSpy.occurrences[0]).toEqual({
                    text: 'Menu',
                    classes: 'ons-u-ml-2xs ons-u-d-no ons-js-navigation-button ons-u-d-no@l',
                    variants: ['mobile', 'ghost'],
                    attributes: {
                        'aria-label': 'Toggle main menu',
                        'aria-controls': 'main-nav',
                        'aria-expanded': 'false',
                    },
                });
            });
        });
        describe('WHEN: fullWidth parameter is set to true', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    fullWidth: true,
                    ...EXAMPLE_HEADER_NAVIGATION_WITH_SUBNAVIGATION_CONFIG,
                }),
            );
            test('THEN: renders navigation container with fullWidth class', () => {
                const navContainer = $('.ons-navigation-wrapper .ons-container');
                expect($(navContainer).hasClass('ons-container--full-width')).toBe(true);
            });
            test('THEN: renders sub-navigation container with fullWidth class', () => {
                const subNavContainer = $('.ons-navigation--sub .ons-container');
                expect($(subNavContainer).hasClass('ons-container--full-width')).toBe(true);
            });
        });
        describe('WHEN: wide parameter is set to true', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_BASIC,
                    wide: true,
                    ...EXAMPLE_HEADER_NAVIGATION_WITH_SUBNAVIGATION_CONFIG,
                }),
            );
            test('THEN: renders navigation container with wide class', () => {
                const navContainer = $('.ons-navigation-wrapper .ons-container');
                expect($(navContainer).hasClass('ons-container--wide')).toBe(true);
            });
            test('THEN: renders sub-navigation container with wide class', () => {
                const subNavContainer = $('.ons-navigation--sub .ons-container');
                expect($(subNavContainer).hasClass('ons-container--wide')).toBe(true);
            });
        });
        describe('WHEN: navigation and siteSearchAutosuggest parameters are provided', () => {
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
            test('THEN: renders button to toggle search on small screen', () => {
                expect(buttonSpy.occurrences[0]).toEqual({
                    text: 'Search',
                    classes: 'ons-btn--search ons-u-ml-2xs ons-u-d-no ons-js-toggle-search',
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
    describe('GIVEN: params: languages', () => {
        describe('WHEN: language parameters are provided', () => {
            const faker = templateFaker();
            const languageSpy = faker.spy('language-selector', { suppressOutput: true });
            faker.renderComponent('header', { ...EXAMPLE_HEADER_BASIC, ...EXAMPLE_HEADER_LANGUAGE_CONFIG });
            test('THEN: renders language selector with provided language options', () => {
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
    });
    describe('GIVEN: Params: siteSearchAutosuggest', () => {
        const mockData = [
            { en: 'England' },
            { en: 'Wales' },
            { en: 'Scotland' },
            { en: 'United States of America' },
            { en: 'United States Virgin Islands' },
            { en: 'Åland Islands' },
        ];

        describe('WHEN: autosuggest parameters are provided', () => {
            const faker = templateFaker();
            const buttonSpy = faker.spy('autosuggest');

            faker.renderComponent('header', EXAMPLE_HEADER_NAVIGATION_WITH_SITESEARCHAUTOSUGGEST);

            test('THEN: renders search with provided parameters', () => {
                expect(buttonSpy.occurrences[0]).toEqual({
                    ariaLimitedResults: 'Type more characters to improve your search',
                    minChars: 3,
                    language: 'en-gb',
                    ariaMinChars: 'Enter 3 or more characters for suggestions.',
                    ariaNResults: 'There are {n} suggestions available.',
                    ariaOneResult: 'There is one suggestion available.',
                    ariaResultsLabel: 'Country suggestions',
                    ariaYouHaveSelected: 'You have selected',
                    containerClasses: 'ons-autosuggest--header',
                    id: 'ons-site-search',
                    input: {
                        accessiblePlaceholder: true,
                        autocomplete: 'off',
                        classes: 'ons-input-search ons-input-search--icon',
                        label: {
                            classes: 'ons-u-pl-xl ons-label--white',
                            id: 'ons-site-search-label',
                            text: 'label',
                        },
                    },
                    instructions: 'Use up and down keys to navigate.',
                    moreResults: 'Continue entering to improve suggestions',
                    noResults: 'No suggestions found.',
                    resultsTitle: 'Suggestions',
                    typeMore: 'Continue entering to get suggestions',
                });
            });
        });
        describe('WHEN: language is set', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_NAVIGATION_WITH_SITESEARCHAUTOSUGGEST,
                    autosuggestData: mockData,
                }),
            );
            test('THEN: rendered search component accesses set language', () => {
                $('.ons-js-autosuggest-input').val('Eng');
                const autosuggestElement = $('.ons-js-autosuggest').attr('data-lang');
                expect(autosuggestElement).toBe('en-gb');
            });
        });
        describe('WHEN: user enters text', () => {
            let $; // Initialize a Cheerio instance

            beforeEach(() => {
                $ = cheerio.load(
                    renderComponent('header', {
                        ...EXAMPLE_HEADER_NAVIGATION_WITH_SITESEARCHAUTOSUGGEST,
                        autosuggestData: mockData,
                    }),
                );
            });
            test('THEN: displays no suggestions when input length < minimum characters', () => {
                $('.ons-js-autosuggest-input').val('En');
                setTimeout(() => {
                    const suggestionCount = $('.ons-autosuggest__option').length;
                    expect(suggestionCount).toBe(0);
                }, 20);
            });
            test('THEN: displays suggestions when input length >= minimum characters', () => {
                $('.ons-js-autosuggest-input').val('Eng');
                setTimeout(() => {
                    const suggestionCount = $('.ons-autosuggest__option').length;
                    expect(suggestionCount).toBe(1);
                }, 20);
            });
        });
    });
});
