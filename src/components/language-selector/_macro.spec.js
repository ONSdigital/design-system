/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_WITH_TWO_LANGUAGES = {
    languages: [
        {
            url: '/english',
            isoCode: 'en',
            text: 'English',
            abbrText: 'EN',
            current: true,
        },
        {
            url: '/cymraeg',
            isoCode: 'cy',
            text: 'Cymraeg',
            abbrText: 'CY',
            current: false,
            attributes: {
                a: 123,
                b: 456,
            },
        },
    ],
};

const EXAMPLE_WITH_THREE_LANGUAGES = {
    languages: [
        {
            url: '/english',
            isoCode: 'en',
            text: 'English',
            current: false,
        },
        {
            url: '/cymraeg',
            isoCode: 'cy',
            text: 'Cymraeg',
            current: true,
        },
        {
            url: '/polski',
            isoCode: 'pl',
            text: 'Polski',
            current: false,
        },
    ],
};

describe('macro: language-selector', () => {
    describe('mode: with two languages', () => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('has one language selector displayed', () => {
            const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

            const $items = $('.ons-language-links__item');
            expect($items.length).toBe(1);
        });

        it('does not show the current language', () => {
            const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

            expect($('.ons-language-links__item a span:last-child').text()).toBe('Cymraeg');
        });

        it('has the expected hyperlink URL', async () => {
            const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

            const $hyperlink = $('.ons-language-links__item a');
            expect($hyperlink.attr('href')).toBe('/cymraeg');
        });

        it('has the expected lang attribute value', async () => {
            const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

            expect($('.ons-language-links__item a').attr('lang')).toBe('cy');
        });

        it('has additionally provided `attributes`', () => {
            const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

            expect($('.ons-language-links__item a').attr('a')).toBe('123');
            expect($('.ons-language-links__item a').attr('b')).toBe('456');
        });

        it('does not have a visibility class applied', () => {
            const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

            expect($('.ons-language-links').hasClass('ons-u-d-no@2xs@m')).toBe(false);
        });

        it('has the `abbrText` rendered', () => {
            const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_TWO_LANGUAGES));

            expect($('.ons-language-links__item a span:nth-child(2)').text()).toBe('CY');
        });
    });

    describe('mode: with three languages', () => {
        it('passes jest-axe checks', async () => {
            const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_THREE_LANGUAGES));

            const results = await axe($.html());
            expect(results).toHaveNoViolations();
        });

        it('has two language selectors displayed', () => {
            const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_THREE_LANGUAGES));

            const $items = $('.ons-language-links__item');
            expect($items.length).toBe(2);
        });

        it('does not show the current language', () => {
            const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_THREE_LANGUAGES));

            // .replace(/\s+/g, ' ') will replace any sequence of whitespace characters (spaces, tabs, newlines) with a single space
            expect($('.ons-language-links__item:first-child a').text().replace(/\s+/g, ' ').trim()).toBe('Change language to English');
            expect($('.ons-language-links__item:last-child a').text().replace(/\s+/g, ' ').trim()).toBe('Change language to Polski');
        });

        it('has the visibility class applied', () => {
            const $ = cheerio.load(renderComponent('language-selector', EXAMPLE_WITH_THREE_LANGUAGES));

            expect($('.ons-language-links').hasClass('ons-u-d-no@2xs@m')).toBe(true);
        });
    });

    describe('srText parameter', () => {
        it('renders custom srText when provided', () => {
            const params = {
                languages: [
                    {
                        url: '/welsh',
                        isoCode: 'cy',
                        text: 'Cymraeg',
                        srText: 'Custom screen reader text',
                        current: false,
                    },
                    {
                        url: '/english',
                        isoCode: 'en',
                        text: 'English',
                        current: true,
                    },
                ],
            };
            const $ = cheerio.load(renderComponent('language-selector', params));
            expect($('.ons-language-links__item a .ons-u-vh').text().trim()).toBe('Custom screen reader text');
        });

        it('renders default srText when not provided', () => {
            const params = {
                languages: [
                    {
                        url: '/welsh',
                        isoCode: 'cy',
                        text: 'Cymraeg',
                        current: false,
                    },
                    {
                        url: '/english',
                        isoCode: 'en',
                        text: 'English',
                        current: true,
                    },
                ],
            };
            const $ = cheerio.load(renderComponent('language-selector', params));
            expect($('.ons-language-links__item a .ons-u-vh').text().trim()).toBe('Change language to');
        });
    });
});
