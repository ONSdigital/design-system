/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

import { EXAMPLE_CHAR_CHECK_LIMIT } from './_test-examples';

describe('FOR: Macro: CharCheckLimit', () => {
    describe('GIVEN: Params: Required', () => {
        describe('WHEN: required params are provided', () => {
            const $ = cheerio.load(renderComponent('char-check-limit', EXAMPLE_CHAR_CHECK_LIMIT));

            test('passes jest-axe checks', async () => {
                const results = await axe($.html());

                expect(results).toHaveNoViolations();
            });
            test('has the provided id attribute', () => {
                expect($('.ons-input__limit').attr('id')).toBe('example-char-check-limit');
            });
            test('has the data attribute which defines charCountPlural', () => {
                expect($('.ons-input__limit').attr('data-charcount-plural')).toBe('You have {x} characters remaining');
            });
            test('has the data attribute which defines charCountSingular', () => {
                expect($('.ons-input__limit').attr('data-charcount-singular')).toBe('You have {x} character remaining');
            });
        });
    });

    describe('GIVEN: Params: charCountOverLimitSingular', () => {
        describe('WHEN: chatCountOverLimitSingular is provided', () => {
            test('has the data attribute which defines charCountOverLimitSingular', () => {
                const $ = cheerio.load(renderComponent('char-check-limit', EXAMPLE_CHAR_CHECK_LIMIT));

                expect($('.ons-input__limit').attr('data-charcount-limit-singular')).toBe('{x} character too many');
            });
        });
    });

    describe('GIVEN: Params: charCountOverLimitPlural', () => {
        describe('WHEN: chatCountOverLimitPlural is provided', () => {
            test('has the data attribute which defines charCountOverLimitPlural', () => {
                const $ = cheerio.load(renderComponent('char-check-limit', EXAMPLE_CHAR_CHECK_LIMIT));

                expect($('.ons-input__limit').attr('data-charcount-limit-plural')).toBe('{x} characters too many');
            });
        });
    });

    describe('GIVEN: Params: variant', () => {
        describe('WHEN: variant is provided', () => {
            const $ = cheerio.load(
                renderComponent(
                    'char-check-limit',
                    {
                        ...EXAMPLE_CHAR_CHECK_LIMIT,
                        variant: 'check',
                    },
                    ['<p>Test content.</p>'],
                ),
            );

            test('passes jest-axe checks with variant set to check', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: renders the passed content', () => {
                expect($('.ons-js-char-check-input').text()).toBe('Test content.');
            });
        });
    });
});
