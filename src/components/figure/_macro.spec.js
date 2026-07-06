/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_FIGURE_BASIC = {
    title: 'Figure title',
    id: 'example-figure',
};

const EXAMPLE_FIGURE_FULL = {
    id: 'example-figure',
    headingLevel: 3,
    figure_number: 'Figure 1',
    title: 'Remote working trends, 2019 to 2023',
    subtitle: 'Percentage of workforce working from home at least one day per week',
    caption: 'Source: Office for National Statistics',
    audioDescription: 'A line chart showing the percentage of workers working from home rising from 12% in 2019 to 28% in 2023',
    footnotes: {
        title: 'Footnotes',
        content: 'Data is seasonally adjusted.',
    },
    download: {
        title: 'Download this chart',
        itemsList: [
            {
                text: 'Remote working trends (CSV format, 2KB)',
                url: '/data/remote-working.csv',
                download: 'file',
            },
        ],
    },
};

const CALLER_CONTENT = '<div class="test-content">Nested content</div>';

describe('macro: figure', () => {
    it('passes jest-axe checks', async () => {
        const $ = cheerio.load(renderComponent('figure', EXAMPLE_FIGURE_FULL, CALLER_CONTENT));

        const results = await axe($.html());
        expect(results).toHaveNoViolations();
    });

    describe('figure element', () => {
        it('renders a <figure> element', () => {
            const $ = cheerio.load(renderComponent('figure', EXAMPLE_FIGURE_BASIC, CALLER_CONTENT));

            expect($('figure.ons-figure').length).toBe(1);
        });

        it('has the provided `id` attribute', () => {
            const $ = cheerio.load(renderComponent('figure', EXAMPLE_FIGURE_BASIC, CALLER_CONTENT));

            expect($('.ons-figure').attr('id')).toBe('example-figure');
        });

        it('renders caller content inside the content area', () => {
            const $ = cheerio.load(renderComponent('figure', EXAMPLE_FIGURE_BASIC, CALLER_CONTENT));

            expect($('.ons-figure__content .test-content').length).toBe(1);
            expect($('.ons-figure__content .test-content').text()).toBe('Nested content');
        });
    });

    describe('figure number', () => {
        it('renders the figure number when provided', () => {
            const $ = cheerio.load(
                renderComponent(
                    'figure',
                    {
                        ...EXAMPLE_FIGURE_BASIC,
                        figure_number: 'Figure 1',
                    },
                    CALLER_CONTENT,
                ),
            );

            expect($('.ons-figure__number').text()).toBe('Figure 1');
        });

        it('does not render the figure number when not provided', () => {
            const $ = cheerio.load(renderComponent('figure', EXAMPLE_FIGURE_BASIC, CALLER_CONTENT));

            expect($('.ons-figure__number').length).toBe(0);
        });
    });

    describe('title', () => {
        it('renders the title', () => {
            const $ = cheerio.load(renderComponent('figure', EXAMPLE_FIGURE_BASIC, CALLER_CONTENT));

            expect($('.ons-figure__title').text()).toBe('Figure title');
        });

        it('does not render the title when not provided', () => {
            const $ = cheerio.load(
                renderComponent(
                    'figure',
                    {
                        id: 'example-figure',
                    },
                    CALLER_CONTENT,
                ),
            );

            expect($('.ons-figure__title').length).toBe(0);
        });
    });

    describe('subtitle', () => {
        it('renders the subtitle', () => {
            const $ = cheerio.load(
                renderComponent(
                    'figure',
                    {
                        ...EXAMPLE_FIGURE_BASIC,
                        subtitle: 'A subtitle',
                    },
                    CALLER_CONTENT,
                ),
            );

            expect($('.ons-figure__subtitle').text()).toBe('A subtitle');
        });

        it('does not render the subtitle when not provided', () => {
            const $ = cheerio.load(renderComponent('figure', EXAMPLE_FIGURE_BASIC, CALLER_CONTENT));

            expect($('.ons-figure__subtitle').length).toBe(0);
        });
    });

    describe('heading levels', () => {
        it('defaults to h2 for the title and h3 for the subtitle', () => {
            const $ = cheerio.load(
                renderComponent(
                    'figure',
                    {
                        ...EXAMPLE_FIGURE_BASIC,
                        subtitle: 'A subtitle',
                    },
                    CALLER_CONTENT,
                ),
            );

            expect($('.ons-figure__title')[0].tagName).toBe('h2');
            expect($('.ons-figure__subtitle')[0].tagName).toBe('h3');
        });

        it('uses the provided headingLevel for the title', () => {
            const $ = cheerio.load(
                renderComponent(
                    'figure',
                    {
                        ...EXAMPLE_FIGURE_BASIC,
                        headingLevel: 3,
                    },
                    CALLER_CONTENT,
                ),
            );

            expect($('.ons-figure__title')[0].tagName).toBe('h3');
        });

        it('renders the subtitle one level below the title', () => {
            const $ = cheerio.load(
                renderComponent(
                    'figure',
                    {
                        ...EXAMPLE_FIGURE_BASIC,
                        headingLevel: 4,
                        subtitle: 'A subtitle',
                    },
                    CALLER_CONTENT,
                ),
            );

            expect($('.ons-figure__title')[0].tagName).toBe('h4');
            expect($('.ons-figure__subtitle')[0].tagName).toBe('h5');
        });

        it('renders footnotes heading two levels below the title', () => {
            const faker = templateFaker();
            const detailsSpy = faker.spy('details');

            faker.renderComponent(
                'figure',
                {
                    ...EXAMPLE_FIGURE_BASIC,
                    headingLevel: 3,
                    footnotes: {
                        title: 'Footnotes',
                        content: 'Some notes.',
                    },
                },
                CALLER_CONTENT,
            );

            expect(detailsSpy.occurrences[0].headingLevel).toBe(5);
        });

        it('renders download heading two levels below the title', () => {
            const faker = templateFaker();
            const detailsSpy = faker.spy('details');

            faker.renderComponent(
                'figure',
                {
                    ...EXAMPLE_FIGURE_BASIC,
                    headingLevel: 3,
                    download: {
                        title: 'Downloads',
                        itemsList: [{ text: 'A file', url: '/file.csv', download: 'file' }],
                    },
                },
                CALLER_CONTENT,
            );

            expect(detailsSpy.occurrences[0].headingLevel).toBe(5);
        });
    });

    describe('caption', () => {
        it('renders the caption in a figcaption element', () => {
            const $ = cheerio.load(
                renderComponent(
                    'figure',
                    {
                        ...EXAMPLE_FIGURE_BASIC,
                        caption: 'A caption describing the content',
                    },
                    CALLER_CONTENT,
                ),
            );

            expect($('figcaption.ons-figure__caption').text().trim()).toBe('A caption describing the content');
        });

        it('does not render a figcaption when caption is not provided', () => {
            const $ = cheerio.load(renderComponent('figure', EXAMPLE_FIGURE_BASIC, CALLER_CONTENT));

            expect($('figcaption').length).toBe(0);
        });
    });

    describe('audio description', () => {
        it('renders a visually hidden description with the correct id', () => {
            const $ = cheerio.load(
                renderComponent(
                    'figure',
                    {
                        ...EXAMPLE_FIGURE_BASIC,
                        audioDescription: 'A detailed description of the content',
                    },
                    CALLER_CONTENT,
                ),
            );

            expect($('.ons-u-vh').text()).toBe('A detailed description of the content');
            expect($('.ons-u-vh').attr('id')).toBe('figure-audio-description-example-figure');
        });

        it('sets aria-describedby on the figure element', () => {
            const $ = cheerio.load(
                renderComponent(
                    'figure',
                    {
                        ...EXAMPLE_FIGURE_BASIC,
                        audioDescription: 'A detailed description of the content',
                    },
                    CALLER_CONTENT,
                ),
            );

            expect($('.ons-figure').attr('aria-describedby')).toBe('figure-audio-description-example-figure');
        });

        it('does not render audio description when not provided', () => {
            const $ = cheerio.load(renderComponent('figure', EXAMPLE_FIGURE_BASIC, CALLER_CONTENT));

            expect($('.ons-u-vh').length).toBe(0);
            expect($('.ons-figure').attr('aria-describedby')).toBeUndefined();
        });
    });

    describe('footnotes', () => {
        it('renders footnotes using the details component', () => {
            const faker = templateFaker();
            const detailsSpy = faker.spy('details');

            faker.renderComponent(
                'figure',
                {
                    ...EXAMPLE_FIGURE_BASIC,
                    footnotes: {
                        title: 'Footnotes',
                        content: 'Some footnote content.',
                    },
                },
                CALLER_CONTENT,
            );

            expect(detailsSpy.occurrences[0]).toEqual(
                expect.objectContaining({
                    id: 'figure-footnotes--example-figure',
                    title: 'Footnotes',
                    content: 'Some footnote content.',
                }),
            );
        });

        it('does not render footnotes when not provided', () => {
            const faker = templateFaker();
            const detailsSpy = faker.spy('details');

            faker.renderComponent('figure', EXAMPLE_FIGURE_BASIC, CALLER_CONTENT);

            expect(detailsSpy.occurrences.filter(Boolean).length).toBe(0);
        });
    });

    describe('download', () => {
        it('renders downloads using the details and list components', () => {
            const faker = templateFaker();
            const detailsSpy = faker.spy('details');

            faker.renderComponent(
                'figure',
                {
                    ...EXAMPLE_FIGURE_BASIC,
                    download: {
                        title: 'Download this image',
                        itemsList: [
                            {
                                text: 'Image (JPG, 1.2MB)',
                                url: '/img/example.jpg',
                                download: 'file',
                            },
                        ],
                    },
                },
                CALLER_CONTENT,
            );

            expect(detailsSpy.occurrences[0]).toEqual(
                expect.objectContaining({
                    id: 'figure-downloads--example-figure',
                    title: 'Download this image',
                }),
            );
        });

        it('does not render downloads when not provided', () => {
            const faker = templateFaker();
            const detailsSpy = faker.spy('details');

            faker.renderComponent('figure', EXAMPLE_FIGURE_BASIC, CALLER_CONTENT);

            expect(detailsSpy.occurrences.filter(Boolean).length).toBe(0);
        });

        it('does not render downloads when itemsList is empty', () => {
            const faker = templateFaker();
            const detailsSpy = faker.spy('details');

            faker.renderComponent(
                'figure',
                {
                    ...EXAMPLE_FIGURE_BASIC,
                    download: {
                        title: 'Download this image',
                        itemsList: [],
                    },
                },
                CALLER_CONTENT,
            );

            expect(detailsSpy.occurrences.filter(Boolean).length).toBe(0);
        });
    });
});
