/** @jest-environment jsdom */

import * as cheerio from 'cheerio';
import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import { EXAMPLE_FEATURED_ARTICLE_WITH_CHART, EXAMPLE_FEATURED_ARTICLE_WITH_IMAGE } from './_test-examples';

describe('Macro: Featured Article', () => {
    describe('GIVEN: Params: required', () => {
        describe('WHEN: chart is provided and image is not', () => {
            const $ = cheerio.load(renderComponent('featured-article', EXAMPLE_FEATURED_ARTICLE_WITH_CHART));

            test('THEN: it passes accessibility checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it displays the correct title text', () => {
                expect($('.ons-featured__title').text()).toBe('Economic Trends 2024');
            });

            test('THEN: it links the title correctly', () => {
                expect($('.ons-featured__title a').attr('href')).toBe('/economy/economic-trends-2024');
            });

            test('THEN: it renders the onsChart component', () => {
                expect($('[data-highcharts-base-chart]').length).toBe(1);
            });

            test('THEN: the chart has the correct Id', () => {
                expect($('[data-highcharts-base-chart]').attr('data-highcharts-id')).toBe('growth-chart');
            });

            test('THEN: the chart has the correct type', () => {
                expect($('[data-highcharts-base-chart]').attr('data-highcharts-type')).toBe('line');
            });
        });

        describe('WHEN: image is provided and chart is not', () => {
            const $ = cheerio.load(renderComponent('featured-article', EXAMPLE_FEATURED_ARTICLE_WITH_IMAGE));

            test('THEN: it passes accessibility checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it displays the correct title text', () => {
                expect($('.ons-featured__title').text()).toContain('Population Insights');
            });

            test('THEN: it links the title correctly', () => {
                expect($('.ons-featured__title a').attr('href')).toBe('/people/population/insights');
            });

            test('THEN: it renders image with correct src', () => {
                expect($('.ons-image__img').attr('src')).toBe('example.png');
            });

            test('THEN: it renders image with correct alt text', () => {
                expect($('.ons-image__img').attr('alt')).toBe('Example alt text');
            });
        });
    });

    describe('GIVEN: Param: metadata', () => {
        describe('WHEN: metadata with date and object is provided', () => {
            const $ = cheerio.load(renderComponent('featured-article', EXAMPLE_FEATURED_ARTICLE_WITH_CHART));

            test('THEN: it renders ISO date value correctly', () => {
                expect($('time').attr('datetime')).toBe('2024-05-01');
            });

            test('THEN: it renders short date label correctly', () => {
                expect($('time').text()).toBe('1 May 2024');
            });

            test('THEN: it displays metadata text', () => {
                expect($('.ons-featured__item-attribute span').text()).toContain('Bulletin');
            });
        });

        describe('WHEN: metadata object has no URL', () => {
            const $ = cheerio.load(renderComponent('featured-article', EXAMPLE_FEATURED_ARTICLE_WITH_IMAGE));

            test('THEN: it does not render metadata link', () => {
                expect($('.ons-featured__attribute-link').length).toBe(0);
            });

            test('THEN: it still displays metadata text', () => {
                expect($('.ons-featured__item-attribute span').text()).toContain('Article');
            });
        });

        describe('WHEN: metadata is not provided', () => {
            const articleWithoutMetadata = {
                ...EXAMPLE_FEATURED_ARTICLE_WITH_CHART,
                metadata: undefined,
            };
            const $ = cheerio.load(renderComponent('featured-article', articleWithoutMetadata));

            test('THEN: metadata section is not rendered', () => {
                expect($('.ons-featured__item-metadata').length).toBe(0);
            });
        });
    });

    describe('GIVEN: Params: description', () => {
        describe('WHEN: description is provided', () => {
            test('THEN: has expected description', () => {
                const $ = cheerio.load(
                    renderComponent('featured-article', { ...EXAMPLE_FEATURED_ARTICLE_WITH_CHART, description: 'Some description' }),
                );
                const title = $('.ons-featured__description').html().trim();
                expect(title).toBe('Some description');
            });
        });
    });

    describe('GIVEN: Param: headingLevel', () => {
        describe('WHEN: heading level is provided', () => {
            const $ = cheerio.load(
                renderComponent('featured-article', {
                    ...EXAMPLE_FEATURED_ARTICLE_WITH_CHART,
                    headingLevel: 3,
                }),
            );

            test('THEN: title is rendered using correct heading tag', () => {
                expect($('.ons-featured__title').tagName).toBe('h3');
            });
        });
    });
});
