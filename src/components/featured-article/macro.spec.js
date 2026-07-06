/** @jest-environment jsdom */

import * as cheerio from 'cheerio';
import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import { EXAMPLE_FEATURED_ARTICLE_PARAMS, EXAMPLE_CHART_CALLER_CONTENT, EXAMPLE_IMAGE_CALLER_CONTENT } from './_test-examples';

describe('Macro: Featured Article', () => {
    describe('GIVEN: Params: required', () => {
        describe('WHEN: chart content is provided via caller', () => {
            const $ = cheerio.load(renderComponent('featured-article', EXAMPLE_FEATURED_ARTICLE_PARAMS, EXAMPLE_CHART_CALLER_CONTENT));

            test('THEN: it passes accessibility checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it displays the correct title text', () => {
                expect($('.ons-featured__title').text().trim()).toBe('Economic Trends 2024');
            });

            test('THEN: the title has the correct url link', () => {
                expect($('.ons-featured__title a').attr('href')).toBe('/economy/economic-trends-2024');
            });

            test('THEN: it renders the caller content in the media area', () => {
                expect($('.ons-featured__media [data-highcharts-base-chart]').length).toBe(1);
            });

            test('THEN: the chart has the correct id', () => {
                expect($('[data-highcharts-base-chart]').attr('data-highcharts-id')).toBe('growth-chart');
            });

            test('THEN: the chart has the correct type', () => {
                expect($('[data-highcharts-base-chart]').attr('data-highcharts-type')).toBe('line');
            });
        });

        describe('WHEN: image content is provided via caller', () => {
            const $ = cheerio.load(renderComponent('featured-article', EXAMPLE_FEATURED_ARTICLE_PARAMS, EXAMPLE_IMAGE_CALLER_CONTENT));

            test('THEN: it passes accessibility checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it displays the correct title text', () => {
                expect($('.ons-featured__title').text().trim()).toBe('Economic Trends 2024');
            });

            test('THEN: the title has the correct url link', () => {
                expect($('.ons-featured__title a').attr('href')).toBe('/economy/economic-trends-2024');
            });

            test('THEN: it renders image with correct src attribute', () => {
                expect($('.ons-featured__media .ons-image__img').attr('src')).toBe('example.png');
            });

            test('THEN: it renders image with correct alt text', () => {
                expect($('.ons-featured__media .ons-image__img').attr('alt')).toBe('Example alt text');
            });
        });

        describe('WHEN: no caller content is provided', () => {
            const $ = cheerio.load(renderComponent('featured-article', EXAMPLE_FEATURED_ARTICLE_PARAMS));

            test('THEN: the media area is empty', () => {
                expect($('.ons-featured__media').html().trim()).toBe('');
            });
        });
    });

    describe('GIVEN: Param: metadata', () => {
        describe('WHEN: metadata is provided', () => {
            const $ = cheerio.load(
                renderComponent(
                    'featured-article',
                    {
                        ...EXAMPLE_FEATURED_ARTICLE_PARAMS,
                        metadata: {
                            date: {
                                prefix: 'Released',
                                showPrefix: true,
                                iso: '2024-05-01',
                                short: '1 May 2024',
                            },
                            text: 'Bulletin',
                        },
                    },
                    EXAMPLE_CHART_CALLER_CONTENT,
                ),
            );

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

        describe('WHEN: metadata is not provided', () => {
            const $ = cheerio.load(renderComponent('featured-article', EXAMPLE_FEATURED_ARTICLE_PARAMS, EXAMPLE_CHART_CALLER_CONTENT));

            test('THEN: metadata section is not rendered', () => {
                expect($('.ons-featured__item-metadata').length).toBe(0);
            });
        });
    });

    describe('GIVEN: Params: description', () => {
        describe('WHEN: description is provided', () => {
            test('THEN: has expected description', () => {
                const $ = cheerio.load(
                    renderComponent(
                        'featured-article',
                        { ...EXAMPLE_FEATURED_ARTICLE_PARAMS, description: 'Some description' },
                        EXAMPLE_CHART_CALLER_CONTENT,
                    ),
                );
                const title = $('.ons-featured__description').html().trim();
                expect(title).toBe('Some description');
            });
        });
    });

    describe('GIVEN: Param: headingLevel', () => {
        describe('WHEN: heading level is provided', () => {
            const $ = cheerio.load(
                renderComponent(
                    'featured-article',
                    {
                        ...EXAMPLE_FEATURED_ARTICLE_PARAMS,
                        headingLevel: 3,
                    },
                    EXAMPLE_CHART_CALLER_CONTENT,
                ),
            );

            test('THEN: title is rendered using correct heading tag', () => {
                expect($('.ons-featured__title')[0].tagName).toBe('h3');
            });
        });
    });
});
