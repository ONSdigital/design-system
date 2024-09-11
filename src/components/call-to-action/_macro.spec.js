/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';
import { EXAMPLE_CALL_TO_ACTION } from './_test-examples';

describe('FOR: call-to-action', () => {
    describe('GIVEN: Params: default', () => {
        describe('WHEN: params are at default', () => {
            const $ = cheerio.load(renderComponent('call-to-action', EXAMPLE_CALL_TO_ACTION));

            test('THEN: it passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it has the provided `headingText`', () => {
                const headingText = $('.ons-call-to-action__heading').text().trim();
                expect(headingText).toBe('Call to action heading.');
            });

            test('THEN: it has the provided `paragraphText`', () => {
                const paragraphText = $('.ons-call-to-action__text').text().trim();
                expect(paragraphText).toBe('Descriptive text about call to action');
            });

            test('THEN: it outputs the expected call-to-action button', () => {
                const faker = templateFaker();
                const buttonSpy = faker.spy('button');

                faker.renderComponent('call-to-action', EXAMPLE_CALL_TO_ACTION);

                expect(buttonSpy.occurrences[0]).toHaveProperty('text', 'Start');
                expect(buttonSpy.occurrences[0]).toHaveProperty('url', 'https://example.com/start');
            });
        });
    });
});
