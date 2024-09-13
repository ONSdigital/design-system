/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import { EXAMPLE_CALL_TO_ACTION } from './_test-examples';

describe('FOR: call-to-action', () => {
    describe('GIVEN: Params: default', () => {
        describe('WHEN: params are at default state', () => {
            const $ = cheerio.load(renderComponent('call-to-action', EXAMPLE_CALL_TO_ACTION));

            test('THEN: it passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it has the provided headingText', () => {
                const headingText = $('.ons-call-to-action__heading').text().trim();
                expect(headingText).toBe('Call to action heading.');
            });

            test('THEN: it has the provided paragraphText', () => {
                const paragraphText = $('.ons-call-to-action__text').text().trim();
                expect(paragraphText).toBe('Descriptive text about call to action');
            });

            test('THEN: it outputs the expected call-to-action button', () => {
                const buttonText = $('.ons-btn__text').text().trim();
                const buttonLink = $('.ons-btn--link').attr('href');

                expect(buttonText).toBe('Start');
                expect(buttonLink).toBe('https://example.com/start');
            });
        });
    });
});
