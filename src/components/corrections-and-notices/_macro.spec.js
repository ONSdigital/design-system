/** @jest-environment jsdom */
import * as cheerio from 'cheerio';
import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import { EXAMPLE_CORRECTIONS, EXAMPLE_NOTICES } from './_test-examples';

describe('FOR: Macro: Corrections and Notices', () => {
    describe('GIVEN: Params: Corrections', () => {
        describe('WHEN: Corrections are provided', () => {
            const $ = cheerio.load(renderComponent('corrections-and-notices', EXAMPLE_CORRECTIONS));
            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
            test('THEN: has correct titles in content', () => {
                const contentTitle = $('.ons-corrections-notices__content-heading').text().trim();
                expect(contentTitle).toBe('Correction');
            });
            test('THEN: has correct date', () => {
                const dateText = $('.ons-corrections-notices__content-date').text().trim();
                expect(dateText).toBe('22nd Janauary 2025, 4:30PM');
            });
            test('THEN: has correct description text', () => {
                const contentdescriptionText = $('.ons-corrections-notices__content-text').text().trim();
                expect(contentdescriptionText).toBe('description1');
            });
            test('THEN: correction has the provided link', () => {
                const correctionLinkUrl = $('.ons-corrections-notices__content-url').attr('href');
                expect(correctionLinkUrl).toBe('#0');
            });
        });
    });
    describe('GIVEN: Params: Notices', () => {
        describe('WHEN: Notices are provided', () => {
            const $ = cheerio.load(renderComponent('corrections-and-notices', EXAMPLE_NOTICES));
            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
            test('THEN: has correct titles in content', () => {
                const contentTitle = $('.ons-corrections-notices__content-heading').text().trim();
                expect(contentTitle).toBe('Notice');
            });

            test('THEN: has correct date', () => {
                const dateText = $('.ons-corrections-notices__content-date').text().trim();
                expect(dateText).toBe('22nd Janauary 2025');
            });
            test('THEN: has correct description text', () => {
                const contentdescriptionText = $('.ons-corrections-notices__content-text').text().trim();
                expect(contentdescriptionText).toBe('description2');
            });
        });
    });
});
