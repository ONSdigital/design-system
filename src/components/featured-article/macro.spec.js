import * as cheerio from 'cheerio';
import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_FEATURED_ARTICLE_WITH_CHART = {
    title: {
        text: 'Economic Trends 2024',
        url: '/economy/economic-trends-2024',
    },
    metadata: {
        date: {
            prefix: 'Released',
            showPrefix: true,
            iso: '2024-05-01',
            short: '1 May 2024',
        },
        object: {
            text: 'Bulletin',
            url: '/bulletins/economic-trends',
            ref: 'ONS-123',
        },
        file: {
            fileType: 'PDF',
            fileSize: '1MB',
            filePages: '12 pages',
        },
    },
    chart: {
        chartType: 'line',
        title: 'Economic Growth Over Time',
        id: 'growth-chart',
        description: 'This chart shows GDP growth',
        theme: 'default',
        headingLevel: 3,
        legend: true,
        xAxis: { title: { text: 'Year' } },
        yAxis: { title: { text: 'GDP (%)' } },
        series: [{ name: 'GDP', data: [2.1, 2.3, 1.8] }],
        annotations: [],
        rangeAnnotations: [],
        referenceLineAnnotations: [],
        estimateLineLabel: 'Estimate',
        uncertaintyRangeLabel: 'Range',
        isChartInverted: false,
        useStackedLayout: false,
        percentageHeightDesktop: 60,
        percentageHeightMobile: 40,
    },
    itemsList: [
        {
            text: 'Download full report',
            url: '/downloads/full-report.pdf',
        },
    ],
};

const EXAMPLE_FEATURED_ARTICLE_WITH_IMAGE = {
    title: {
        text: 'Population Insights',
        url: '/people/population/insights',
    },
    metadata: {
        date: {
            iso: '2024-04-01',
            short: '1 April 2024',
        },
        object: {
            text: 'Article',
        },
    },
    image: '<img src="/images/chart-thumb.png" alt="Population graph" />',
    itemsList: [
        {
            text: 'View data tables',
            url: '/downloads/data-tables.xlsx',
        },
    ],
};

describe('Macro: onsFeaturedArticle', () => {
    describe('GIVEN: all required and optional params with a chart', () => {
        const $ = cheerio.load(renderComponent('featured-article', EXAMPLE_FEATURED_ARTICLE_WITH_CHART));

        describe('WHEN: the component is rendered', () => {
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
    });

    describe('GIVEN: required params and an image instead of a chart', () => {
        const $ = cheerio.load(renderComponent('featured-article', EXAMPLE_FEATURED_ARTICLE_WITH_IMAGE));

        describe('WHEN: the component is rendered', () => {
            test('THEN: it passes accessibility checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it renders the image HTML', () => {
                const image = $('img');
                expect(image.attr('src')).toBe('/images/chart-thumb.png');
                expect(image.attr('alt')).toBe('Population graph');
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
