/** @jest-environment jsdom */
import * as cheerio from 'cheerio';
import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import {
    EXAMPLE_DETAILS_PANEL_SINGLE_GROUP,
    EXAMPLE_DETAILS_PANEL_MULTIPLE_GROUPS,
    EXAMPLE_DETAILS_PANEL_MULTIPLE_GROUPS_AND_GROUP_ITEMS,
} from './_test-examples';

describe('FOR: Macro: Details Panel', () => {
    describe('GIVEN: Params: id', () => {
        describe('WHEN: id is provided', () => {
            test('THEN: has the provided id attribute', () => {
                const $ = cheerio.load(renderComponent('details-panel', EXAMPLE_DETAILS_PANEL_SINGLE_GROUP));
                expect($('.ons-details-panel').attr('id')).toBe('example-id');
            });
        });
    });
    describe('GIVEN: Params: groupsItems', () => {
        describe('WHEN: groupItems are provided', () => {
            const $ = cheerio.load(renderComponent('details-panel', EXAMPLE_DETAILS_PANEL_SINGLE_GROUP));
            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
            test('THEN: has correct titles in content', () => {
                const contentTitle = $('.ons-details-panel__content-heading').text().trim();
                expect(contentTitle).toBe('Correction');
            });
            test('THEN: has correct date', () => {
                const dateText = $('.ons-details-panel__content-date').text().trim();
                expect(dateText).toBe('22nd January 2025, 4:30PM');
            });
            test('THEN: has correct description text', () => {
                const contentdescriptionText = $('.ons-details-panel__content-text').text().trim();
                expect(contentdescriptionText).toBe('description1');
            });
            test('THEN: correction has the provided link', () => {
                const correctionLinkUrl = $('.ons-details-panel__content-url').attr('href');
                expect(correctionLinkUrl).toBe('#0');
            });
        });
    });
    describe('GIVEN: Params: groups', () => {
        describe('WHEN: multiple groups are provided', () => {
            const $ = cheerio.load(renderComponent('details-panel', EXAMPLE_DETAILS_PANEL_MULTIPLE_GROUPS));
            test('THEN: has correct titles for the banner title', () => {
                const contentTitle = $('.ons-details-panel__banner-title').text().replace(/\s+/g, ' ').trim();
                expect(contentTitle).toBe('Correction and Notice');
            });
        });
        describe('WHEN: single group is provided', () => {
            const $ = cheerio.load(renderComponent('details-panel', EXAMPLE_DETAILS_PANEL_SINGLE_GROUP));
            test('THEN: has correct titles for the banner title', () => {
                const contentTitle = $('.ons-details-panel__banner-title').text().replace(/\s+/g, ' ').trim();
                expect(contentTitle).toBe('Correction');
            });
        });
        describe('WHEN: multiple groups and groupItems are provided', () => {
            const $ = cheerio.load(renderComponent('details-panel', EXAMPLE_DETAILS_PANEL_MULTIPLE_GROUPS_AND_GROUP_ITEMS));
            test('THEN: has correct titles for the banner title', () => {
                const contentTitle = $('.ons-details-panel__banner-title').text().replace(/\s+/g, ' ').trim();
                expect(contentTitle).toBe('Corrections and Notices');
            });
        });
    });
});
