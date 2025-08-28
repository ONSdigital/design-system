/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { mapAll } from '../../tests/helpers/cheerio';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_OGL_LINK_PARAM = {
    pre: 'All content is available under the',
    text: 'Open Government Licence v3.0',
    url: 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/',
    post: ', except where otherwise stated',
};

const EXAMPLE_COLS_PARAM = [
    {
        title: 'First column',
        itemsList: [
            {
                url: '/example-link-a',
                text: 'Example Link A',
            },
        ],
    },
    {
        title: 'Second column',
        itemsList: [
            {
                url: '/example-link-b',
                text: 'Example Link B',
            },
        ],
    },
];

const EXAMPLE_ROWS_PARAM = [
    {
        itemsList: [
            {
                url: '/example-link-a',
                text: 'Example Link A',
            },
        ],
    },
    {
        itemsList: [
            {
                url: '/example-link-b',
                text: 'Example Link B',
            },
        ],
    },
];

const EXAMPLE_LEGAL_PARAM = [
    {
        itemsList: [
            {
                url: '/example-legal-link-a',
                text: 'Example Legal Link A',
            },
        ],
    },
    {
        itemsList: [
            {
                url: '/example-legal-link-b',
                text: 'Example Legal Link B',
            },
        ],
    },
];

describe('macro: footer', () => {
    it('decorates container block with `wide` modifier when the `wide` parameter is provided', () => {
        const $ = cheerio.load(
            renderComponent('footer', {
                wide: true,
            }),
        );

        const hasClass = $('.ons-container').hasClass('ons-container--wide');
        expect(hasClass).toBe(true);
    });

    it('does not decorate container block with `wide` modifier when the `wide` parameter is not provided', () => {
        const $ = cheerio.load(renderComponent('footer', {}));

        const hasClass = $('.ons-container').hasClass('ons-container--wide');
        expect(hasClass).toBe(false);
    });

    it('decorates container block with `fullWidth` modifier when the `fullWidth` parameter is provided', () => {
        const $ = cheerio.load(
            renderComponent('footer', {
                fullWidth: true,
            }),
        );

        const hasClass = $('.ons-container').hasClass('ons-container--full-width');
        expect(hasClass).toBe(true);
    });

    it('does not decorate container block with `fullWidth` modifier when the `fullWidth` parameter is not provided', () => {
        const $ = cheerio.load(renderComponent('footer', {}));

        const hasClass = $('.ons-container').hasClass('ons-container--full-width');
        expect(hasClass).toBe(false);
    });

    it('has additionally provided `attributes` on the `body` element', () => {
        const $ = cheerio.load(
            renderComponent('footer', {
                attributes: {
                    a: '123',
                    b: '456',
                },
            }),
        );

        expect($('.ons-footer__body').attr('a')).toBe('123');
        expect($('.ons-footer__body').attr('b')).toBe('456');
    });

    describe('OGL link', () => {
        const params = {
            oglLink: EXAMPLE_OGL_LINK_PARAM,
        };

        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('footer', params));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('renders OGL icon', () => {
            const faker = templateFaker();
            const iconsSpy = faker.spy('icon');

            faker.renderComponent('footer', params);

            expect(iconsSpy.occurrences).toContainEqual(expect.objectContaining({ iconType: 'ogl' }));
        });

        it('renders raw HTML when `html` is provided', () => {
            const $ = cheerio.load(
                renderComponent('footer', {
                    oglLink: {
                        ...params.oglLink,
                        html: '<strong>Bold text.</strong>',
                    },
                }),
            );

            const licenseHtml = $('.ons-footer__license').html();
            expect(licenseHtml).toContain('<strong>Bold text.</strong>');
        });

        it('renders link using the external link component', () => {
            const faker = templateFaker();
            const externalLinkSpy = faker.spy('external-link');

            faker.renderComponent('footer', params);

            expect(externalLinkSpy.occurrences).toContainEqual(
                expect.objectContaining({
                    url: 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/',
                    text: 'Open Government Licence v3.0',
                }),
            );
        });

        it('renders `post` content when provided', () => {
            const $ = cheerio.load(renderComponent('footer', params));

            const licenseHtml = $('.ons-footer__license').html();
            expect(licenseHtml).toContain(', except where otherwise stated');
        });

        it('renders welsh `post` content when `lang:cy` provided and `oglLink` is "true"', () => {
            const $ = cheerio.load(
                renderComponent('footer', {
                    lang: 'cy',
                    oglLink: true,
                }),
            );

            const licenseHtml = $('.ons-footer__license').html();
            expect(licenseHtml).toContain(', oni bai y nodir fel arall');
        });
    });

    describe('warning', () => {
        const params = {
            footerWarning: 'Footer warning text with <strong>bold</strong> content.',
        };

        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('footer', params));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('renders warning element', () => {
            const $ = cheerio.load(renderComponent('footer', params));

            const warningHtml = $('.ons-footer__warning').html();
            expect(warningHtml).toContain('Footer warning text with <strong>bold</strong> content.');
        });

        it('is not rendered when `footerWarning` is not provided', () => {
            const $ = cheerio.load(renderComponent('footer', {}));

            expect($('.ons-footer__warning').length).toBe(0);
        });

        it('renders warning text using the panel component', () => {
            const faker = templateFaker();
            const panelSpy = faker.spy('panel');

            faker.renderComponent('footer', params);

            expect(panelSpy.occurrences).toContainEqual(
                expect.objectContaining({
                    variant: 'warn',
                    classes: 'ons-panel--warn--footer',
                }),
            );
        });
    });

    describe('copyright', () => {
        const params = {
            copyrightDeclaration: {
                copyright: 'Crown copyright and database rights 2020 OS 100019153.',
                text: 'Use of address data is subject to the terms and conditions.',
            },
        };

        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('footer', params));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('renders copyright declaration', () => {
            const $ = cheerio.load(renderComponent('footer', params));

            const text = $('.ons-footer__copyright').text();
            expect(text).toBe(
                '© Crown copyright and database rights 2020 OS 100019153. Use of address data is subject to the terms and conditions.',
            );
        });

        it('is not rendered when `copyrightDeclaration` is not provided', () => {
            const $ = cheerio.load(renderComponent('footer', {}));

            expect($('.ons-footer__copyright').length).toBe(0);
        });
    });

    describe('cols', () => {
        const params = {
            cols: EXAMPLE_COLS_PARAM,
        };

        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('footer', params));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('renders expected column titles', () => {
            const $ = cheerio.load(renderComponent('footer', params));

            const titleHeadings = mapAll($('.ons-footer__heading'), (node) => node.text().trim());
            expect(titleHeadings).toEqual(['First column', 'Second column']);
        });

        it('renders expected lists using list component', () => {
            const faker = templateFaker();
            const listsSpy = faker.spy('list');

            faker.renderComponent('footer', params);

            const itemsList1 = listsSpy.occurrences[0].itemsList;
            expect(itemsList1[0]).toHaveProperty('url', '/example-link-a');
            expect(itemsList1[0]).toHaveProperty('text', 'Example Link A');

            const itemsList2 = listsSpy.occurrences[1].itemsList;
            expect(itemsList2[0]).toHaveProperty('url', '/example-link-b');
            expect(itemsList2[0]).toHaveProperty('text', 'Example Link B');
        });
    });

    describe('rows', () => {
        const params = {
            rows: EXAMPLE_ROWS_PARAM,
        };

        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('footer', params));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('renders expected lists using list component', () => {
            const faker = templateFaker();
            const listsSpy = faker.spy('list');

            faker.renderComponent('footer', params);

            const itemsList1 = listsSpy.occurrences[0].itemsList;
            expect(itemsList1[0]).toHaveProperty('url', '/example-link-a');
            expect(itemsList1[0]).toHaveProperty('text', 'Example Link A');

            const itemsList2 = listsSpy.occurrences[1].itemsList;
            expect(itemsList2[0]).toHaveProperty('url', '/example-link-b');
            expect(itemsList2[0]).toHaveProperty('text', 'Example Link B');
        });
    });

    describe('legal', () => {
        const params = {
            legal: EXAMPLE_LEGAL_PARAM,
        };

        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('footer', params));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('renders expected lists using list component', () => {
            const faker = templateFaker();
            const listsSpy = faker.spy('list');

            faker.renderComponent('footer', params);

            const itemsList1 = listsSpy.occurrences[0].itemsList;
            expect(itemsList1[0]).toHaveProperty('url', '/example-legal-link-a');
            expect(itemsList1[0]).toHaveProperty('text', 'Example Legal Link A');

            const itemsList2 = listsSpy.occurrences[1].itemsList;
            expect(itemsList2[0]).toHaveProperty('url', '/example-legal-link-b');
            expect(itemsList2[0]).toHaveProperty('text', 'Example Legal Link B');
        });
    });

    describe('Footer logo', () => {
        describe('default footer logo', () => {
            describe.each([
                [
                    'the `lang` parameter is not provided',
                    {},
                    {
                        iconType: 'ons-logo-en',
                        altText: 'Office for National Statistics',
                    },
                ],
                [
                    'the `lang` parameter is "en"',
                    { lang: 'en' },
                    {
                        iconType: 'ons-logo-en',
                        altText: 'Office for National Statistics',
                    },
                ],
            ])('where %s', (_, langParams, defaultIcon) => {
                const params = {
                    ...langParams,
                };
                it('renders the expected icon', () => {
                    const faker = templateFaker();
                    const iconsSpy = faker.spy('icon');

                    faker.renderComponent('footer', params);

                    expect(iconsSpy.occurrences).toContainEqual(expect.objectContaining(defaultIcon));
                });
            });
        });
        describe('provided footer logo', () => {
            describe.each([
                [
                    'the `lang` parameter is "cy"',
                    { lang: 'cy' },
                    {
                        iconType: 'ons-logo-cy',
                        altText: 'Swyddfa Ystadegau Gwladol',
                    },
                ],
            ])('where %s', (_, langParams, defaultIcon) => {
                const params = {
                    ...langParams,
                };
                it('renders the expected icon', () => {
                    const faker = templateFaker();
                    const iconsSpy = faker.spy('icon');

                    faker.renderComponent('footer', params);

                    expect(iconsSpy.occurrences).toContainEqual(expect.objectContaining(defaultIcon));
                });
            });
        });
        describe('correct link for language', () => {
            it('has the Welsh lang link when the default Welsh lang ONS icon is present', () => {
                const $ = cheerio.load(renderComponent('footer', { lang: 'cy' }));

                expect($('.ons-footer__logo-link').attr('href')).toBe('https://cy.ons.gov.uk/');
            });
            it('has the English lang link when the default English lang ONS icon is present', () => {
                const $ = cheerio.load(renderComponent('footer', { lang: 'en' }));

                expect($('.ons-footer__logo-link').attr('href')).toBe('https://www.ons.gov.uk/');
            });
        });
        describe('provided footer logo', () => {
            describe.each([
                [
                    'the `footerLogo` and `oglLink` parameters are provided',
                    {
                        footerLogo: {
                            logos: {
                                logo1: { logoImage: '<img src="logo.svg" class="custom-logo" alt="logo">' },
                            },
                        },
                        oglLink: EXAMPLE_OGL_LINK_PARAM,
                    },
                ],
                [
                    'the `footerLogo` and `legal` parameters are provided',
                    {
                        footerLogo: {
                            logos: {
                                logo1: { logoImage: '<img src="logo.svg" class="custom-logo" alt="logo">' },
                            },
                        },
                        legal: EXAMPLE_LEGAL_PARAM,
                    },
                ],
                [
                    'the `footerLogo` and `crest` parameters are provided',
                    {
                        footerLogo: {
                            logos: {
                                logo1: { logoImage: '<img src="logo.svg" class="custom-logo" alt="logo">' },
                            },
                        },
                        crest: true,
                    },
                ],
                [
                    'the `footerLogo`, `legal` and `crest` parameters are provided',
                    {
                        footerLogo: {
                            logos: {
                                logo1: { logoImage: '<img src="logo.svg" class="custom-logo" alt="logo">' },
                            },
                        },
                        legal: EXAMPLE_LEGAL_PARAM,
                        crest: true,
                    },
                ],
                [
                    'the `footerLogo` parameter is provided but the `legal` and `crest` parameters are not provided',
                    {
                        footerLogo: {
                            logos: {
                                logo1: { logoImage: '<img src="logo.svg" class="custom-logo" alt="logo">' },
                            },
                        },
                    },
                ],
            ])('where %s', (_, footerLogoParams) => {
                const params = {
                    ...footerLogoParams,
                };

                it('passes jest-axe checks', async () => {
                    const $ = cheerio.load(renderComponent('footer', params));

                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                it('renders the expected logo', () => {
                    const $ = cheerio.load(renderComponent('footer', params));

                    expect($('.custom-logo').length).toBe(1);
                });
            });

            it('has the extra footer logo image and link', () => {
                const $ = cheerio.load(
                    renderComponent('footer', {
                        footerLogo: {
                            logos: {
                                logo1: { logoImage: '<img src="logo.svg" class="custom-logo" alt="logo">' },
                                logo2: {
                                    logoUrl: '#0',
                                    logoImage: '<img src="a-logo.svg">',
                                },
                            },
                        },
                        legal: EXAMPLE_LEGAL_PARAM,
                        crest: true,
                    }),
                );

                expect($('.ons-footer__logo-link').attr('href')).toBe('#0');
                expect($('.ons-footer__logo-link > img').attr('src')).toBe('a-logo.svg');
            });

            it('has the correct class applied for opposite display of logos', () => {
                const $ = cheerio.load(
                    renderComponent('footer', {
                        footerLogo: {
                            logos: {
                                logo1: { logoImage: '<img src="logo.svg" class="custom-logo" alt="logo">' },
                                logo2: {
                                    logoUrl: '#0',
                                    logoImage: '<img src="a-logo.svg">',
                                },
                            },
                            display: 'split',
                        },
                        legal: EXAMPLE_LEGAL_PARAM,
                        crest: true,
                    }),
                );

                expect($('.ons-footer__logo-container').attr('class')).toContain('ons-grid-flex--between');
            });
        });
    });

    describe('save and sign out button', () => {
        const params = {
            button: {
                id: 'save-and-sign-out',
                classes: 'extra-class',
                text: 'Save changes and sign out',
                name: 'button-name',
                attributes: { a: 42 },
                url: 'https://example.com/',
            },
        };

        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('footer', params));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('renders "Save changes and sign out" button using the button component', () => {
            const faker = templateFaker();
            const buttonSpy = faker.spy('button');

            faker.renderComponent('footer', params);

            expect(buttonSpy.occurrences).toContainEqual(
                expect.objectContaining({
                    ...params.button,
                    variants: 'ghost',
                }),
            );
        });
    });

    describe('new tab warning', () => {
        const params = {
            newTabWarning: 'The following links open in a <strong>new tab</strong>',
        };

        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('footer', params));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('renders new tab warning element', () => {
            const $ = cheerio.load(renderComponent('footer', params));

            const warningHtml = $('.ons-footer__new-tab-warning').html();
            expect(warningHtml).toContain('The following links open in a <strong>new tab</strong>');
        });

        it('is not rendered when `newTabWarning` is not provided', () => {
            const $ = cheerio.load(renderComponent('footer', {}));

            expect($('.ons-footer__new-tab-warning').length).toBe(0);
        });
    });

    describe('crest', () => {
        const params = {
            crest: true,
            legal: true,
        };

        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('footer', params));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('renders crest icon when `crest` parameter is provided', () => {
            const faker = templateFaker();
            const iconsSpy = faker.spy('icon');

            faker.renderComponent('footer', params);

            expect(iconsSpy.occurrences).toContainEqual(expect.objectContaining({ iconType: 'crest' }));
        });

        it('renders "crest" element', () => {
            const $ = cheerio.load(renderComponent('footer', params));

            expect($('.ons-footer__crest').length).toBe(1);
        });
    });
});
