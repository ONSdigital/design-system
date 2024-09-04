/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { mapAll } from '../../tests/helpers/cheerio';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';
import { EXAMPLE_BREADCRUMBS_REQUIRED_PARAMS, EXAMPLE_BREADCRUMBS_ITEM_PARAMS, EXAMPLE_BREADCRUMBS_ALL_PARAMS } from './_test_examples';

describe('FOR: Breadcrumbs', () => {
    describe('GIVEN: Params: required', () => {
        describe('WHEN: required params are provided', () => {
            const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS_ALL_PARAMS));
            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
            const faker = templateFaker();
            const iconsSpy = faker.spy('icon');
            faker.renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS_REQUIRED_PARAMS);
            test('THEN: renders chevron icon next to item', () => {
                const iconTypes = iconsSpy.occurrences.map((occurrence) => occurrence.iconType);
                expect(iconTypes).toEqual(['chevron']);
            });
        });
    });
    describe('GIVEN: Params: all', () => {
        describe('WHEN: all Params are provided', () => {
            const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS_ALL_PARAMS));
            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
            const faker = templateFaker();
            const iconsSpy = faker.spy('icon');
            faker.renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS_ALL_PARAMS);
            test('THEN: renders chevron icon next to each item', () => {
                const iconTypes = iconsSpy.occurrences.map((occurrence) => occurrence.iconType);
                expect(iconTypes).toEqual(['chevron', 'chevron']);
            });
        });
    });
    describe('GIVEN: Params: classes', () => {
        describe('WHEN: additional classes are provided', () => {
            const $ = cheerio.load(
                renderComponent('breadcrumbs', {
                    ...EXAMPLE_BREADCRUMBS_REQUIRED_PARAMS,
                    classes: 'extra-class another-extra-class',
                }),
            );
            test('THEN: renders with correct additional classes', () => {
                expect($('.ons-breadcrumbs').hasClass('extra-class')).toBe(true);
                expect($('.ons-breadcrumbs').hasClass('another-extra-class')).toBe(true);
            });
        });
    });
    describe('GIVEN: Params: ariaLabel', () => {
        describe('WHEN: ariaLabel is not provided', () => {
            const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS_REQUIRED_PARAMS));
            test('THEN: renders with default aria-label of "Breadcrumbs"', () => {
                expect($('.ons-breadcrumbs').attr('aria-label')).toBe('Breadcrumbs');
            });
        });
        describe('WHEN: ariaLabel is provided', () => {
            const $ = cheerio.load(
                renderComponent('breadcrumbs', {
                    ...EXAMPLE_BREADCRUMBS_REQUIRED_PARAMS,
                    ariaLabel: 'Breadcrumbs label',
                }),
            );
            test('THEN: renders with provided aria-label', () => {
                expect($('.ons-breadcrumbs').attr('aria-label')).toBe('Breadcrumbs label');
            });
        });
    });
    describe('GIVEN: Params: id', () => {
        describe('WHEN: id is provided', () => {
            const $ = cheerio.load(
                renderComponent('breadcrumbs', {
                    ...EXAMPLE_BREADCRUMBS_REQUIRED_PARAMS,
                    id: 'example-breadcrumbs',
                }),
            );
            test('THEN: renders with provided id', () => {
                expect($('.ons-breadcrumbs').attr('id')).toBe('example-breadcrumbs');
            });
        });
    });
    describe('GIVEN: Params: itemsList', () => {
        describe('WHEN: itemClasses param is provided', () => {
            const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS_ITEM_PARAMS));
            test('THEN: renders item with provided style classes', () => {
                expect($('.ons-breadcrumbs__item:first').hasClass('item-extra-class')).toBe(true);
                expect($('.ons-breadcrumbs__item:first').hasClass('item-another-extra-class')).toBe(true);
            });
        });
        describe('WHEN: linkClasses param is provided', () => {
            const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS_ITEM_PARAMS));
            test('THEN: renders link with provided style classes', () => {
                expect($('.ons-breadcrumbs__link').hasClass('link-extra-class')).toBe(true);
                expect($('.ons-breadcrumbs__link').hasClass('link-another-extra-class')).toBe(true);
            });
        });
        describe('WHEN: id param is provided', () => {
            const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS_ITEM_PARAMS));
            test('THEN: renders item with provided id', () => {
                expect($('.ons-breadcrumbs__link').attr('id')).toBe('first-breadcrumb');
            });
        });
        describe('WHEN: url param is provided', () => {
            const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS_ITEM_PARAMS));
            test('THEN: renders item with provided url link', () => {
                const url = mapAll($('.ons-breadcrumbs__link'), (node) => node.attr('href'));
                expect(url).toEqual(['https://example.com/']);
            });
        });
        describe('WHEN: text param is provided', () => {
            const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS_ITEM_PARAMS));
            test('THEN: renders item link with provided text', () => {
                const label = mapAll($('.ons-breadcrumbs__link'), (node) => node.text().trim());
                expect(label).toEqual(['Home']);
            });
        });
        describe('WHEN: attributes param is provided', () => {
            const $ = cheerio.load(renderComponent('breadcrumbs', EXAMPLE_BREADCRUMBS_ITEM_PARAMS));
            test('THEN: renders item with provided attributes', () => {
                const testValuesA = mapAll($('.ons-breadcrumbs__link'), (node) => node.attr('data-a'));
                expect(testValuesA).toEqual(['123']);
                const testValuesB = mapAll($('.ons-breadcrumbs__link'), (node) => node.attr('data-b'));
                expect(testValuesB).toEqual(['456']);
            });
        });
    });
});
