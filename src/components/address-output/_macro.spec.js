/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

import { EXAMPLE_ADDRESS_OUTPUT_FULL, EXAMPLE_ADDRESS_OUTPUT_NONE } from './_test_examples';

describe('FOR: address-output', () => {
    describe('GIVEN: Params: none', () => {
        describe('WHEN: All params are at default state', () => {
            const $ = cheerio.load(renderComponent('address-output', EXAMPLE_ADDRESS_OUTPUT_FULL));

            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
        });
    });

    describe('GIVEN: Params: classes', () => {
        describe('WHEN: classes are provided', () => {
            const $ = cheerio.load(
                renderComponent('address-output', {
                    ...EXAMPLE_ADDRESS_OUTPUT_FULL,
                    classes: 'extra-class another-extra-class',
                }),
            );

            test('THEN: renders additionally provided classes', async () => {
                expect($('.ons-address-output').hasClass('extra-class')).toBe(true);
                expect($('.ons-address-output').hasClass('another-extra-class')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: none', () => {
        describe('WHEN: no address lines are provided in the parameters', () => {
            const $ = cheerio.load(renderComponent('address-output', EXAMPLE_ADDRESS_OUTPUT_NONE));

            test('THEN: renders no lines', () => {
                expect($('.ons-address-output__lines *').length).toBe(0);
            });
        });
    });

    describe.each([
        ['all address lines', EXAMPLE_ADDRESS_OUTPUT_FULL],
        ['single line', { unit: 'Unit 5' }],
    ])('GIVEN: %s', (scenario, params) => {
        describe(`WHEN: the address-output with ${scenario}`, () => {
            const $ = cheerio.load(renderComponent('address-output', params));

            test('THEN: renders `unit` correctly', () => {
                expect($('.ons-address-output__unit').text().trim()).toBe('Unit 5');
            });
        });
    });

    describe.each([
        ['all address lines', EXAMPLE_ADDRESS_OUTPUT_FULL],
        ['single line', { organisation: 'Trescos' }],
    ])('GIVEN: %s', (scenario, params) => {
        describe(`WHEN: the address-output with ${scenario}`, () => {
            const $ = cheerio.load(renderComponent('address-output', params));

            test('THEN: renders `organisation` correctly', () => {
                expect($('.ons-address-output__organisation').text().trim()).toBe('Trescos');
            });
        });
    });

    describe.each([
        ['all address lines', EXAMPLE_ADDRESS_OUTPUT_FULL],
        ['single line', { line1: 'Abingdon Road' }],
    ])('GIVEN: %s', (scenario, params) => {
        describe(`WHEN: the address-output with ${scenario}`, () => {
            const $ = cheerio.load(renderComponent('address-output', params));

            test('THEN: renders `line1` correctly', () => {
                expect($('.ons-address-output__line1').text().trim()).toBe('Abingdon Road');
            });
        });
    });

    describe.each([
        ['all address lines', EXAMPLE_ADDRESS_OUTPUT_FULL],
        ['single line', { line2: 'Goathill' }],
    ])('GIVEN: %s', (scenario, params) => {
        describe(`WHEN: the address-output with ${scenario}`, () => {
            const $ = cheerio.load(renderComponent('address-output', params));

            test('THEN: renders `line2` correctly', () => {
                expect($('.ons-address-output__line2').text().trim()).toBe('Goathill');
            });
        });
    });

    describe.each([
        ['all address lines', EXAMPLE_ADDRESS_OUTPUT_FULL],
        ['single line', { town: 'Barry' }],
    ])('GIVEN: %s', (scenario, params) => {
        describe(`WHEN: the address-output with ${scenario}`, () => {
            const $ = cheerio.load(renderComponent('address-output', params));

            test('THEN: renders the `town` correctly', () => {
                expect($('.ons-address-output__town').text().trim()).toBe('Barry');
            });
        });
    });

    describe.each([
        ['all address lines', EXAMPLE_ADDRESS_OUTPUT_FULL],
        ['single line', { postcode: 'AB12 6UH' }],
    ])('GIVEN: %s', (scenario, params) => {
        describe(`WHEN: the address-output with ${scenario}`, () => {
            const $ = cheerio.load(renderComponent('address-output', params));

            test('THEN: renders the `postcode` correctly', () => {
                expect($('.ons-address-output__postcode').text().trim()).toBe('AB12 6UH');
            });
        });
    });
});
