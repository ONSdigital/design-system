/** @jest-environment jsdom */

import * as cheerio from 'cheerio';
import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import { EXAMPLE_CORRECTION_NOTICE } from './_test-examples';

describe('FOR: Macro: Correction and Notice', () => {
    describe('GIVEN: Params: defualt', () => {
        describe('WHEN: default params are provided', () => {
            const $ = cheerio.load(renderComponent('correction-and-notice', EXAMPLE_CORRECTION_NOTICE));
            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
            test('THEN: has the provided id attribute', () => {
                console.log($.html());
                expect($('.ons-banner__details').attr('id')).toBe('details-id');
            });
            test('THEN: has correct titles in content', () => {
                const contentTitle0 = $('.ons-banner-details-content__item-title').eq(0).text().trim();
                const contentTitle1 = $('.ons-banner-details-content__item-title').eq(1).text().trim();

                expect(contentTitle0).toBe('Correction');
                expect(contentTitle1).toBe('Notice');
            });
            test('THEN: has correct dates', () => {
                const dateText0 = $('.ons-banner-details-content__item-date').eq(0).text().trim();
                const dateText1 = $('.ons-banner-details-content__item-date').eq(1).text().trim();

                expect(dateText0).toBe('22nd Janauary 2025,4:30PM');
                expect(dateText1).toBe('22nd Janauary 2025');
            });
            test('THEN: has correct description text', () => {
                const contentdescriptionText0 = $('.ons-banner-details-content__item-description-text').eq(0).text().trim();
                const contentdescriptionText1 = $('.ons-banner-details-content__item-description-text').eq(1).text().trim();

                expect(contentdescriptionText0).toBe('description1');
                expect(contentdescriptionText1).toBe('description2');
            });
            test('THEN: correction has a valid link', () => {
                const correctionLinkText = $('.ons-correction-notices__item-url').eq(0).text().trim();
                const correctionLinkUrl = $('.ons-correction-notices__item-url').eq(0).attr('href');

                expect(correctionLinkText).toBe('View superceded Version');
                expect(correctionLinkUrl).toBe('#0');
            });
        });
    });
});
