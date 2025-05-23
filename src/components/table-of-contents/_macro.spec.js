/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { mapAll } from '../../tests/helpers/cheerio';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_TABLE_OF_CONTENTS_SKIP_LINK = {
    title: 'Contents',
    skipLink: {
        url: '#the-content',
        text: 'Skip to guide content',
    },
    itemsList: [],
};

const EXAMPLE_TABLE_OF_CONTENTS_SINGLE = {
    title: 'Contents',
    itemsList: [
        {
            url: '#overview',
            text: 'Overview',
        },
        {
            url: '#who-should-take-part-and-why',
            text: 'Who should take part and why',
        },
    ],
};

const EXAMPLE_TABLE_OF_CONTENTS_MULTIPLE = {
    title: 'Contents',
    lists: [
        {
            listHeading: 'Household questions',
            listHeadingHidden: 'help topics',
            itemsList: [
                {
                    url: '#household1',
                    text: 'Household and who lives here',
                },
            ],
        },
        {
            listHeading: 'Individual questions',
            listHeadingHidden: 'help topics',
            itemsList: [
                {
                    url: '#individual1',
                    text: 'Name, date of birth and marital status',
                },
            ],
        },
    ],
};

const EXAMPLE_TABLE_OF_CONTENTS_RELATED_LINKS_BUTTON = {
    title: 'Contents',
    itemsList: [
        {
            url: '#overview',
            text: 'Overview',
        },
        {
            url: '#who-should-take-part-and-why',
            text: 'Who should take part and why',
        },
    ],
    relatedLinks: {
        title: 'Related publications',
        ariaLabel: 'Related publications',
        itemsList: [
            {
                url: '#0',
                text: 'Example publication title',
            },
        ],
    },
    button: {
        text: 'Save or print this page',
        variants: ['print'],
    },
};

describe('macro: table-of-contents', () => {
    it('renders a default aria label', () => {
        const $ = cheerio.load(renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_SINGLE));

        expect($('.ons-table-of-contents').attr('aria-label')).toBe('Table of contents');
    });

    it('renders the provided `ariaLabel`', () => {
        const $ = cheerio.load(
            renderComponent('table-of-contents', {
                ...EXAMPLE_TABLE_OF_CONTENTS_SINGLE,
                ariaLabel: 'Contents',
            }),
        );

        expect($('.ons-table-of-contents').attr('aria-label')).toBe('Contents');
    });

    it('renders title as heading element', () => {
        const $ = cheerio.load(renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_SINGLE));

        expect($('.ons-table-of-contents__title').text().trim()).toBe('Contents');
    });

    describe('skip to content when `skipLink` is provided', () => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_SKIP_LINK));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('outputs `skip-to-content` component', () => {
            const faker = templateFaker();
            const skipToContentSpy = faker.spy('skip-to-content');

            faker.renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_SKIP_LINK);

            expect(skipToContentSpy.occurrences[0]).toEqual({
                url: '#the-content',
                text: 'Skip to guide content',
            });
        });
    });

    describe('single list', () => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_SINGLE));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('outputs `lists` component', () => {
            const faker = templateFaker();
            const listsSpy = faker.spy('list');

            faker.renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_SINGLE);

            expect(listsSpy.occurrences[0]).toEqual({
                element: 'ol',
                classes: 'ons-u-mb-l',
                variants: 'dashed',
                itemsList: EXAMPLE_TABLE_OF_CONTENTS_SINGLE.itemsList,
            });
        });
    });

    describe('multiple lists', () => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_MULTIPLE));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('renders a heading for each list', () => {
            const $ = cheerio.load(renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_MULTIPLE));

            $('.ons-u-vh').remove();

            const headings = mapAll($('h3'), (node) => $(node).text().trim());
            expect(headings).toEqual(['Household questions:', 'Individual questions:']);
        });

        it('renders visually hidden heading for each list', () => {
            const $ = cheerio.load(renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_MULTIPLE));

            const headings = mapAll($('h3 .ons-u-vh'), (node) => node.text().trim());
            expect(headings).toEqual(['help topics', 'help topics']);
        });

        it('outputs `lists` component for each list', () => {
            const faker = templateFaker();
            const listsSpy = faker.spy('list');

            faker.renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_MULTIPLE);

            expect(listsSpy.occurrences[0]).toEqual({
                element: 'ol',
                classes: 'ons-u-mb-l',
                variants: 'dashed',
                itemsList: EXAMPLE_TABLE_OF_CONTENTS_MULTIPLE.lists[0].itemsList,
            });
            expect(listsSpy.occurrences[1]).toEqual({
                element: 'ol',
                classes: 'ons-u-mb-l',
                variants: 'dashed',
                itemsList: EXAMPLE_TABLE_OF_CONTENTS_MULTIPLE.lists[1].itemsList,
            });
        });
    });

    describe('related links and button', () => {
        it('passes jest-axe checks with related links and button', async () => {
            const $ = cheerio.load(renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_RELATED_LINKS_BUTTON));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('renders related links section with correct title', () => {
            const $ = cheerio.load(renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_RELATED_LINKS_BUTTON));

            expect($('.ons-table-of-contents__related-links h2').text().trim()).toBe('Related publications');
        });

        it('renders related links section with correct aria-label', () => {
            const $ = cheerio.load(renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_RELATED_LINKS_BUTTON));

            expect($('.ons-table-of-contents__related-links').attr('aria-label')).toBe('Related publications');
        });

        it('outputs `lists` component for related links with expected parameters', () => {
            const faker = templateFaker();
            const listsSpy = faker.spy('list');

            faker.renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_RELATED_LINKS_BUTTON);

            expect(listsSpy.occurrences[1]).toEqual({
                variants: 'bare',
                itemsList: EXAMPLE_TABLE_OF_CONTENTS_RELATED_LINKS_BUTTON.relatedLinks.itemsList,
            });
        });

        it('renders button with correct text', () => {
            const $ = cheerio.load(renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_RELATED_LINKS_BUTTON));

            expect($('.ons-table-of-contents__button .ons-btn').text().trim()).toBe('Save or print this page');
        });

        it('outputs `button` component with expected parameters', () => {
            const faker = templateFaker();
            const buttonSpy = faker.spy('button');

            faker.renderComponent('table-of-contents', EXAMPLE_TABLE_OF_CONTENTS_RELATED_LINKS_BUTTON);

            expect(buttonSpy.occurrences[0]).toEqual({
                text: 'Save or print this page',
                variants: ['small', 'secondary', 'print'],
            });
        });
    });
});
