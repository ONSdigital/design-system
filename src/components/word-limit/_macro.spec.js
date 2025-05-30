/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

import { EXAMPLE_WORD_LIMIT } from './_test-examples';

describe('FOR: Macro: WordLimit', () => {
    describe('GIVEN: Params: Required', () => {
        describe('WHEN: required params are provided', () => {
            const $ = cheerio.load(renderComponent('word-limit', EXAMPLE_WORD_LIMIT));

            test('THEN: passes jest-axe checks', async () => {
                const results = await axe($.html());

                expect(results).toHaveNoViolations();
            });
            test('THEN: has the provided id attribute', () => {
                expect($('.ons-input__limit').attr('id')).toBe('example-word-limit');
            });
            test('THEN: has the data attribute which defines wordCountPlural', () => {
                expect($('.ons-input__limit').attr('data-wordcount-plural')).toBe('You have {x} words remaining');
            });
            test('THEN: has the data attribute which defines wordCountSingular', () => {
                expect($('.ons-input__limit').attr('data-wordcount-singular')).toBe('You have {x} word remaining');
            });
            test('THEN: has the defualt text for data attribute which defines wordCountOverLimitSingular', () => {
                const $ = cheerio.load(renderComponent('word-limit', EXAMPLE_WORD_LIMIT));
                expect($('.ons-input__limit').attr('data-wordcount-limit-singular')).toBe('You have exceeded the word limit by {x} word');
            });
            test('THEN: has the defualt text for data attribute which defines wordCountOverLimitPlural', () => {
                const $ = cheerio.load(renderComponent('word-limit', EXAMPLE_WORD_LIMIT));
                expect($('.ons-input__limit').attr('data-wordcount-limit-plural')).toBe('You have exceeded the word limit by {x} words');
            });
        });
    });
    describe('GIVEN: Params: wordCountOverLimitSingular', () => {
        describe('WHEN: wordCountOverLimitSingular is provided', () => {
            test('THEN: has the provided data attribute which defines wordCountOverLimitSingular', () => {
                const $ = cheerio.load(
                    renderComponent('word-limit', {
                        ...EXAMPLE_WORD_LIMIT,
                        wordCountOverLimitSingular: '{x} word too many',
                    }),
                );

                expect($('.ons-input__limit').attr('data-wordcount-limit-singular')).toBe('{x} word too many');
            });
        });
    });

    describe('GIVEN: Params: wordCountOverLimitSingular', () => {
        describe('WHEN: wordCountOverLimitSingular is provided', () => {
            test('THEN: has the provided data attribute which defines wordCountOverLimitSingular', () => {
                const $ = cheerio.load(
                    renderComponent('word-limit', {
                        ...EXAMPLE_WORD_LIMIT,
                        wordCountOverLimitPlural: '{x} words too many',
                    }),
                );

                expect($('.ons-input__limit').attr('data-wordcount-limit-plural')).toBe('{x} words too many');
            });
        });
    });
});
