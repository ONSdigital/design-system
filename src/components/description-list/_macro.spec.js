/** @jest-environment jsdom */

import * as cheerio from 'cheerio';
import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import { EXAMPLE_DESCRIPTION_LIST_FULL, EXAMPLE_DESCRIPTION_LIST_MINIMAL } from './_test-examples';

describe('FOR: Macro: Description List', () => {
    describe('GIVEN: Params: required', () => {
        describe('WHEN: all required params are provided', () => {
            const $ = cheerio.load(renderComponent('description-list', EXAMPLE_DESCRIPTION_LIST_MINIMAL));
            test('THEN: jest-axe checks pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
        });
    });

    describe('GIVEN: Params: all', () => {
        describe('WHEN: all params are provided', () => {
            const $ = cheerio.load(renderComponent('description-list', EXAMPLE_DESCRIPTION_LIST_FULL));
            test('THEN: jest-axe checks pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
        });
    });

    describe('GIVEN: Params: id', () => {
        describe('WHEN: id is provided', () => {
            const $ = cheerio.load(
                renderComponent('description-list', {
                    ...EXAMPLE_DESCRIPTION_LIST_MINIMAL,
                    id: 'example-id',
                }),
            );
            test('THEN: renders with provided id', () => {
                expect($('#example-id').length).toBe(1);
            });
        });
    });

    describe('GIVEN: Params: classes', () => {
        describe('WHEN: additional style classes are provided', () => {
            const $ = cheerio.load(
                renderComponent('description-list', {
                    ...EXAMPLE_DESCRIPTION_LIST_MINIMAL,
                    classes: 'extra-class another-extra-class',
                }),
            );
            test('THEN: renders with provided classes', () => {
                expect($('.ons-description-list').hasClass('extra-class')).toBe(true);
                expect($('.ons-description-list').hasClass('another-extra-class')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: descriptionListLabel', () => {
        describe('WHEN: descriptionListLabel is provided', () => {
            const $ = cheerio.load(
                renderComponent('description-list', {
                    ...EXAMPLE_DESCRIPTION_LIST_MINIMAL,
                    descriptionListLabel: 'This is an example of the description list component',
                }),
            );
            test('THEN: renders with title and aria-label attributes', () => {
                expect($('.ons-description-list').attr('title')).toBe('This is an example of the description list component');
                expect($('.ons-description-list').attr('aria-label')).toBe('This is an example of the description list component');
            });
        });
    });

    describe('GIVEN: Params: horizontal', () => {
        describe('WHEN: horizontal is true', () => {
            const $ = cheerio.load(
                renderComponent('description-list', {
                    ...EXAMPLE_DESCRIPTION_LIST_MINIMAL,
                    horizontal: true,
                }),
            );
            test('THEN: renders with the horizontal class', () => {
                expect($('.ons-description-list').hasClass('ons-description-list--horizontal')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: termCol', () => {
        describe('WHEN: termCol is provided', () => {
            test.each([
                [1, 'ons-col-1\\@m'],
                [4, 'ons-col-4\\@m'],
            ])('THEN: applies the correct termCol class (%i -> %s)', (termCol, expectedClass) => {
                const $ = cheerio.load(
                    renderComponent('description-list', {
                        ...EXAMPLE_DESCRIPTION_LIST_MINIMAL,
                        termCol,
                    }),
                );
                expect($(`.ons-description-list__term.${expectedClass}`).length).toBe(2);
            });
        });
    });

    describe('GIVEN: Params: descriptionCol', () => {
        describe('WHEN: descriptionCol is provided', () => {
            test.each([
                [1, 'ons-col-1\\@m'],
                [4, 'ons-col-4\\@m'],
            ])('THEN: applies the correct descriptionCol class (%i -> %s)', (descriptionCol, expectedClass) => {
                const $ = cheerio.load(
                    renderComponent('description-list', {
                        ...EXAMPLE_DESCRIPTION_LIST_MINIMAL,
                        descriptionCol,
                    }),
                );
                expect($(`.ons-description-list__value.${expectedClass}`).length).toBe(3);
            });
        });
    });

    describe('GIVEN: Params: itemsList', () => {
        describe('WHEN: itemsList is provided', () => {
            const $ = cheerio.load(renderComponent('description-list', EXAMPLE_DESCRIPTION_LIST_FULL));
            test('THEN: renders list items correctly', () => {
                const $listElements = $('.ons-description-list__term, .ons-description-list__value');
                expect($listElements[0].tagName).toBe('dt');
                expect($($listElements[0]).text().trim()).toBe('Survey:');

                expect($listElements[1].tagName).toBe('dd');
                expect($($listElements[1]).attr('id')).toBe('description-1');
                expect($($listElements[1]).text().trim()).toBe('Bricks & Blocks');

                expect($listElements[2].tagName).toBe('dt');
                expect($($listElements[2]).text().trim()).toBe('RU Refs:');

                expect($listElements[3].tagName).toBe('dd');
                expect($($listElements[3]).attr('id')).toBe('description-2');
                expect($($listElements[3]).text().trim()).toBe('49900000118');

                expect($listElements[4].tagName).toBe('dd');
                expect($($listElements[4]).attr('id')).toBe('description-3');
                expect($($listElements[4]).text().trim()).toBe('49300005832');
            });
        });
    });
});
