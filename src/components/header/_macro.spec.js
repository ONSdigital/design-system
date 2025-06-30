/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';
import { mapAll } from '../../tests/helpers/cheerio';
import NavigationToggle from '../../components/navigation/navigation';

import {
    EXAMPLE_HEADER_BASIC,
    EXAMPLE_SERVICE_LINKS_CONFIG,
    EXAMPLE_HEADER_SEARCH_LINKS,
    EXAMPLE_HEADER_SERVICE_LINKS_MULTIPLE,
    EXAMPLE_HEADER_SERVICE_LINKS_SINGLE,
    EXAMPLE_HEADER_LANGUAGE_CONFIG,
    EXAMPLE_HEADER_NAVIGATION_WITH_SUBNAVIGATION_CONFIG,
    EXAMPLE_HEADER_NAVIGATION_WITH_SITESEARCHAUTOSUGGEST,
    EXAMPLE_HEADER_MENU_LINKS,
    EXAMPLE_HEADER_SEARCH_AND_MENU_LINKS,
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
        describe('WHEN: variants is set to basic', () => {
            test('THEN: does not render the main part of the header', () => {
                const $ = cheerio.load(
                    renderComponent('header', {
                        variants: 'basic',
                    }),
                );
                expect($('.ons-header > .ons-header__main').length).toBe(0);
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
                expect(iconsSpy.occurrences[0].altText).toBe('Office for National Statistics logo');
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
    describe('GIVEN: Params: mastheadLogoAltText', () => {
        describe('WHEN: mastheadLogoAltText is provided', () => {
            const faker = templateFaker();
            const iconsSpy = faker.spy('icon');
            faker.renderComponent('header', {
                ...EXAMPLE_HEADER_BASIC,
                mastheadLogoAltText: 'Custom alt text for logo',
            });
            test('THEN: renders logo with provided alt text', () => {
                expect(iconsSpy.occurrences[0].altText).toBe('Custom alt text for logo');
            });
        });
        describe('WHEN: mastheadLogoAltText is not provided', () => {
            const faker = templateFaker();
            const iconsSpy = faker.spy('icon');
            faker.renderComponent('header', {
                ...EXAMPLE_HEADER_BASIC,
                mastheadLogoAltText: undefined,
            });
            test('THEN: renders logo with default alt text', () => {
                expect(iconsSpy.occurrences[0].altText).toBe('Office for National Statistics logo');
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
    describe('GIVEN: Params: searchLinks', () => {
        describe('WHEN: searchLinks are provided', () => {
            const faker = templateFaker();
            const buttonSpy = faker.spy('button', { suppressOutput: true });
            faker.renderComponent('header', { ...EXAMPLE_HEADER_SEARCH_LINKS, variants: 'basic' });

            test('THEN: renders search icon button', () => {
                expect(buttonSpy.occurrences[0]).toEqual({
                    iconType: 'search',
                    classes: 'ons-u-fs-s--b ons-js-toggle-header-search ons-btn--close ons-btn--search-icon active disabled',
                    type: 'button',
                    variants: 'search',
                    attributes: {
                        'aria-controls': 'search-links-id',
                        'aria-expanded': 'true',
                        'aria-label': 'Custom search button aria label',
                        'aria-disabled': 'true',
                    },
                });
            });
        });

        describe('WHEN: itemsList are provided in searchLinks', () => {
            const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_SEARCH_LINKS, variants: 'basic' }));

            test('THEN: renders items list', () => {
                const itemsList = $('.ons-list--bare .ons-list__item').length;
                expect(itemsList).toBeGreaterThan(0);
            });

            test('THEN: renders correct links for items list', () => {
                const searchItemsLinks = mapAll($('.ons-list--bare .ons-list__item a'), (node) => node.attr('href'));
                expect(searchItemsLinks).toEqual(['#1', '#2', '#3']);
            });

            test('THEN: renders correct text for items list', () => {
                const searchItemsText = mapAll($('.ons-list--bare .ons-list__item a'), (node) => node.text().trim());
                expect(searchItemsText).toEqual(['Popular Search 1', 'Popular Search 2', 'Popular Search 3']);
            });
        });

        describe('WHEN: searchLinks parameter is missing', () => {
            const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_BASIC));

            test('THEN: does not render search icon button', () => {
                expect($('.ons-js-toggle-services').length).toBe(0);
            });

            test('THEN: does not render search input form', () => {
                expect($('.ons-header-nav-search').length).toBe(0);
            });

            test('THEN: does not render items list', () => {
                expect($('.ons-list--bare').length).toBe(0);
            });
        });

        describe('WHEN: searchLinks are provided and the header variant is not basic', () => {
            const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_SEARCH_LINKS, variants: 'neutral' }));

            test('THEN: does not render the search icon button', () => {
                expect($('.ons-js-toggle-services').length).toBe(0);
            });
        });

        describe('WHEN: heading parameter is provided', () => {
            const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_SEARCH_LINKS, variants: 'basic' }));

            test('THEN: it renders heading with provided text', () => {
                expect($('.ons-header-nav-search__heading').text().trim()).toBe('Header Search');
            });
        });

        describe('WHEN: id parameter is provided', () => {
            const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_SEARCH_LINKS, variants: 'basic' }));

            test('THEN: applies id to search links ', () => {
                expect($('#search-links-id').length).toBe(1);
            });
        });

        describe('WHEN: ariaLabel parameter is provided', () => {
            const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_SEARCH_LINKS, variants: 'basic' }));

            test('THEN: applies aria label to the search links', () => {
                expect($('.ons-header-nav-search').attr('aria-label')).toBe('Header Search');
            });
        });

        describe('WHEN: classes parameter is provided', () => {
            const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_SEARCH_LINKS, variants: 'basic' }));

            test('THEN: it renders classes with provided value', () => {
                expect($('.ons-header-nav-search').hasClass('custom-class')).toBe(true);
            });
        });

        describe('WHEN: using basic header variant and search is active & disabled by default before JS loads', () => {
            const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_SEARCH_LINKS, variants: 'basic' }));
            const $searchBtn = $('.ons-js-toggle-header-search');

            test('THEN: adds the "active" class to the search toggle button', () => {
                expect($searchBtn.hasClass('active')).toBe(true);
            });

            test('THEN: adds the "disabled" class to the search toggle button', () => {
                expect($searchBtn.hasClass('disabled')).toBe(true);
            });

            test('THEN: sets aria-disabled="true" on the search toggle button', () => {
                expect($searchBtn.attr('aria-disabled')).toBe('true');
            });
        });

        describe('WHEN: searchLinks are provided with all custom properties', () => {
            const faker = templateFaker();
            const buttonSpy = faker.spy('button', { suppressOutput: true });
            faker.renderComponent('header', { ...EXAMPLE_HEADER_SEARCH_LINKS, variants: 'basic' });
            test('THEN: renders search icon button with custom aria-label', () => {
                expect(buttonSpy.occurrences[0]).toBeDefined();
                expect(buttonSpy.occurrences[0].attributes['aria-label']).toBe('Custom search button aria label');
            });
        });
        describe('WHEN: searchButtonAriaLabel is not provided', () => {
            const faker = templateFaker();
            const buttonSpy = faker.spy('button', { suppressOutput: true });
            faker.renderComponent('header', {
                ...EXAMPLE_HEADER_SEARCH_LINKS,
                searchLinks: {
                    ...EXAMPLE_HEADER_SEARCH_LINKS.searchLinks,
                    searchButtonAriaLabel: undefined,
                },
                variants: 'basic',
            });
            test('THEN: renders search icon button with default aria-label', () => {
                expect(buttonSpy.occurrences[0]).toBeDefined();
                expect(buttonSpy.occurrences[0].attributes['aria-label']).toBe('Toggle search');
            });
        });
        describe('WHEN: searchNavigationButtonAriaLabel is provided', () => {
            const faker = templateFaker();
            const buttonSpy = faker.spy('button', { suppressOutput: true });
            faker.renderComponent('header', {
                ...EXAMPLE_HEADER_SEARCH_LINKS,
                siteSearchAutosuggest: {},
            });
            test('THEN: renders search navigation button with custom aria-label', () => {
                const found = buttonSpy.occurrences.find(
                    (btn) => btn.attributes && btn.attributes['aria-label'] === 'Custom search nav button aria label',
                );
                expect(found).toBeDefined();
            });
        });
        describe('WHEN: searchNavigationButtonAriaLabel is not provided', () => {
            const faker = templateFaker();
            const buttonSpy = faker.spy('button', { suppressOutput: true });
            faker.renderComponent('header', {
                ...EXAMPLE_HEADER_SEARCH_LINKS,
                searchLinks: {
                    ...EXAMPLE_HEADER_SEARCH_LINKS.searchLinks,
                    searchNavigationButtonAriaLabel: undefined,
                },
                siteSearchAutosuggest: {},
            });
            test('THEN: renders search navigation button with default aria-label', () => {
                const found = buttonSpy.occurrences.find((btn) => btn.attributes && btn.attributes['aria-label'] === 'Toggle search');
                expect(found).toBeDefined();
            });
        });
        describe('WHEN: searchNavigationInputLabel is provided', () => {
            const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_SEARCH_LINKS, variants: 'basic' }));
            test('THEN: renders search input with custom label', () => {
                expect($('#header-search-input-label').text().trim()).toBe('Custom search input label');
            });
        });
        describe('WHEN: searchNavigationInputLabel is not provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_SEARCH_LINKS,
                    searchLinks: {
                        ...EXAMPLE_HEADER_SEARCH_LINKS.searchLinks,
                        searchNavigationInputLabel: undefined,
                    },
                    variants: 'basic',
                }),
            );
            test('THEN: renders search input with default label', () => {
                expect($('#header-search-input-label').text().trim()).toBe('Search the ONS');
            });
        });
        describe('WHEN: searchNavigationButtonText is provided', () => {
            const $ = cheerio.load(renderComponent('header', { ...EXAMPLE_HEADER_SEARCH_LINKS, variants: 'basic' }));

            test('THEN: renders the visually hidden search navigation button text', () => {
                const $button = $('.ons-search__btn.ons-btn--header-search');
                const hiddenText = $button.find('.ons-u-vh').text().trim();
                expect(hiddenText).toBe(EXAMPLE_HEADER_SEARCH_LINKS.searchLinks.searchNavigationButtonText);
            });
        });
        describe('WHEN: searchNavigationButtonText is not provided', () => {
            const $ = cheerio.load(
                renderComponent('header', {
                    ...EXAMPLE_HEADER_SEARCH_LINKS,
                    searchLinks: {
                        ...EXAMPLE_HEADER_SEARCH_LINKS.searchLinks,
                        searchNavigationButtonText: undefined,
                    },
                    variants: 'basic',
                }),
            );

            test('THEN: renders the default fallback search navigation button text', () => {
                const $button = $('.ons-search__btn.ons-btn--header-search');
                const hiddenText = $button.find('.ons-u-vh').text().trim();
                expect(hiddenText).toBe('Search');
            });
        });
    });

    describe('GIVEN: Params: menuLinks', () => {
        describe('WHEN: using basic header variant and menu toggle is rendered before JS loads', () => {
            const $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_MENU_LINKS));
            const $menuBtn = $('.ons-js-toggle-nav-menu');

            test('THEN: adds the "active" class to the menu toggle button', () => {
                expect($menuBtn.hasClass('active')).toBe(true);
            });

            test('THEN: adds the "disabled" class to the menu toggle button', () => {
                expect($menuBtn.hasClass('disabled')).toBe(true);
            });

            test('THEN: sets aria-disabled="true" on the menu toggle button', () => {
                expect($menuBtn.attr('aria-disabled')).toBe('true');
            });

            test('THEN: sets aria-expanded="true" on the menu toggle button', () => {
                expect($menuBtn.attr('aria-expanded')).toBe('true');
            });

            test('THEN: sets aria-controls to the correct menu ID', () => {
                expect($menuBtn.attr('aria-controls')).toBe('menu-links-id');
            });
        });

        describe('GIVEN: Progressive enhancement via JS', () => {
            describe('WHEN: both menu and search toggles are present', () => {
                let $, menuBtn, searchBtn, menuEl, searchEl;

                beforeEach(() => {
                    $ = cheerio.load(renderComponent('header', EXAMPLE_HEADER_SEARCH_AND_MENU_LINKS));
                    document.body.innerHTML = $.html();

                    menuBtn = document.querySelector('.ons-js-toggle-nav-menu');
                    menuEl = document.querySelector('.ons-js-nav-menu');
                    searchBtn = document.querySelector('.ons-js-toggle-header-search');
                    searchEl = document.querySelector('.ons-js-header-search');

                    if (menuBtn && menuEl) {
                        const navToggleMenu = new NavigationToggle(menuBtn, menuEl, 'ons-u-d-no');
                        navToggleMenu.registerEvents();
                    }

                    if (searchBtn && searchEl) {
                        const navToggleSearch = new NavigationToggle(searchBtn, searchEl, 'ons-u-d-no');
                        navToggleSearch.registerEvents();
                    }
                });

                test('THEN: menu toggle is active (aria-disabled false, no disabled class)', () => {
                    expect(menuBtn).not.toBeNull();
                    expect(menuBtn.getAttribute('aria-disabled')).toBe('false');
                    expect(menuBtn.classList.contains('disabled')).toBe(false);
                });

                test('THEN: search toggle is active (aria-disabled false, no disabled class)', () => {
                    expect(searchBtn).not.toBeNull();
                    expect(searchBtn.getAttribute('aria-disabled')).toBe('false');
                    expect(searchBtn.classList.contains('disabled')).toBe(false);
                });

                test('WHEN: clicking menu toggle closes search if open', () => {
                    expect(menuBtn && searchBtn).not.toBeNull();

                    // open search followed by menu
                    searchBtn.click();
                    menuBtn.click();

                    expect(searchBtn.classList.contains('active')).toBe(false);
                    expect(searchEl.getAttribute('aria-hidden')).toBe('true');
                    expect(searchEl.classList.contains('ons-u-d-no')).toBe(true);
                });

                test('WHEN: clicking search toggle closes menu if open', () => {
                    expect(menuBtn && searchBtn).not.toBeNull();

                    // open menu followed by search
                    menuBtn.click();
                    searchBtn.click();

                    expect(menuBtn.classList.contains('active')).toBe(false);
                    expect(menuEl.getAttribute('aria-hidden')).toBe('true');
                    expect(menuEl.classList.contains('ons-u-d-no')).toBe(true);
                });
            });
        });
    });
});
