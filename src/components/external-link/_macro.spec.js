/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';
import { EXAMPLE_EXTERNAL_LINK } from './_test_examples';

describe('FOR: Macro: External-link', () => {
    describe('GIVEN: Params: required', () => {
        describe('WHEN: all required params are provided', () => {
            const $ = cheerio.load(renderComponent('external-link', EXAMPLE_EXTERNAL_LINK));
            test('THEN: jest-axe checks pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: the link points to the expected URL', async () => {
                const $hyperlink = $('a.ons-external-link');
                expect($hyperlink.attr('href')).toBe('http://example.com');
            });

            test('THEN: the link has the expected link text', async () => {
                const $hyperlink = $('a.ons-external-link .ons-external-link__text');
                expect($hyperlink.text().trim()).toBe('Example link');
            });

            test('THEN: the link has a default new window description', async () => {
                expect($('.ons-external-link__new-window-description').text()).toBe('(opens in a new tab)');
            });

            test('THEN: the link has the external-link icon', async () => {
                const faker = templateFaker();
                const iconsSpy = faker.spy('icon');
                faker.renderComponent('external-link', {
                    ...EXAMPLE_EXTERNAL_LINK,
                });
                expect(iconsSpy.occurrences[0].iconType).toBe('external-link');
            });
        });
    });

    describe('GIVEN: Params: classes', () => {
        describe('WHEN: additional style classes are provided with the classes param', () => {
            const $ = cheerio.load(
                renderComponent('external-link', {
                    ...EXAMPLE_EXTERNAL_LINK,
                    classes: 'extra-class another-extra-class',
                }),
            );
            test('THEN: renders with provided classes', () => {
                expect($('.ons-external-link').hasClass('extra-class')).toBe(true);
                expect($('.ons-external-link').hasClass('another-extra-class')).toBe(true);
            });
        });
    });

    describe('GIVEN: Params: newWindowDescription', () => {
        describe('WHEN: newWindowDescription param is provided', () => {
            const $ = cheerio.load(
                renderComponent('external-link', {
                    ...EXAMPLE_EXTERNAL_LINK,
                    newWindowDescription: 'custom opens in a new tab text',
                }),
            );
            test('THEN: has the expected new window description', () => {
                expect($('.ons-external-link__new-window-description').text()).toBe('(custom opens in a new tab text)');
            });

            test('THEN: the target attribute is set to _blank so that the link opens in a new window', () => {
                expect($('a').attr('target')).toBe('_blank');
            });

            test('THEN: the rel attribute is set to noopener', () => {
                expect($('a').attr('rel')).toBe('noopener');
            });
        });
    });
});
