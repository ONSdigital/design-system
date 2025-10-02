/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

describe('FOR: Macro: Back-to-top', () => {
    describe('GIVEN: Params: default', () => {
        describe('WHEN: params are at default', () => {
            const $ = cheerio.load(renderComponent('back-to-top'));
            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
        });
    });
    describe('GIVEN: Params: description', () => {
        describe('WHEN: description text is not provided', () => {
            const $ = cheerio.load(renderComponent('back-to-top'));
            test('THEN: renders with default description text', () => {
                expect($('.ons-back-to-top .ons-back-to-top__link').text().trim()).toBe('Back to top');
            });
        });
        describe('WHEN: description text is provided', () => {
            const $ = cheerio.load(
                renderComponent('back-to-top', {
                    description: 'Scroll to top',
                }),
            );
            test('THEN: renders button with provided text', () => {
                expect($('.ons-back-to-top .ons-back-to-top__link').text().trim()).toBe('Scroll to top');
            });
        });
    });
    describe('GIVEN: Params: anchor', () => {
        describe('WHEN: anchor is not provided', () => {
            const $ = cheerio.load(renderComponent('back-to-top'));
            test('THEN: renders with default anchor id', () => {
                expect($('.ons-back-to-top .ons-back-to-top__link').attr('href')).toBe('#top');
            });
        });
        describe('WHEN: anchor is provided', () => {
            const $ = cheerio.load(
                renderComponent('back-to-top', {
                    anchor: 'example-target',
                }),
            );
            test('THEN: renders button with provided anchor id', () => {
                expect($('.ons-back-to-top .ons-back-to-top__link').attr('href')).toBe('#example-target');
            });
        });
    });
});
