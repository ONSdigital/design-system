/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

import { EXAMPLE_ADDRESS_OUTPUT_FULL, EXAMPLE_ADDRESS_OUTPUT_NONE } from './_test_examples';

describe('FOR: address-output', () => {
    describe('GIVEN: Params: none', () => {
        describe('WHEN: no parameters are provided', () => {
            const $ = cheerio.load(renderComponent('address-output', EXAMPLE_ADDRESS_OUTPUT_NONE));

            test('THEN: renders no lines', () => {
                expect($('.ons-address-output__lines *').length).toBe(0);
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

            test('THEN: renders with additional classes provided', async () => {
                expect($('.ons-address-output').hasClass('extra-class')).toBe(true);
                expect($('.ons-address-output').hasClass('another-extra-class')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: All params', () => {
        describe('WHEN: All address line params are provided', () => {
            const $ = cheerio.load(renderComponent('address-output', EXAMPLE_ADDRESS_OUTPUT_FULL));

            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: renders `unit` line correctly', () => {
                expect($('.ons-address-output__unit').text().trim()).toBe('Unit 5');
            });

            test('THEN: renders `organisation` line correctly', () => {
                expect($('.ons-address-output__organisation').text().trim()).toBe('Trescos');
            });

            test('THEN: renders `line1` line correctly', () => {
                expect($('.ons-address-output__line1').text().trim()).toBe('Abingdon Road');
            });

            test('THEN: renders `line2` line correctly', () => {
                expect($('.ons-address-output__line2').text().trim()).toBe('Goathill');
            });

            test('THEN: renders the `town` line correctly', () => {
                expect($('.ons-address-output__town').text().trim()).toBe('Barry');
            });

            test('THEN: renders the `postcode` line correctly', () => {
                expect($('.ons-address-output__postcode').text().trim()).toBe('AB12 6UH');
            });
        });
    });

    describe('GIVEN: Params: single param', () => {
        describe('WHEN: classes are provided', () => {
            const $ = cheerio.load(
                renderComponent('address-output', {
                    unit: 'Unit 5',
                }),
            );

            test('THEN: renders with additional classes provided', async () => {
                expect($('.ons-address-output').hasClass('extra-class')).toBe(true);
                expect($('.ons-address-output').hasClass('another-extra-class')).toBe(true);
            });
        });
    });

    describe.each([
        ['all parameters provided', EXAMPLE_ADDRESS_OUTPUT_FULL],
        ['single parameter unit provided', { unit: 'Unit 5' }],
    ])('GIVEN: Params: %s', (scenario, params) => {
        describe(`WHEN: the address-output with ${scenario}`, () => {
            const $ = cheerio.load(renderComponent('address-output', params));

            test('THEN: renders `unit` line correctly', () => {
                expect($('.ons-address-output__unit').text().trim()).toBe('Unit 5');
            });
        });
    });

    describe.each([
        ['all parameters provided', EXAMPLE_ADDRESS_OUTPUT_FULL],
        ['single parameter organisation provided', { organisation: 'Trescos' }],
    ])('GIVEN: Params: %s', (scenario, params) => {
        describe(`WHEN: the address-output with ${scenario}`, () => {
            const $ = cheerio.load(renderComponent('address-output', params));

            test('THEN: renders `organisation` line correctly', () => {
                expect($('.ons-address-output__organisation').text().trim()).toBe('Trescos');
            });
        });
    });

    describe.each([
        ['all parameters provided', EXAMPLE_ADDRESS_OUTPUT_FULL],
        ['single parameter line1 provided', { line1: 'Abingdon Road' }],
    ])('GIVEN: Params: %s', (scenario, params) => {
        describe(`WHEN: the address-output with ${scenario}`, () => {
            const $ = cheerio.load(renderComponent('address-output', params));

            test('THEN: renders `line1` line correctly', () => {
                expect($('.ons-address-output__line1').text().trim()).toBe('Abingdon Road');
            });
        });
    });

    describe.each([
        ['all parameters provided', EXAMPLE_ADDRESS_OUTPUT_FULL],
        ['single parameter line2 provided', { line2: 'Goathill' }],
    ])('GIVEN: Params: %s', (scenario, params) => {
        describe(`WHEN: the address-output with ${scenario}`, () => {
            const $ = cheerio.load(renderComponent('address-output', params));

            test('THEN: renders `line2` line correctly', () => {
                expect($('.ons-address-output__line2').text().trim()).toBe('Goathill');
            });
        });
    });

    describe.each([
        ['all parameters provided', EXAMPLE_ADDRESS_OUTPUT_FULL],
        ['single parameter town provided', { town: 'Barry' }],
    ])('GIVEN: Params: %s', (scenario, params) => {
        describe(`WHEN: the address-output with ${scenario}`, () => {
            const $ = cheerio.load(renderComponent('address-output', params));

            test('THEN: renders the `town` line correctly', () => {
                expect($('.ons-address-output__town').text().trim()).toBe('Barry');
            });
        });
    });

    describe.each([
        ['all parameters provided', EXAMPLE_ADDRESS_OUTPUT_FULL],
        ['single parameter postcode provided', { postcode: 'AB12 6UH' }],
    ])('GIVEN: Params: %s', (scenario, params) => {
        describe(`WHEN: the address-output with ${scenario}`, () => {
            const $ = cheerio.load(renderComponent('address-output', params));

            test('THEN: renders the `postcode` line correctly', () => {
                expect($('.ons-address-output__postcode').text().trim()).toBe('AB12 6UH');
            });
        });
    });
});
