/** @jest-environment jsdom */

import * as cheerio from 'cheerio';
import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import { EXAMPLE_FEATURED_ARTICLE_WITH_CHART, EXAMPLE_FEATURED_ARTICLE_WITH_IMAGE } from './_test-examples';

describe('Macro: Featured Article', () => {
    describe('GIVEN: Params: required ', () => {
        describe('WHEN: all required and optional params with a chart', () => {
            const $ = cheerio.load(renderComponent('featured-article', EXAMPLE_FEATURED_ARTICLE_WITH_CHART));

            test('THEN: it passes accessibility checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it displays the title and link correctly', () => {
                expect($('.ons-featured__title a').attr('href')).toBe('/economy/economic-trends-2024');
                expect($('.ons-featured__title').text()).toContain('Economic Trends 2024');
            });

            test('THEN: it renders the formatted date and ISO value', () => {
                expect($('time').attr('datetime')).toBe('2024-05-01');
                expect($('time').text()).toBe('1 May 2024');
            });

            test('THEN: it displays metadata object with a link and reference', () => {
                expect($('.ons-featured__attribute-link').attr('href')).toBe('/bulletins/economic-trends');
                expect($('.ons-featured__attribute-link').text()).toContain('Bulletin');
                expect($('.ons-featured__item-attribute span').last().text()).toBe('ONS-123');
            });

            test('THEN: it displays file metadata (type, size, pages)', () => {
                expect($('.ons-featured__item-attribute[aria-hidden="true"]').text()).toContain('PDF, 1MB, 12 pages');
            });

            test('THEN: it renders the onsChart component with correct attributes', () => {
                const chart = $('[data-highcharts-base-chart]');
                expect(chart.length).toBe(1);
                expect(chart.attr('data-highcharts-id')).toBe('growth-chart');
                expect(chart.attr('data-highcharts-type')).toBe('line');
            });

            test('THEN: it displays the itemsList', () => {
                expect($('.ons-featured__items-list li').length).toBe(1);
                expect($('.ons-featured__items-list li a').attr('href')).toBe('/downloads/full-report.pdf');
            });
        });

        describe('WHEN: required params and an image instead of a chart', () => {
            const $ = cheerio.load(renderComponent('featured-article', EXAMPLE_FEATURED_ARTICLE_WITH_IMAGE));

            test('THEN: it passes accessibility checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it outputs an `img` element with the expected `src`', () => {
                expect($('.ons-image__img').attr('src')).toBe('example.png');
            });

            test('THEN: it outputs an `img` element with the expected alt text', () => {
                expect($('.ons-image__img').attr('alt')).toBe('Example alt text');
            });

            test('THEN: it shows the date properly formatted', () => {
                expect($('time').attr('datetime')).toBe('2024-04-01');
                expect($('time').text()).toBe('1 April 2024');
            });

            test('THEN: it renders object metadata text without link or ref', () => {
                expect($('.ons-featured__attribute-link').length).toBe(0);
                expect($('.ons-featured__item-attribute span').text()).toContain('Article');
            });

            test('THEN: it shows the itemsList links', () => {
                expect($('.ons-featured__items-list li').length).toBe(1);
                expect($('.ons-featured__items-list li a').attr('href')).toBe('/downloads/data-tables.xlsx');
            });

            test('THEN: it does NOT render a chart', () => {
                expect($('[data-highcharts-base-chart]').length).toBe(0);
            });
        });
    });
});
