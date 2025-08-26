/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_HERO = {
    title: 'Hero title',
    subtitle: 'Hero subtitle',
    text: 'Hero text',
    button: {
        url: '#0',
        text: 'Get started',
    },
};

describe('macro: hero', () => {
    it('passes jest-axe checks with', async () => {
        const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO));

        const results = await axe($.html());
        expect(results).toHaveNoViolations();
    });

    it('has provided variant style classes', () => {
        const $ = cheerio.load(
            renderComponent('hero', {
                variants: ['variant-a', 'variant-b'],
            }),
        );

        expect($('.ons-hero--variant-a').length).toBe(1);
        expect($('.ons-hero--variant-b').length).toBe(1);
    });

    it('has expected `title`', () => {
        const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO));

        const title = $('.ons-hero__title').html().trim();
        expect(title).toBe('Hero title');
    });

    it('has expected `subtitle`', () => {
        const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO));

        const title = $('.ons-hero__subtitle').html().trim();
        expect(title).toBe('Hero subtitle');
    });

    it('has expected `text`', () => {
        const $ = cheerio.load(renderComponent('hero', EXAMPLE_HERO));

        const title = $('.ons-hero__text').html().trim();
        expect(title).toBe('Hero text');
    });

    it('has expected `html`', () => {
        const $ = cheerio.load(renderComponent('hero', { ...EXAMPLE_HERO, html: '<span class="some-html">some html</span>' }));

        const htmlOutput = $('.ons-hero__additional-html').html();
        expect(htmlOutput).toBe('<span class="some-html">some html</span>');
    });

    it('outputs the expected button', () => {
        const faker = templateFaker();
        const buttonSpy = faker.spy('button');

        faker.renderComponent('hero', EXAMPLE_HERO);

        expect(buttonSpy.occurrences[0]).toHaveProperty('text', 'Get started');
        expect(buttonSpy.occurrences[0]).toHaveProperty('url', '#0');
    });

    it('outputs the correct button class with `dark` variant', () => {
        const faker = templateFaker();
        const buttonSpy = faker.spy('button');

        faker.renderComponent('hero', { ...EXAMPLE_HERO, variants: 'dark' });

        expect(buttonSpy.occurrences[0]).toHaveProperty('classes', 'ons-u-mt-s ons-btn--ghost');
    });

    it('calls with content', () => {
        const $ = cheerio.load(renderComponent('hero', { EXAMPLE_HERO }, 'Example content...'));

        const content = $('.ons-hero__additional-content').text().trim();
        expect(content).toEqual(expect.stringContaining('Example content...'));
    });

    it('renders circles when variant is `navy blue`', () => {
        const $ = cheerio.load(renderComponent('hero', { ...EXAMPLE_HERO, variants: 'navy-blue' }));
        expect($('.ons-hero--navy-blue .ons-hero__circles').length).toBe(1);
    });

    it('renders circles when variant is `pale blue`', () => {
        const $ = cheerio.load(renderComponent('hero', { ...EXAMPLE_HERO, variants: 'pale-blue' }));
        expect($('.ons-hero--pale-blue .ons-hero__circles').length).toBe(1);
    });

    it('outputs the correct topic when set', () => {
        const $ = cheerio.load(renderComponent('hero', { ...EXAMPLE_HERO, topic: 'Topic Text' }));

        const content = $('.ons-hero--topic').text().trim();
        expect(content).toBe('Topic Text');
    });

    it('outputs the official statistics badge when officialStatisticsBadge is set to true and variants is set to "grey"', () => {
        const $ = cheerio.load(renderComponent('hero', { ...EXAMPLE_HERO, variants: 'grey', officialStatisticsBadge: true }));

        expect($('.ons-hero__badge').length).toBe(1);
        expect($('.ons-hero__badge svg title').text().trim()).toBe('Official Statistics Badge - Accredited');
    });

    it('outputs the statistics badge as a link when officialStatisticsBadgeUrl is provided', () => {
        const $ = cheerio.load(
            renderComponent('hero', {
                ...EXAMPLE_HERO,
                variants: 'grey',
                officialStatisticsBadge: true,
                officialStatisticsBadgeUrl: 'https://example.com/badge',
            }),
        );

        expect($('.ons-hero__badge-link').length).toBe(1);
        expect($('.ons-hero__badge-link').attr('href')).toBe('https://example.com/badge');
        expect($('.ons-hero__badge-link').attr('target')).toBe('_blank');
        expect($('.ons-hero__badge-link').attr('rel')).toBe('noopener noreferrer');
    });

    it('outputs the Census 2021 Logo when censusLogo is set to true and variants is set to "grey"', () => {
        const $ = cheerio.load(renderComponent('hero', { ...EXAMPLE_HERO, variants: 'grey', censusLogo: true }));

        expect($('.ons-hero__census-logo').length).toBe(1);
        expect($('.ons-hero__census-logo svg title').text().trim()).toBe('Census 2021 Logo');
    });

    it('does not render the official statistics badge when officialStatisticsBadge is set to true and variants is not set', () => {
        const $ = cheerio.load(renderComponent('hero', { ...EXAMPLE_HERO, censusLogo: true }));

        expect($('.ons-hero__badge').length).toBe(0);
    });

    it('does not render the Census 2021 Logo when censusLogo is set to true and variants is not set', () => {
        const $ = cheerio.load(renderComponent('hero', { ...EXAMPLE_HERO, censusLogo: true }));

        expect($('.ons-hero__census-logo').length).toBe(0);
    });

    it('renders curved gradient when variant is `grey`', () => {
        const $ = cheerio.load(renderComponent('hero', { ...EXAMPLE_HERO, variants: 'grey' }));
        expect($('.ons-hero--grey').length).toBe(1);
    });

    describe('when `informationPanel` is provided and the variant is set to `grey`', () => {
        describe('and `panelText` and `panelLink` are provided', () => {
            it('renders the information panel with correct text and link`', () => {
                const $ = cheerio.load(
                    renderComponent('hero', {
                        ...EXAMPLE_HERO,
                        variants: 'grey',
                        informationPanel: {
                            panelText: 'Some panel text',
                            panelType: 'ons-green',
                            panelLink: {
                                text: 'Some link text',
                                url: '#0',
                            },
                        },
                    }),
                );

                expect($('.ons-hero__information').length).toBe(1);
                expect($('.ons-hero__panel').length).toBe(1);
                expect($('.ons-hero__panel').text().trim()).toBe('Some panel text');
                expect($('.ons-hero__link > a').text().trim()).toBe('Some link text');
                expect($('.ons-hero__link > a').attr('href')).toBe('#0');
            });

            it('renders the `informationPanel` link with a custom aria-label', () => {
                const $ = cheerio.load(
                    renderComponent('hero', {
                        ...EXAMPLE_HERO,
                        variants: 'grey',
                        informationPanel: {
                            panelText: 'Some panel text',
                            panelType: 'ons-green',
                            panelLink: {
                                text: 'Some link text',
                                url: '#0',
                                ariaLabel: 'Some link aria label',
                            },
                        },
                    }),
                );
                const link = $('.ons-hero__link > a');
                expect(link.attr('aria-label')).toBe('Some link aria label');
                expect(link.text().trim()).toBe('Some link text');
                expect(link.attr('href')).toBe('#0');
            });
        });

        describe('and `panelType` is set to `ons-green`', () => {
            it('renders the green information panel`', () => {
                const $ = cheerio.load(
                    renderComponent('hero', {
                        ...EXAMPLE_HERO,
                        variants: 'grey',
                        informationPanel: {
                            panelText: 'Some panel text',
                            panelType: 'ons-green',
                        },
                    }),
                );

                expect($('.ons-hero__panel').hasClass('ons-hero__panel--ons-green')).toBe(true);
            });
        });

        describe('and `panelType` is set to `ons-red`', () => {
            it('renders the red information panel`', () => {
                const $ = cheerio.load(
                    renderComponent('hero', {
                        ...EXAMPLE_HERO,
                        variants: 'grey',
                        informationPanel: {
                            panelText: 'Some panel text',
                            panelType: 'ons-red',
                        },
                    }),
                );

                expect($('.ons-hero__panel').hasClass('ons-hero__panel--ons-red')).toBe(true);
            });
        });

        describe('and `panelType` is set to `ons-orange`', () => {
            it('renders the orange information panel`', () => {
                const $ = cheerio.load(
                    renderComponent('hero', {
                        ...EXAMPLE_HERO,
                        variants: 'grey',
                        informationPanel: {
                            panelText: 'Some panel text',
                            panelType: 'ons-orange',
                        },
                    }),
                );

                expect($('.ons-hero__panel').hasClass('ons-hero__panel--ons-orange')).toBe(true);
            });
        });
    });

    it('outputs the correct description list value', () => {
        const $ = cheerio.load(
            renderComponent('hero', {
                ...EXAMPLE_HERO,
                variants: 'grey',
                descriptionList: {
                    termCol: '4',
                    descriptionCol: '8',
                    itemsList: [
                        {
                            term: 'term1:',
                            descriptions: [
                                {
                                    description: 'description1',
                                },
                            ],
                        },
                        {
                            term: 'term2:',
                            descriptions: [
                                {
                                    description: 'description2',
                                },
                            ],
                        },
                    ],
                },
            }),
        );

        const descriptionText = $('.ons-description-list__value');
        expect($(descriptionText[0]).text().trim()).toBe('description1');
        expect($(descriptionText[1]).text().trim()).toBe('description2');
    });
});
