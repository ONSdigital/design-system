/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

describe('FOR: Macro: Field', () => {
    describe('GIVEN: Params: none', () => {
        describe('WHEN: no params are provided', () => {
            const $ = cheerio.load(renderComponent('field'));
            test('THEN: passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
        });
    });

    describe('GIVEN: Params: id', () => {
        describe('WHEN: id is provided', () => {
            const $ = cheerio.load(
                renderComponent('field', {
                    id: 'example-field',
                }),
            );
            test('THEN: renders with the provided id', () => {
                expect($('.ons-field').attr('id')).toBe('example-field');
            });
        });
    });

    describe('GIVEN: Params: classes', () => {
        describe('WHEN: additional style classes are provided', () => {
            const $ = cheerio.load(
                renderComponent('field', {
                    classes: 'extra-class another-extra-class',
                }),
            );
            test('THEN: renders with provided classes', () => {
                expect($('.ons-field').hasClass('extra-class')).toBe(true);
                expect($('.ons-field').hasClass('another-extra-class')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: inline', () => {
        describe('WHEN: inline is provided', () => {
            const $ = cheerio.load(
                renderComponent('field', {
                    inline: true,
                }),
            );
            test('THEN: renders with the inline class', () => {
                expect($('.ons-field').hasClass('ons-field--inline')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: attributes', () => {
        describe('WHEN: custom attributes are provided', () => {
            const $ = cheerio.load(
                renderComponent('field', {
                    attributes: {
                        a: 123,
                        b: 456,
                    },
                }),
            );
            test('THEN: renders with additionally provided attributes', () => {
                expect($('.ons-field').attr('a')).toBe('123');
                expect($('.ons-field').attr('b')).toBe('456');
            });
        });
    });

    describe('GIVEN: Params: dontWrap', () => {
        describe('WHEN: dontWrap is set to true', () => {
            const $ = cheerio.load(
                renderComponent('field', {
                    dontWrap: true,
                }),
            );
            test('THEN: renders the content without being wrapped in a field div', () => {
                expect($('.ons-field').length).toBe(0);
            });
        });

        describe('WHEN: dontWrap is set to false', () => {
            const $ = cheerio.load(
                renderComponent('field', {
                    dontWrap: false,
                }),
            );
            test('THEN: renders the content wrapped in a field div', () => {
                expect($('.ons-field').length).toBe(1);
            });
        });

        describe('WHEN: dontWrap is not provided', () => {
            const $ = cheerio.load(renderComponent('field', {}));
            test('THEN: renders the content wrapped in a field div', () => {
                expect($('.ons-field').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: error', () => {
        describe('WHEN: error is provided', () => {
            const faker = templateFaker();
            const errorSpy = faker.spy('error');

            faker.renderComponent('field', {
                error: { text: 'There is an error' },
            });
            test('THEN" calls the error component', () => {
                expect(errorSpy.occurrences[0]).toEqual({
                    text: 'There is an error',
                });
            });
        });
    });

    describe('GIVEN: Content', () => {
        describe('WHEN: field is called with content provided', () => {
            const $ = cheerio.load(renderComponent('field', {}, 'Example content...'));
            const content = $('.ons-field').html().trim();
            test('THEN: renders the field with the provided content', () => {
                expect(content).toEqual(expect.stringContaining('Example content...'));
            });
        });
    });
});
