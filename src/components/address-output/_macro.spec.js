/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

import { EXAMPLE_ADDRESS_OUTPUT_FULL } from './_test_examples';

describe('FOR: Macro: Address-output', () => {
    describe('GIVEN: Params: none', () => {
        describe('WHEN: no parameters are provided', () => {
            const $ = cheerio.load(renderComponent('address-output', {}));

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
        describe('WHEN: all address line params are provided', () => {
            const $ = cheerio.load(renderComponent('address-output', EXAMPLE_ADDRESS_OUTPUT_FULL));

            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: renders unit with provided text', () => {
                expect($('.ons-address-output__unit').text().trim()).toBe('Unit 5');
            });

            test('THEN: renders organisation line with correct text', () => {
                expect($('.ons-address-output__organisation').text().trim()).toBe('Trescos');
            });

            test('THEN: renders line1 line with correct text', () => {
                expect($('.ons-address-output__line1').text().trim()).toBe('Abingdon Road');
            });

            test('THEN: renders line2 line with correct text', () => {
                expect($('.ons-address-output__line2').text().trim()).toBe('Goathill');
            });

            test('THEN: renders the town line with correct text', () => {
                expect($('.ons-address-output__town').text().trim()).toBe('Barry');
            });

            test('THEN: renders the postcode line with correct text', () => {
                expect($('.ons-address-output__postcode').text().trim()).toBe('AB12 6UH');
            });
        });
    });

    describe('GIVEN: Params: single param', () => {
        describe('WHEN: the unit address line is the only parameter provided', () => {
            const $ = cheerio.load(
                renderComponent('address-output', {
                    unit: 'Unit 5',
                }),
            );

            test('THEN: renders unit line with correct text', () => {
                expect($('.ons-address-output__unit').text().trim()).toBe('Unit 5');
            });
        });

        describe('WHEN: the organisation address line is the only parameter provided', () => {
            const $ = cheerio.load(
                renderComponent('address-output', {
                    organisation: 'Trescos',
                }),
            );

            test('THEN: renders organisation line with correct text', () => {
                expect($('.ons-address-output__organisation').text().trim()).toBe('Trescos');
            });
        });

        describe('WHEN: the line1 address line is the only parameter provided', () => {
            const $ = cheerio.load(
                renderComponent('address-output', {
                    line1: 'Abingdon Road',
                }),
            );

            test('THEN: renders line1 line with correct text', () => {
                expect($('.ons-address-output__line1').text().trim()).toBe('Abingdon Road');
            });
        });

        describe('WHEN: the line2 address line is the only parameter provided', () => {
            const $ = cheerio.load(
                renderComponent('address-output', {
                    line2: 'Goathill',
                }),
            );

            test('THEN: renders line2 line with correct text', () => {
                expect($('.ons-address-output__line2').text().trim()).toBe('Goathill');
            });
        });

        describe('WHEN: the town address line is the only parameter provided', () => {
            const $ = cheerio.load(
                renderComponent('address-output', {
                    town: 'Barry',
                }),
            );

            test('THEN: renders town line with correct text', () => {
                expect($('.ons-address-output__town').text().trim()).toBe('Barry');
            });
        });

        describe('WHEN: the postcode address line is the only parameter provided', () => {
            const $ = cheerio.load(
                renderComponent('address-output', {
                    postcode: 'AB12 6UH',
                }),
            );

            test('THEN: renders postcode line with correct text', () => {
                expect($('.ons-address-output__postcode').text().trim()).toBe('AB12 6UH');
            });
        });
    });
});
