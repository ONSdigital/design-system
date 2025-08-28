/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import { EXAMPLE_FULL_ANNOUNCEMENT_BANNER, EXAMPLE_REQUIRED_ANNOUNCEMENT_BANNER } from './_test_examples';

describe('FOR: Macro: Announcement-banner', () => {
    describe('GIVEN: Params: required', () => {
        describe('WHEN: all required params are provided', () => {
            const $ = cheerio.load(renderComponent('announcement-banner', EXAMPLE_REQUIRED_ANNOUNCEMENT_BANNER));
            test('THEN: jest-axe checks pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: the title has the provided text', async () => {
                const title = $('.ons-announcement-banner__title');
                expect(title.text().trim()).toBe('This is a black banner');
            });

            test('THEN: the description has the provided text', async () => {
                const description = $('.ons-announcement-banner__description');
                expect(description.text().trim()).toBe('This is a description for the black banner');
            });

            test('THEN: the link points to the provided URL', async () => {
                const linkUrl = $('.ons-announcement-banner__link');
                expect(linkUrl.attr('href')).toBe('http://example.com');
            });

            test('THEN: the link has the provided link text', async () => {
                const linkText = $('.ons-announcement-banner__link');
                expect(linkText.text().trim()).toBe('Find out more');
            });

            test('THEN: it defaults to the black variant', async () => {
                const banner = $('.ons-announcement-banner');
                expect(banner.hasClass('ons-announcement-banner--black')).toBe(true);
            });

            test('THEN: containers are created', () => {
                expect($('.ons-announcement-banner--black > .ons-container').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: link attributes', () => {
        const $ = cheerio.load(renderComponent('announcement-banner', EXAMPLE_FULL_ANNOUNCEMENT_BANNER));
        describe('WHEN: link attributes are provided', () => {
            test('THEN: the link has the provided attributes', async () => {
                const link = $('.ons-announcement-banner__link');
                expect(link.attr('abc')).toBe('123');
                expect(link.attr('def')).toBe('456');
            });
        });
    });

    describe('GIVEN: Params: variants', () => {
        describe('WHEN: variants is provided as a string', () => {
            const $ = cheerio.load(renderComponent('announcement-banner', EXAMPLE_FULL_ANNOUNCEMENT_BANNER));
            test('THEN: the banner has the correct variant class', async () => {
                const banner = $('.ons-announcement-banner');
                expect(banner.hasClass('ons-announcement-banner--red')).toBe(true);
            });
        });
        describe('WHEN: wide is provided as one of the variants', () => {
            const $ = cheerio.load(
                renderComponent('announcement-banner', { ...EXAMPLE_REQUIRED_ANNOUNCEMENT_BANNER, variants: ['wide', 'red'] }),
            );
            test('THEN: containers are not created with the correct classes', () => {
                expect($('.ons-announcement-banner--red > .ons-container').length).toBe(0);
            });
        });
        describe('WHEN: red is provided alongside other variants', () => {
            const $ = cheerio.load(
                renderComponent('announcement-banner', { ...EXAMPLE_REQUIRED_ANNOUNCEMENT_BANNER, variants: ['wide', 'red'] }),
            );
            test('THEN: the banner has the correct variant class', async () => {
                const banner = $('.ons-announcement-banner');
                expect(banner.hasClass('ons-announcement-banner--red')).toBe(true);
            });
        });
        describe('WHEN: wide is provided as the only variant as a string', () => {
            const $ = cheerio.load(renderComponent('announcement-banner', { ...EXAMPLE_REQUIRED_ANNOUNCEMENT_BANNER, variants: 'wide' }));
            test('THEN: it defaults to the black variant', async () => {
                const banner = $('.ons-announcement-banner');
                expect(banner.hasClass('ons-announcement-banner--black')).toBe(true);
            });
            test('THEN: containers are not created with the correct classes', () => {
                expect($('.ons-announcement-banner--black > .ons-container').length).toBe(0);
            });
        });
        describe('WHEN: wide is provided as the only variant in an array', () => {
            const $ = cheerio.load(renderComponent('announcement-banner', { ...EXAMPLE_REQUIRED_ANNOUNCEMENT_BANNER, variants: ['wide'] }));
            test('THEN: it defaults to the black variant', async () => {
                const banner = $('.ons-announcement-banner');
                expect(banner.hasClass('ons-announcement-banner--black')).toBe(true);
            });
            test('THEN: containers are not created with the correct classes', () => {
                expect($('.ons-announcement-banner--black > .ons-container').length).toBe(0);
            });
        });
    });
});
