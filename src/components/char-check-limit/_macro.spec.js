/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

import { EXAMPLE_CHAR_CHECK_LIMIT, EXAMPLE_WORD_LIMIT } from './_test-examples';

describe('FOR: Macro: CharCheckLimit', () => {
    describe('GIVEN: Params: Required', () => {
        describe('WHEN: required params are provided', () => {
            const $ = cheerio.load(renderComponent('char-check-limit', EXAMPLE_CHAR_CHECK_LIMIT));

            test('THEN: passes jest-axe checks', async () => {
                const results = await axe($.html());

                expect(results).toHaveNoViolations();
            });

            test('THEN: sets char as the count type to count number of characters', () => {
                expect($('.ons-input__limit').attr('data-count-type')).toBe('char');
            });

            test('THEN: has the provided id attribute', () => {
                expect($('.ons-input__limit').attr('id')).toBe('example-char-check-limit');
            });

            test('THEN: has the data attribute which defines charCountPlural', () => {
                expect($('.ons-input__limit').attr('data-message-plural')).toBe('You have {x} characters remaining');
            });

            test('THEN: has the data attribute which defines charCountSingular', () => {
                expect($('.ons-input__limit').attr('data-message-singular')).toBe('You have {x} character remaining');
            });
            test('THEN: has the data attribute which defines charCountOverLimitSingular', () => {
                expect($('.ons-input__limit').attr('data-message-over-limit-singular')).toBe('{x} character too many');
            });

            test('THEN: has the data attribute which defines charCountOverLimitPlural', () => {
                expect($('.ons-input__limit').attr('data-message-over-limit-plural')).toBe('{x} characters too many');
            });
        });
    });

    describe('GIVEN: Params: variant', () => {
        describe('WHEN: variant is set to word', () => {
            const $ = cheerio.load(renderComponent('char-check-limit', EXAMPLE_WORD_LIMIT));

            test('THEN: passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: sets word as the count type to count number of words', () => {
                expect($('.ons-input__limit').attr('data-count-type')).toBe('word');
            });

            test('THEN: has the data attribute which defines wordCountPlural', () => {
                const $ = cheerio.load(renderComponent('char-check-limit', EXAMPLE_WORD_LIMIT));
                expect($('.ons-input__limit').attr('data-message-plural')).toBe('You have {x} words remaining');
            });

            test('THEN: has the data attribute which defines wordCountSingular', () => {
                const $ = cheerio.load(renderComponent('char-check-limit', EXAMPLE_WORD_LIMIT));
                expect($('.ons-input__limit').attr('data-message-singular')).toBe('You have {x} word remaining');
            });

            test('THEN: has the data attribute which defines wordCountOverLimitPlural', () => {
                const $ = cheerio.load(renderComponent('char-check-limit', EXAMPLE_WORD_LIMIT));
                expect($('.ons-input__limit').attr('data-message-over-limit-plural')).toBe('You have {x} words too many');
            });

            test('THEN: has the data attribute which defines wordCountOverLimitSingular', () => {
                const $ = cheerio.load(renderComponent('char-check-limit', EXAMPLE_WORD_LIMIT));
                expect($('.ons-input__limit').attr('data-message-over-limit-singular')).toBe('You have {x} word too many');
            });
        });
    });
});
