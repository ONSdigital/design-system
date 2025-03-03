/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import { EXAMPLE_CHART_REQUIRED_PARAMS, EXAMPLE_CHART_WITH_CONFIG_PARAMS } from './_test-examples';

describe('FOR: Macro: Chart', () => {
    describe('GIVEN: Params: required', () => {
        describe('WHEN: required params are provided', () => {
            const $ = cheerio.load(renderComponent('chart', EXAMPLE_CHART_REQUIRED_PARAMS));

            test('THEN: it passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: it renders the chart container with the correct data attributes', () => {
                expect($('[data-highcharts-base-chart]').attr('data-highcharts-type')).toBe('line');
                expect($('[data-highcharts-base-chart]').attr('data-highcharts-theme')).toBe('primary');
                expect($('[data-highcharts-base-chart]').attr('data-highcharts-title')).toBe('Example Line Chart');
                expect($('[data-highcharts-base-chart]').attr('data-highcharts-uuid')).toBe('chart-123');
            });

            test('THEN: it includes the Highcharts JSON config', () => {
                const configScript = $(`script[data-highcharts-config--chart-123]`).html();
                expect(configScript).toContain('"type":"line"');
                expect(configScript).toContain('"text":"X Axis Title"');
                expect(configScript).toContain('"text":"Y Axis Title"');
            });

            test('THEN: it does NOT render optional fields', () => {
                expect($('figcaption').length).toBe(0);
                expect($('.ons-chart__download-title').length).toBe(0);
            });
        });
    });

    describe('GIVEN: Params: Config', () => {
        describe('WHEN: config params are provided', () => {
            const $ = cheerio.load(renderComponent('chart', EXAMPLE_CHART_WITH_CONFIG_PARAMS));

            test('THEN: it renders the legend when enabled', () => {
                const configScript = $(`script[data-highcharts-config--chart-456]`).html();
                expect(configScript).toContain('"enabled":true');
                expect(configScript).toContain('"align":"right"');
                expect(configScript).toContain('"verticalAlign":"top"');
                expect(configScript).toContain('"layout":"vertical"');
            });

            test('THEN: it includes correct xAxis and yAxis titles', () => {
                const configScript = $(`script[data-highcharts-config--chart-456]`).html();
                expect(configScript).toContain('"text":"X Axis Label"');
                expect(configScript).toContain('"text":"Y Axis Label"');
            });
        });
    });

    describe('GIVEN: Params: Caption', () => {
        describe('WHEN: caption is provided', () => {
            const $ = cheerio.load(
                renderComponent('chart', {
                    ...EXAMPLE_CHART_REQUIRED_PARAMS,
                    caption: 'This is an example caption for the chart.',
                }),
            );

            test('THEN: it renders the caption when provided', () => {
                expect($('figcaption').text()).toBe('This is an example caption for the chart.');
            });
        });
    });

    describe('GIVEN: Params: Description)', () => {
        describe('WHEN: description is provided', () => {
            const $ = cheerio.load(
                renderComponent('chart', {
                    ...EXAMPLE_CHART_REQUIRED_PARAMS,
                    description: 'An accessible description for screen readers.',
                }),
            );

            test('THEN: it renders the description for accessibility', () => {
                expect($('.ons-u-vh').text()).toBe('An accessible description for screen readers.');
            });
        });
    });

    describe('GIVEN: Params: Download)', () => {
        describe('WHEN: download object are provided', () => {
            const $ = cheerio.load(
                renderComponent('chart', {
                    ...EXAMPLE_CHART_REQUIRED_PARAMS,
                    download: {
                        title: 'Download Chart Data',
                        itemsList: [
                            { text: 'Download as PNG', url: 'https://example.com/chart.png' },
                            { text: 'Download as CSV', url: 'https://example.com/chart.csv' },
                        ],
                    },
                }),
            );

            test('THEN: it renders the download section correctly', () => {
                expect($('.ons-chart__download-title').text()).toBe('Download Chart Data');

                const downloadLinks = $('.ons-chart__download-title').next().find('li a');
                expect(downloadLinks.eq(0).text()).toBe('Download as PNG');
                expect(downloadLinks.eq(0).attr('href')).toBe('https://example.com/chart.png');
                expect(downloadLinks.eq(1).text()).toBe('Download as CSV');
                expect(downloadLinks.eq(1).attr('href')).toBe('https://example.com/chart.csv');
            });
        });
    });
});
