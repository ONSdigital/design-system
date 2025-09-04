/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import {
    EXAMPLE_LINE_CHART_REQUIRED_PARAMS,
    EXAMPLE_LINE_CHART_WITH_CONFIG_PARAMS,
    EXAMPLE_LINE_CHART_WITH_LEGEND_UNSET_PARAMS,
    EXAMPLE_BAR_CHART_PARAMS,
    EXAMPLE_BAR_CHART_WITH_PERCENTAGE_HEIGHT_PARAMS,
    EXAMPLE_COLUMN_CHART_PARAMS,
    EXAMPLE_LINE_CHART_WITH_ANNOTATIONS_PARAMS,
    EXAMPLE_BAR_CHART_WITH_ANNOTATIONS_PARAMS,
    EXAMPLE_COLUMN_CHART_WITH_ANNOTATIONS_PARAMS,
    EXAMPLE_COLUMN_WITH_LINE_CHART_PARAMS,
    EXAMPLE_SCATTER_CHART_PARAMS,
    EXAMPLE_AREA_CHART_PARAMS,
    EXAMPLE_BOXPLOT_CHART_PARAMS,
    EXAMPLE_COLUMN_RANGE_CHART_PARAMS,
    EXAMPLE_INVALID_CHART_PARAMS,
    EXAMPLE_LINE_CHART_WITH_RANGE_ANNOTATION_ON_X_AXIS_PARAMS,
    EXAMPLE_LINE_CHART_WITH_RANGE_ANNOTATION_ON_Y_AXIS_WITH_LABEL_WIDTH_PARAMS,
    EXAMPLE_LINE_CHART_WITH_RANGE_ANNOTATION_WITH_LABEL_INSIDE_PARAMS,
    EXAMPLE_LINE_CHART_WITH_REFERENCE_LINE_ANNOTATIONS_PARAMS,
    EXAMPLE_LINE_CHART_WITH_MIXED_ANNOTATION_TYPES_PARAMS,
    EXAMPLE_IFRAME_CHART_PARAMS,
} from './_test-examples';

describe('Macro: Chart', () => {
    describe('FOR: Line Chart', () => {
        describe('GIVEN: Params: required', () => {
            describe('WHEN: required params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_REQUIRED_PARAMS));

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it renders the title', () => {
                    expect($('.ons-chart__title').text()).toBe('Example Line Chart');
                });

                test('THEN: it renders the subtitle', () => {
                    expect($('.ons-chart__subtitle').text()).toBe('A sample subtitle');
                });

                test('THEN: it renders the chart container with the correct data attributes', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-type')).toBe('line');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-title')).toBe('Example Line Chart');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-id')).toBe('chart-123');
                });

                test('THEN: it includes the Highcharts JSON config', () => {
                    const configScript = $(`script[data-highcharts-config--chart-123]`).html();
                    expect(configScript).toContain('"text":"X Axis Title"');
                    expect(configScript).toContain('"text":"Y Axis Title"');
                });

                test('THEN: it does NOT render optional fields', () => {
                    expect($('figcaption').length).toBe(0);
                    expect($('.ons-chart__download-title').length).toBe(0);
                });

                test('THEN: it renders the chart container with the correct aria attributes', () => {
                    expect($('.ons-chart__container').attr('aria-label')).toBe('chart container');
                });
            });
        });

        describe('GIVEN: Params: instructions', () => {
            describe('WHEN: instructions is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_REQUIRED_PARAMS,
                        instructions: 'Some custom instructions for the chart.',
                    }),
                );

                test('THEN: it renders the chart with the correct instructions text', () => {
                    const expectedText = 'Some custom instructions for the chart.';
                    expect($('#chart-instructions-chart-123').text().trim()).toBe(expectedText);
                });
            });

            describe('WHEN: instructions is not provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_REQUIRED_PARAMS));

                test('THEN: it renders the chart with the default instructions text', () => {
                    const expectedText =
                        'Use the Tab key to move focus into the chart. Once inside, use the arrow keys to navigate between data points. As you move, tooltips will be announced to describe each point. Touch device users, explore by touch or with swipe gestures.';
                    expect($('#chart-instructions-chart-123').text().trim()).toBe(expectedText);
                });
            });
        });

        describe('GIVEN: Params: theme', () => {
            describe('WHEN: theme is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_REQUIRED_PARAMS,
                        theme: 'primary',
                    }),
                );

                test('THEN: it renders the chart container with the correct theme', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-theme')).toBe('primary');
                });
            });
        });

        describe('GIVEN: Params: headingLevel', () => {
            describe('WHEN: heading level is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_REQUIRED_PARAMS,
                        headingLevel: 3,
                        download: {
                            title: 'Download Chart Data',
                            itemsList: [
                                { text: 'Download as PNG', url: 'https://example.com/chart.png' },
                                { text: 'Download as CSV', url: 'https://example.com/chart.csv' },
                            ],
                        },
                    }),
                );

                test('THEN: renders title with correct tag', () => {
                    expect($('.ons-chart__title')[0].tagName).toBe('h3');
                });

                test('THEN: renders subtitle with correct tag', () => {
                    expect($('.ons-chart__subtitle')[0].tagName).toBe('h4');
                });

                test('THEN: renders download title with correct tag', () => {
                    expect($('.ons-chart__download-title')[0].tagName).toBe('h5');
                });
            });
        });

        describe('GIVEN: Params: tickInterval', () => {
            describe('WHEN: tick interval is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_REQUIRED_PARAMS,
                        xAxis: {
                            ...EXAMPLE_LINE_CHART_REQUIRED_PARAMS.xAxis,
                            tickIntervalMobile: 2,
                            tickIntervalDesktop: 5,
                        },
                    }),
                );
                test('THEN: it includes the tick interval in the config', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-x-axis-tick-interval-mobile')).toBe('2');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-x-axis-tick-interval-desktop')).toBe('5');
                });
            });
            describe('WHEN: tick interval is not provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_REQUIRED_PARAMS,
                    }),
                );
                test('THEN: it does not include the tick interval in the config', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-x-axis-tick-interval-mobile')).toBe(undefined);
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-x-axis-tick-interval-desktop')).toBe(undefined);
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-y-axis-tick-interval-desktop')).toBe(undefined);
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-y-axis-tick-interval-mobile')).toBe(undefined);
                });
            });
        });

        describe('GIVEN: Params: xAxis', () => {
            describe('WHEN: xAxis options are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_CONFIG_PARAMS));
                const configScript = $(`script[data-highcharts-config--chart-456]`).html();

                test('THEN: it renders the xAxis correctly', () => {
                    expect(configScript).toContain('"text":"X Axis Label"');
                    expect(configScript).toContain('"categories":["A","B","C"]');
                });
            });

            describe('WHEN: xAxis min and max are provided', () => {
                test('THEN: xAxis min and max are ignored', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        chartType: 'line',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                            min: 1,
                            max: 10,
                            startOnTick: true,
                            endOnTick: true,
                        },
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    expect(configScript).not.toContain('"min":1');
                    expect(configScript).not.toContain('"max":10');
                    expect(configScript).not.toContain('"startOnTick":true');
                    expect(configScript).not.toContain('"endOnTick":true');
                });
            });
        });

        describe('GIVEN: Params: yAxis', () => {
            describe('WHEN: yAxis options are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_CONFIG_PARAMS));
                const configScript = $(`script[data-highcharts-config--chart-456]`).html();

                test('THEN: it renders the yAxis correctly', () => {
                    expect(configScript).toContain('"text":"Y Axis Label"');
                    expect(configScript).toContain('"labels":{"format":"{value:,.f}"}');
                });
            });

            describe('WHEN: yAxis min and max are provided', () => {
                test('THEN: yAxis min and max are included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                        },
                        chartType: 'line',
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                            min: 0,
                            max: 100,
                            startOnTick: false,
                            endOnTick: true,
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    expect(configScript).toContain('"min":0');
                    expect(configScript).toContain('"max":100');
                    expect(configScript).toContain('"startOnTick":false');
                    expect(configScript).toContain('"endOnTick":true');
                });
            });

            describe('WHEN: yAxis min and max are not provided', () => {
                test('THEN: yAxis min and max are not included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                        },
                        chartType: 'line',
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                            min: undefined,
                            max: undefined,
                            startOnTick: undefined,
                            endOnTick: undefined,
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    const config = JSON.parse(configScript);

                    expect(config.yAxis.min).toBeUndefined();
                    expect(config.yAxis.max).toBeUndefined();
                    expect(config.yAxis.startOnTick).toBeUndefined();
                    expect(config.yAxis.endOnTick).toBeUndefined();
                });
            });
        });

        describe('GIVEN: Params: series', () => {
            describe('WHEN: series data is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_CONFIG_PARAMS));
                const configScript = $(`script[data-highcharts-config--chart-456]`).html();

                test('THEN: it renders the series correctly', () => {
                    expect(configScript).toContain('"name":"Category 1"');
                    expect(configScript).toContain('"data":[5,15,25]');
                    expect(configScript).toContain('"name":"Category 2"');
                    expect(configScript).toContain('"data":[10,20,30]');
                });
            });
        });

        describe('GIVEN: Params: percentageHeightDesktop', () => {
            describe('WHEN: percentage height desktop is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_CONFIG_PARAMS));
                test('THEN: it includes correct percentage height desktop', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-percentage-height-desktop')).toBe('50');
                });
            });
        });

        describe('GIVEN: Params: percentageHeightMobile', () => {
            describe('WHEN: percentage height mobile is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_CONFIG_PARAMS));
                test('THEN: it includes correct percentage height mobile', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-percentage-height-mobile')).toBe('120');
                });
            });
        });

        describe('GIVEN: Params: fallbackImageUrl', () => {
            describe('WHEN: fallbackImageUrl is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_WITH_CONFIG_PARAMS,
                        fallbackImageUrl: '/img/small/line-chart-screenshot.png',
                    }),
                );
                const noScriptFallbackImage = $(`#fallback-image--chart-456`).html();
                test('THEN: it renders the fallback image', () => {
                    expect(noScriptFallbackImage).toContain('/img/small/line-chart-screenshot.png');
                });
            });
        });

        describe('GIVEN: Params: fallbackImageAlt', () => {
            describe('WHEN: fallbackImageAlt is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_WITH_CONFIG_PARAMS,
                        fallbackImageUrl: '/img/small/line-chart-screenshot.png',
                        fallbackImageAlt: 'A description of the fallback image for screen readers',
                    }),
                );
                const noScriptFallbackImage = $(`#fallback-image--chart-456`).html();
                test('THEN: it renders the customised fallback image alt text', () => {
                    expect(noScriptFallbackImage).toContain('alt="A description of the fallback image for screen readers"');
                });
            });

            describe('WHEN: fallbackImageAlt is not provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_WITH_CONFIG_PARAMS,
                        fallbackImageUrl: '/img/small/line-chart-screenshot.png',
                    }),
                );
                const noScriptFallbackImage = $(`#fallback-image--chart-456`).html();
                test('THEN: it renders the default fallback image alt text', () => {
                    expect(noScriptFallbackImage).toContain('alt="Fallback image for the chart as JavaScript is disabled"');
                });
            });
        });

        describe('GIVEN: Params: caption', () => {
            describe('WHEN: caption is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_REQUIRED_PARAMS,
                        caption: 'This is an example caption for the chart.',
                    }),
                );

                test('THEN: it renders the caption when provided', () => {
                    expect($('figcaption').text()).toBe('This is an example caption for the chart.');
                });
            });
        });

        describe('GIVEN: Params: unsupportedChartText', () => {
            describe('WHEN: unsupportedChartText is provided', () => {
                const params = { ...EXAMPLE_INVALID_CHART_PARAMS, unsupportedChartText: 'this chart type is not valid' };
                const $ = cheerio.load(renderComponent('chart', params));

                test('THEN: it renders the unsupported chart text in the correct element', () => {
                    const invalid = $('[data-invalid-chart-type]');
                    expect(invalid.length).toBe(1);
                    expect(invalid.text().trim()).toContain('- this chart type is not valid');
                });
            });

            describe('WHEN: unsupportedChartText is not provided', () => {
                const params = { ...EXAMPLE_INVALID_CHART_PARAMS };
                const $ = cheerio.load(renderComponent('chart', params));

                test('THEN: it renders the default unsupported chart text', () => {
                    const invalid = $('[data-invalid-chart-type]');
                    expect(invalid.length).toBe(1);
                    expect(invalid.text().trim()).toBe('"invalid" - chart type is not supported');
                });
            });
        });

        describe('GIVEN: Params: description', () => {
            describe('WHEN: description is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_REQUIRED_PARAMS,
                        description: 'An accessible description for screen readers.',
                    }),
                );

                test('THEN: it renders the description for accessibility', () => {
                    expect($('#chart-audio-description-chart-123').text()).toBe('An accessible description for screen readers.');
                });
            });
        });

        describe('GIVEN: Params: download', () => {
            describe('WHEN: download object is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_REQUIRED_PARAMS,
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

        describe('GIVEN: Params: legend', () => {
            describe('WHEN: legend parameter is provided and set to true', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_WITH_LEGEND_UNSET_PARAMS,
                        legend: true,
                    }),
                );
                test('THEN: it renders the legend', () => {
                    const configScript = $(`script[data-highcharts-config--line-chart-legend-tests-123]`).html();
                    expect(configScript).toContain('"legend":{"enabled":true}');
                });
            });

            describe('WHEN: legend parameter is provided and set to false', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_WITH_LEGEND_UNSET_PARAMS,
                        legend: false,
                    }),
                );
                test('THEN: it does not render the legend', () => {
                    const configScript = $(`script[data-highcharts-config--line-chart-legend-tests-123]`).html();
                    expect(configScript).toContain('"legend":{"enabled":false}');
                });
            });

            describe('WHEN: legend parameter is not provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_LEGEND_UNSET_PARAMS));
                test('THEN: it renders the legend', () => {
                    const configScript = $(`script[data-highcharts-config--line-chart-legend-tests-123]`).html();
                    expect(configScript).toContain('"legend":{"enabled":true}');
                });
            });

            describe('WHEN: legend parameter is provided but is not a boolean', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_WITH_LEGEND_UNSET_PARAMS,
                        legend: 'false',
                    }),
                );
                test('THEN: it renders the legend default value', () => {
                    const configScript = $(`script[data-highcharts-config--line-chart-legend-tests-123]`).html();
                    expect(configScript).toContain('"legend":{"enabled":true}');
                });
            });
        });

        describe('GIVEN: Params: rangeAnnotations', () => {
            describe('WHEN: range annotations params are provided on the yAxis with label width', () => {
                const $ = cheerio.load(
                    renderComponent('chart', EXAMPLE_LINE_CHART_WITH_RANGE_ANNOTATION_ON_Y_AXIS_WITH_LABEL_WIDTH_PARAMS),
                );

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it includes the range annotations JSON config', () => {
                    const configScript = $(`script[data-highcharts-range-annotations--line-chart-range-annotations-y-axis-123]`).html();
                    expect(configScript).toContain('"text":"A test y axis range annotation with a label width of 250px"');
                    expect(configScript).toContain('"axis":"y"');
                    expect(configScript).toContain('"labelWidth":250');
                });
            });

            describe('WHEN: range annotations params are provided on the xAxis', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_RANGE_ANNOTATION_ON_X_AXIS_PARAMS));

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it includes the range annotations JSON config', () => {
                    const configScript = $(`script[data-highcharts-range-annotations--line-chart-range-annotations-x-axis-123]`).html();
                    expect(configScript).toContain('"text":"A test x axis range annotation"');
                    expect(configScript).toContain('"range":{"axisValue1":10,"axisValue2":15}');
                    expect(configScript).toContain('"axis":"x"');
                    expect(configScript).toContain('"labelOffsetX":150');
                    expect(configScript).toContain('"labelOffsetY":0');
                });
            });

            describe('WHEN: range annotations params are provided with label inside', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_RANGE_ANNOTATION_WITH_LABEL_INSIDE_PARAMS));

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it includes the range annotations JSON config', () => {
                    const configScript = $(
                        `script[data-highcharts-range-annotations--line-chart-range-annotations-label-inside-123]`,
                    ).html();
                    expect(configScript).toContain('"text":"A test y axis range annotation with the label inside"');
                    expect(configScript).toContain('"axis":"y"');
                    expect(configScript).toContain('"labelInside":true');
                });
            });
        });

        describe('GIVEN: Params: referenceLineAnnotations', () => {
            describe('WHEN: reference line annotations params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_REFERENCE_LINE_ANNOTATIONS_PARAMS));

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it includes the reference line annotations JSON config', () => {
                    const configScript = $(
                        `script[data-highcharts-reference-line-annotations--line-chart-reference-line-annotations-123]`,
                    ).html();
                    expect(configScript).toContain('"text":"A test x axis reference line annotation"');
                    expect(configScript).toContain('"value":34');
                    expect(configScript).toContain('"axis":"x"');
                    expect(configScript).toContain('"text":"A test y axis reference line annotation"');
                    expect(configScript).toContain('"value":12');
                    expect(configScript).toContain('"axis":"y"');
                    expect(configScript).toContain('"labelWidth":100');
                });
            });
        });

        describe('GIVEN: Params: annotations', () => {
            describe('WHEN: annotations params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_ANNOTATIONS_PARAMS));

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it renders the footnotes', () => {
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('1');
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('A test annotation');
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('2');
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('Another test annotation');
                });

                test('THEN: the footnotes are hidden from screen readers', () => {
                    expect($('.ons-chart__annotations-footnotes').attr('aria-hidden')).toBe('true');
                });

                test('THEN: it includes the annotations JSON config', () => {
                    const configScript = $(`script[data-highcharts-annotations--line-chart-annotations-123]`).html();
                    expect(configScript).toContain('"text":"A test annotation"');
                    expect(configScript).toContain('"point":{"x":10,"y":1.3}');
                    expect(configScript).toContain('"labelOffsetX":10,"labelOffsetY":-50');
                });
            });
        });

        describe('GIVEN: Params: mixedAnnotations', () => {
            describe('WHEN: mixed annotations params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_MIXED_ANNOTATION_TYPES_PARAMS));

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it renders the footnotes sequentially', () => {
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('1');
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('A test point annotation');
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('2');
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('A test x axis range annotation');
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('3');
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('A test y axis range annotation with the label inside');
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('4');
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('A test x axis reference line annotation');
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('5');
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('A test y axis reference line annotation');
                });
            });
        });
    });

    describe('FOR: Bar Chart', () => {
        describe('GIVEN: Params: required', () => {
            describe('WHEN: required params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_BAR_CHART_PARAMS));

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it renders the chart container with the correct data attributes', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-type')).toBe('bar');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-theme')).toBe('alternate');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-title')).toBe('Example Bar Chart');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-id')).toBe('bar-chart-123');
                });

                test('THEN: it does NOT render optional fields', () => {
                    expect($('figcaption').length).toBe(0);
                    expect($('.ons-chart__download-title').length).toBe(0);
                });

                test('THEN: it includes the Highcharts JSON config', () => {
                    const configScript = $(`script[data-highcharts-config--bar-chart-123]`).html();
                    expect(configScript).toContain('"text":"X Axis Title"');
                    expect(configScript).toContain('"text":"Y Axis Title"');
                });
            });
        });

        describe('GIVEN: Params: legend', () => {
            describe('WHEN: legend is true', () => {
                const $ = cheerio.load(renderComponent('chart', { ...EXAMPLE_BAR_CHART_PARAMS, legend: true }));

                test('THEN: it renders the legend', () => {
                    const configScript = $(`script[data-highcharts-config--bar-chart-123]`).html();
                    expect(configScript).toContain('"legend":{"enabled":true}');
                });
            });

            describe('WHEN: legend is false', () => {
                const $ = cheerio.load(renderComponent('chart', { ...EXAMPLE_BAR_CHART_PARAMS, legend: false }));

                test('THEN: it disables the legend', () => {
                    const configScript = $(`script[data-highcharts-config--bar-chart-123]`).html();
                    expect(configScript).toContain('"legend":{"enabled":false}');
                });
            });

            describe('WHEN: legend is not provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_BAR_CHART_PARAMS));

                test('THEN: it defaults to enabled', () => {
                    const configScript = $(`script[data-highcharts-config--bar-chart-123]`).html();
                    expect(configScript).toContain('"legend":{"enabled":true}');
                });
            });
        });

        describe('GIVEN: Params: xAxis', () => {
            describe('WHEN: xAxis options are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_BAR_CHART_PARAMS));
                const configScript = $(`script[data-highcharts-config--bar-chart-123]`).html();

                test('THEN: it renders the xAxis correctly', () => {
                    expect(configScript).toContain('"text":"X Axis Title"');
                });
            });

            describe('WHEN: xAxis min and max are provided', () => {
                test('THEN: xAxis min and max are ignored', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        chartType: 'bar',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                            min: 1,
                            max: 10,
                            startOnTick: true,
                            endOnTick: true,
                        },
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    expect(configScript).not.toContain('"min":1');
                    expect(configScript).not.toContain('"max":10');
                    expect(configScript).not.toContain('"startOnTick":true');
                    expect(configScript).not.toContain('"endOnTick":true');
                });
            });
        });

        describe('GIVEN: Params: yAxis', () => {
            describe('WHEN: yAxis options are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_BAR_CHART_PARAMS));
                const configScript = $(`script[data-highcharts-config--bar-chart-123]`).html();

                test('THEN: it renders the yAxis correctly', () => {
                    expect(configScript).toContain('"text":"Y Axis Title"');
                });
            });

            describe('WHEN: yAxis min and max are provided', () => {
                test('THEN: yAxis min and max are included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                        },
                        chartType: 'line',
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                            min: 0,
                            max: 100,
                            startOnTick: false,
                            endOnTick: true,
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    expect(configScript).toContain('"min":0');
                    expect(configScript).toContain('"max":100');
                    expect(configScript).toContain('"startOnTick":false');
                    expect(configScript).toContain('"endOnTick":true');
                });
            });

            describe('WHEN: yAxis min and max are not provided', () => {
                test('THEN: yAxis min and max are not included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                        },
                        chartType: 'line',
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                            min: undefined,
                            max: undefined,
                            startOnTick: undefined,
                            endOnTick: undefined,
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    const config = JSON.parse(configScript);

                    expect(config.yAxis.min).toBeUndefined();
                    expect(config.yAxis.max).toBeUndefined();
                    expect(config.yAxis.startOnTick).toBeUndefined();
                    expect(config.yAxis.endOnTick).toBeUndefined();
                });
            });
        });

        describe('GIVEN: Params: percentageHeightDesktop', () => {
            describe('WHEN: percentage height desktop is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_BAR_CHART_WITH_PERCENTAGE_HEIGHT_PARAMS));
                test('THEN: it does not include percentage height desktop', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-percentage-height-desktop')).toBe(undefined);
                });
            });
        });

        describe('GIVEN: Params: percentageHeightMobile', () => {
            describe('WHEN: percentage height mobile is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_BAR_CHART_WITH_PERCENTAGE_HEIGHT_PARAMS));
                test('THEN: it does not include percentage height mobile', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-percentage-height-mobile')).toBe(undefined);
                });
            });
        });

        describe('GIVEN: Params: caption', () => {
            describe('WHEN: caption is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_BAR_CHART_PARAMS,
                        caption: 'This is an example caption for the chart.',
                    }),
                );

                test('THEN: it renders the caption when provided', () => {
                    expect($('figcaption').text()).toBe('This is an example caption for the chart.');
                });
            });
        });

        describe('GIVEN: Params: description', () => {
            describe('WHEN: description is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_BAR_CHART_PARAMS,
                        description: 'An accessible description for screen readers.',
                    }),
                );

                test('THEN: it renders the description for accessibility', () => {
                    expect($('#chart-audio-description-bar-chart-123').text()).toBe('An accessible description for screen readers.');
                });
            });
        });

        describe('GIVEN: Params: download', () => {
            describe('WHEN: download object is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_BAR_CHART_PARAMS,
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

        describe('GIVEN: Params: useStackedLayout', () => {
            describe('WHEN: useStackedLayout is set to true', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_BAR_CHART_PARAMS,
                        useStackedLayout: true,
                    }),
                );

                test('THEN: it includes stacking in the config', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-use-stacked-layout')).toBe('true');
                });

                test('THEN: it renders a bar chart with stacked series', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-type')).toBe('bar');
                });
            });
        });

        describe('GIVEN: Params: annotations', () => {
            describe('WHEN: annotations params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_BAR_CHART_WITH_ANNOTATIONS_PARAMS));
                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it renders the footnotes', () => {
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('1');
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('A test annotation');
                });

                test('THEN: the footnotes are hidden from screen readers', () => {
                    expect($('.ons-chart__annotations-footnotes').attr('aria-hidden')).toBe('true');
                });

                test('THEN: it includes the annotations JSON config', () => {
                    const configScript = $(`script[data-highcharts-annotations--bar-chart-annotations-123]`).html();
                    expect(configScript).toContain('"text":"A test annotation"');
                    expect(configScript).toContain('"point":{"x":2,"y":3}');
                    expect(configScript).toContain('"labelOffsetX":10,"labelOffsetY":-50');
                });
            });
        });

        describe('GIVEN: Params: Series', () => {
            describe('WHEN: chartType is not compatible with line series', () => {
                const params = {
                    ...EXAMPLE_COLUMN_WITH_LINE_CHART_PARAMS,
                    chartType: 'bar',
                };

                const $ = cheerio.load(renderComponent('chart', params));
                const configScript = $('script[data-highcharts-config--column-chart-123]').html();

                test('THEN: it falls back to chartType and does not include "line" series', () => {
                    expect(configScript).not.toContain('"type":"line"');
                    expect(configScript).toContain('"type":"bar"');
                });
            });
        });
    });

    describe('FOR: Column Chart', () => {
        describe('GIVEN: Params: required', () => {
            describe('WHEN: required params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_COLUMN_CHART_PARAMS));

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it renders the chart container with the correct data attributes', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-type')).toBe('column');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-theme')).toBe('alternate');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-title')).toBe('Example Column Chart');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-id')).toBe('column-chart-123');
                });

                test('THEN: it does NOT render optional fields', () => {
                    expect($('figcaption').length).toBe(0);
                    expect($('.ons-chart__download-title').length).toBe(0);
                });

                test('THEN: it includes the Highcharts JSON config', () => {
                    const configScript = $(`script[data-highcharts-config--column-chart-123]`).html();
                    expect(configScript).toContain('"text":"X Axis Title"');
                    expect(configScript).toContain('"text":"Y Axis Title"');
                });
            });
        });

        describe('GIVEN: Params: legend', () => {
            describe('WHEN: legend is true', () => {
                const $ = cheerio.load(renderComponent('chart', { ...EXAMPLE_COLUMN_CHART_PARAMS, legend: true }));

                test('THEN: it renders the legend', () => {
                    const configScript = $(`script[data-highcharts-config--column-chart-123]`).html();
                    expect(configScript).toContain('"legend":{"enabled":true}');
                });
            });

            describe('WHEN: legend is false', () => {
                const $ = cheerio.load(renderComponent('chart', { ...EXAMPLE_COLUMN_CHART_PARAMS, legend: false }));

                test('THEN: it disables the legend', () => {
                    const configScript = $(`script[data-highcharts-config--column-chart-123]`).html();
                    expect(configScript).toContain('"legend":{"enabled":false}');
                });
            });

            describe('WHEN: legend is not provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_COLUMN_CHART_PARAMS));

                test('THEN: it defaults to enabled', () => {
                    const configScript = $(`script[data-highcharts-config--column-chart-123]`).html();
                    expect(configScript).toContain('"legend":{"enabled":true}');
                });
            });
        });

        describe('GIVEN: Params: xAxis', () => {
            describe('WHEN: xAxis options are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_COLUMN_CHART_PARAMS));
                const configScript = $(`script[data-highcharts-config--column-chart-123]`).html();

                test('THEN: it renders the xAxis correctly', () => {
                    expect(configScript).toContain('"text":"X Axis Title"');
                });
            });
        });

        describe('GIVEN: Params: yAxis', () => {
            describe('WHEN: yAxis options are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_COLUMN_CHART_PARAMS));
                const configScript = $(`script[data-highcharts-config--column-chart-123]`).html();

                test('THEN: it renders the yAxis correctly', () => {
                    expect(configScript).toContain('"text":"Y Axis Title"');
                });
            });
            describe('WHEN: yAxis min and max are provided', () => {
                test('THEN: yAxis min and max are included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                        },
                        chartType: 'column',
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                            min: 0,
                            max: 100,
                            startOnTick: false,
                            endOnTick: true,
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    expect(configScript).toContain('"min":0');
                    expect(configScript).toContain('"max":100');
                    expect(configScript).toContain('"startOnTick":false');
                    expect(configScript).toContain('"endOnTick":true');
                });
            });
            describe('WHEN: yAxis min and max are not provided', () => {
                test('THEN: yAxis min and max are not included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                        },
                        chartType: 'column',
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                            min: undefined,
                            max: undefined,
                            startOnTick: undefined,
                            endOnTick: undefined,
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    const config = JSON.parse(configScript);

                    expect(config.yAxis.min).toBeUndefined();
                    expect(config.yAxis.max).toBeUndefined();
                    expect(config.yAxis.startOnTick).toBeUndefined();
                    expect(config.yAxis.endOnTick).toBeUndefined();
                });
            });
        });

        describe('GIVEN: Params: percentageHeightDesktop', () => {
            describe('WHEN: percentage height desktop is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_COLUMN_CHART_PARAMS));
                test('THEN: it includes correct percentage height desktop', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-percentage-height-desktop')).toBe('50');
                });
            });
        });

        describe('GIVEN: Params: percentageHeightMobile', () => {
            describe('WHEN: percentage height mobile is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_COLUMN_CHART_PARAMS));
                test('THEN: it includes correct percentage height mobile', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-percentage-height-mobile')).toBe('120');
                });
            });
        });

        describe('GIVEN: Params: caption', () => {
            describe('WHEN: caption is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_COLUMN_CHART_PARAMS,
                        caption: 'This is an example caption for the chart.',
                    }),
                );

                test('THEN: it renders the caption when provided', () => {
                    expect($('figcaption').text()).toBe('This is an example caption for the chart.');
                });
            });
        });

        describe('GIVEN: Params: description', () => {
            describe('WHEN: description is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_COLUMN_CHART_PARAMS,
                        description: 'An accessible description for screen readers.',
                    }),
                );

                test('THEN: it renders the description for accessibility', () => {
                    expect($('#chart-audio-description-column-chart-123').text()).toBe('An accessible description for screen readers.');
                });
            });
        });

        describe('GIVEN: Params: download', () => {
            describe('WHEN: download object is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_COLUMN_CHART_PARAMS,
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

        describe('GIVEN: Params: useStackedLayout', () => {
            describe('WHEN: Stacked layout is enabled', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_COLUMN_CHART_PARAMS,
                        useStackedLayout: true,
                    }),
                );

                test('THEN: it includes stacking in the config', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-use-stacked-layout')).toBe('true');
                });

                test('THEN: it renders a column chart with stacked series', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-type')).toBe('column');
                });
            });
        });

        describe('GIVEN: Params: annotations', () => {
            describe('WHEN: annotations params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_COLUMN_CHART_WITH_ANNOTATIONS_PARAMS));

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it renders the footnotes', () => {
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('1');
                    expect($('.ons-chart__annotations-footnotes').text()).toContain('A test annotation');
                });

                test('THEN: the footnotes are hidden from screen readers', () => {
                    expect($('.ons-chart__annotations-footnotes').attr('aria-hidden')).toBe('true');
                });

                test('THEN: it includes the annotations JSON config', () => {
                    const configScript = $(`script[data-highcharts-annotations--column-chart-annotations-123]`).html();
                    expect(configScript).toContain('"text":"A test annotation"');
                    expect(configScript).toContain('"point":{"x":11,"y":31.8}');
                    expect(configScript).toContain('"labelOffsetX":10,"labelOffsetY":-50');
                });
            });
        });

        describe('GIVEN: Params: series', () => {
            describe('WHEN: seriesType is line and required params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_COLUMN_WITH_LINE_CHART_PARAMS));
                const configScript = $(`script[data-highcharts-config--column-chart-123]`).html();

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it includes one series of type "column" and another of type "line"', () => {
                    expect(configScript).toContain('"type":"column"');
                    expect(configScript).toContain('"type":"line"');
                });

                test('THEN: it renders the chart container with correct data attributes', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-type')).toBe('column');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-theme')).toBe('alternate');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-title')).toBe('Example Column Chart');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-id')).toBe('column-chart-123');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-custom-reference-line-value')).toBe('10');
                });

                test('THEN: it includes the Highcharts JSON config', () => {
                    expect(configScript).toContain('"text":"X Axis Title"');
                    expect(configScript).toContain('"text":"Y Axis Title"');
                });
            });

            describe('WHEN: seriesType is line and more than one line is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_COLUMN_WITH_LINE_CHART_PARAMS,
                        series: [
                            ...EXAMPLE_COLUMN_WITH_LINE_CHART_PARAMS.series,
                            { name: 'Additional Line', data: [15, 25, 35], type: 'line' },
                            { name: 'Another additional Line', data: [14, 27, 31], type: 'line' },
                        ],
                    }),
                );
                const configScript = $(`script[data-highcharts-config--column-chart-123]`).html();

                test('THEN: it does not include the additional line series', () => {
                    const lineTypeMatches = (configScript.match(/"type":"line"/g) || []).length;
                    expect(lineTypeMatches).toBe(1);
                });
            });

            describe('WHEN: a series item has an invalid type', () => {
                const invalidTypeParams = {
                    ...EXAMPLE_COLUMN_WITH_LINE_CHART_PARAMS,
                    series: [
                        { name: 'Invalid Series', data: [5, 15, 25], type: 'scatter' },
                        { name: 'Valid Line Series', data: [10, 20, 30], type: 'line' },
                    ],
                };

                const $ = cheerio.load(renderComponent('chart', invalidTypeParams));
                const configScript = $(`script[data-highcharts-config--column-chart-123]`).html();

                test('THEN: it defaults non-line series type to the chartType', () => {
                    expect(configScript).not.toContain('"type":"scatter"');
                    expect(configScript).toContain('"type":"column"');
                    expect(configScript).toContain('"type":"line"');
                });
            });
        });
    });

    describe('FOR: Scatter chart', () => {
        describe('GIVEN: Params: required', () => {
            describe('WHEN: required params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_SCATTER_CHART_PARAMS));

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it renders the chart container with correct data attributes', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-type')).toBe('scatter');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-theme')).toBe('primary');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-title')).toBe('Example Scatter Chart');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-id')).toBe('scatter-chart-123');
                });
            });
        });

        describe('GIVEN: Params: xAxis', () => {
            describe('WHEN: xAxis options are provided', () => {
                test('THEN: xAxis min and max are included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        chartType: 'scatter',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                            min: 1,
                            max: 10,
                            startOnTick: true,
                            endOnTick: false,
                        },
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    expect(configScript).toContain('"min":1');
                    expect(configScript).toContain('"max":10');
                    expect(configScript).toContain('"startOnTick":true');
                    expect(configScript).toContain('"endOnTick":false');
                });
            });

            describe('WHEN: xAxis options are not provided', () => {
                test('THEN: xAxis min and max are not included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        chartType: 'scatter',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                            min: undefined,
                            max: undefined,
                            startOnTick: undefined,
                            endOnTick: undefined,
                        },
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    const config = JSON.parse(configScript);

                    expect(config.xAxis.min).toBeUndefined();
                    expect(config.xAxis.max).toBeUndefined();
                    expect(config.xAxis.startOnTick).toBeUndefined();
                    expect(config.xAxis.endOnTick).toBeUndefined();
                });
            });
            describe('WHEN: yAxis options are provided', () => {
                test('THEN: yAxis min and max are included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                        },
                        chartType: 'scatter',
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                            min: 0,
                            max: 100,
                            startOnTick: false,
                            endOnTick: true,
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    expect(configScript).toContain('"min":0');
                    expect(configScript).toContain('"max":100');
                    expect(configScript).toContain('"startOnTick":false');
                    expect(configScript).toContain('"endOnTick":true');
                });
            });

            describe('WHEN: yAxis options are not provided', () => {
                test('THEN: yAxis min and max are not included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                        },
                        chartType: 'scatter',
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                            min: undefined,
                            max: undefined,
                            startOnTick: undefined,
                            endOnTick: undefined,
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    const config = JSON.parse(configScript);

                    expect(config.yAxis.min).toBeUndefined();
                    expect(config.yAxis.max).toBeUndefined();
                    expect(config.yAxis.startOnTick).toBeUndefined();
                    expect(config.yAxis.endOnTick).toBeUndefined();
                });
            });
        });
    });

    describe('FOR: Area Chart', () => {
        describe('GIVEN: Params: required', () => {
            describe('WHEN: required params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_AREA_CHART_PARAMS));
                const configScript = $(`script[data-highcharts-config--area-chart-123]`).html();

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it includes at least one area series', () => {
                    expect(configScript).toContain('"type":"area"');
                });

                test('THEN: it renders the chart container with correct data attributes', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-type')).toBe('area');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-theme')).toBe('primary');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-title')).toBe('Example Area Chart');
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-id')).toBe('area-chart-123');
                });

                test('THEN: it includes the Highcharts JSON config', () => {
                    expect(configScript).toContain('"text":"X Axis Title"');
                    expect(configScript).toContain('"text":"Y Axis Title"');
                });
            });
        });

        describe('GIVEN: Params: legend', () => {
            describe('WHEN: legend is enabled', () => {
                const $ = cheerio.load(renderComponent('chart', { ...EXAMPLE_AREA_CHART_PARAMS, legend: false }));

                test('THEN: it renders the legend', () => {
                    const configScript = $(`script[data-highcharts-config--area-chart-123]`).html();
                    expect(configScript).toContain('"enabled":false');
                });
            });
        });

        describe('GIVEN: Params: caption', () => {
            describe('WHEN: caption is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_AREA_CHART_PARAMS,
                        caption: 'This is an example caption for the chart.',
                    }),
                );

                test('THEN: it renders the caption when provided', () => {
                    expect($('figcaption').text()).toBe('This is an example caption for the chart.');
                });
            });
        });

        describe('GIVEN: Params: description', () => {
            describe('WHEN: description is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_AREA_CHART_PARAMS,
                        description: 'An accessible description for screen readers.',
                    }),
                );

                test('THEN: it renders the description for accessibility', () => {
                    expect($('#chart-audio-description-area-chart-123').text()).toBe('An accessible description for screen readers.');
                });
            });
        });

        describe('GIVEN: Params: download', () => {
            describe('WHEN: download object is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_AREA_CHART_PARAMS,
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

        describe('GIVEN: Params: footnotes', () => {
            describe('WHEN: footnotes are provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_AREA_CHART_PARAMS,
                        footnotes: {
                            title: 'Footnotes',
                            content:
                                '<ol><li>Non-store retailing refers to retailers that do not have a store presence. While the majority is made up of online retailers, it also includes other retailers, such as stalls and markets.</li><li>More data are available in our Retail Sales Index datasets.</li></ol>',
                        },
                    }),
                );
                test('THEN: it renders the footnotes', () => {
                    expect($('#footnotes--area-chart-123').length).toBe(1);
                    expect($('#footnotes--area-chart-123').find('ol').length).toBe(1);
                    expect($('#footnotes--area-chart-123').text()).toContain('Footnotes');
                });
            });
        });

        describe('GIVEN: Params: yAxis', () => {
            describe('WHEN: yAxis options are provided', () => {
                test('THEN: yAxis min and max are included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                        },
                        chartType: 'area',
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                            min: 0,
                            max: 100,
                            startOnTick: false,
                            endOnTick: true,
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    expect(configScript).toContain('"min":0');
                    expect(configScript).toContain('"max":100');
                    expect(configScript).toContain('"startOnTick":false');
                    expect(configScript).toContain('"endOnTick":true');
                });
            });
            describe('WHEN: yAxis options are not provided', () => {
                test('THEN: yAxis min and max are not included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                        },
                        chartType: 'area',
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                            min: undefined,
                            max: undefined,
                            startOnTick: undefined,
                            endOnTick: undefined,
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    const config = JSON.parse(configScript);

                    expect(config.yAxis.min).toBeUndefined();
                    expect(config.yAxis.max).toBeUndefined();
                    expect(config.yAxis.startOnTick).toBeUndefined();
                    expect(config.yAxis.endOnTick).toBeUndefined();
                });
            });
        });
    });

    describe('FOR: Boxplot Chart', () => {
        describe('GIVEN: Params: required', () => {
            describe('WHEN: required params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_BOXPLOT_CHART_PARAMS));
                const configScript = $(`script[data-highcharts-config--boxplot-chart-123]`).html();

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it includes at least one boxplot series', () => {
                    expect(configScript).toContain('"type":"boxplot"');
                });

                test('THEN: it renders the chart container with correct data attributes', () => {
                    const chartContainer = $('[data-highcharts-base-chart]');
                    expect(chartContainer.attr('data-highcharts-type')).toBe('boxplot');
                    expect(chartContainer.attr('data-highcharts-theme')).toBe('primary');
                    expect(chartContainer.attr('data-highcharts-title')).toBe('Example Boxplot Chart');
                    expect(chartContainer.attr('data-highcharts-id')).toBe('boxplot-chart-123');
                });

                test('THEN: it includes the Highcharts JSON config', () => {
                    expect(configScript).toContain('"text":"Years"');
                    expect(configScript).toContain('"text":"Percentage of GDP"');
                });
            });
        });

        describe('GIVEN: Params: legend', () => {
            describe('WHEN: both labels are provided and legend is enabled', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_BOXPLOT_CHART_PARAMS,
                        estimateLineLabel: 'Estimated value',
                        uncertaintyRangeLabel: '95% Confidence Interval',
                        legend: true,
                    }),
                );

                test('THEN: it renders the boxplot legend container', () => {
                    const legendContainer = $('.ons-chart__boxplot-legend');
                    expect(legendContainer.length).toBe(1);
                });

                test('THEN: it includes the estimate line legend item', () => {
                    const estimateLabel = $('.ons-chart__boxplot-legend-label').filter((_, el) => $(el).text().includes('Estimated value'));
                    expect(estimateLabel.length).toBe(1);

                    const estimateSwatch = $('.ons-chart__boxplot-legend-item--estimate');
                    expect(estimateSwatch.length).toBe(1);
                });

                test('THEN: it includes the uncertainty range legend item', () => {
                    const uncertaintyLabel = $('.ons-chart__boxplot-legend-label').filter((_, el) =>
                        $(el).text().includes('95% Confidence Interval'),
                    );
                    expect(uncertaintyLabel.length).toBe(1);

                    const uncertaintySwatch = $('.ons-chart__boxplot-legend-item--uncertainty');
                    expect(uncertaintySwatch.length).toBe(1);
                });
            });

            describe('WHEN: only estimateLineLabel is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_BOXPLOT_CHART_PARAMS,
                        estimateLineLabel: 'Estimated only',
                        legend: true,
                    }),
                );

                test('THEN: it renders only the estimate legend item', () => {
                    expect($('.ons-chart__boxplot-legend-item--estimate').length).toBe(1);
                    expect($('.ons-chart__boxplot-legend-item--uncertainty').length).toBe(0);
                });
            });
            describe('WHEN: only uncertaintyRangeLabel is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_BOXPLOT_CHART_PARAMS,
                        uncertaintyRangeLabel: 'Uncertainty only',
                        legend: true,
                    }),
                );
                test('THEN: it renders only the uncertainty legend item', () => {
                    expect($('.ons-chart__boxplot-legend-item--estimate').length).toBe(0);
                    expect($('.ons-chart__boxplot-legend-item--uncertainty').length).toBe(1);
                });
            });
            describe('WHEN: estimate and uncertainty labels are provided but legend is false', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_BOXPLOT_CHART_PARAMS,
                        estimateLineLabel: 'Estimated value',
                        uncertaintyRangeLabel: '95% Confidence Interval',
                        legend: false,
                    }),
                );

                test('THEN: it does NOT render the boxplot legend container', () => {
                    expect($('.ons-chart__boxplot-legend').length).toBe(0);
                });

                test('THEN: it does NOT render any custom legend items', () => {
                    expect($('.ons-chart__boxplot-legend-item--estimate').length).toBe(0);
                    expect($('.ons-chart__boxplot-legend-item--uncertainty').length).toBe(0);
                });
            });
        });

        describe('GIVEN: Params: description', () => {
            describe('WHEN: description is provided', () => {
                const accessibleDescription = 'An accessible description for screen readers.';
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_BOXPLOT_CHART_PARAMS,
                        description: accessibleDescription,
                    }),
                );

                test('THEN: it renders the description for accessibility', () => {
                    expect($('#chart-audio-description-boxplot-chart-123').text()).toBe(accessibleDescription);
                });
            });
        });

        describe('GIVEN: Params: estimateLineLabel', () => {
            describe('WHEN: estimateLineLabel is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_BOXPLOT_CHART_PARAMS,
                        estimateLineLabel: 'Estimated value',
                    }),
                );

                test('THEN: it sets the estimate line label as a data attribute', () => {
                    const baseChart = $('[data-highcharts-base-chart]');
                    expect(baseChart.attr('data-highcharts-estimate-line-label')).toBe('Estimated value');
                });
            });
        });

        describe('GIVEN: Params: uncertaintyRangeLabel', () => {
            describe('WHEN: uncertaintyRangeLabel is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_BOXPLOT_CHART_PARAMS,
                        uncertaintyRangeLabel: '95% Confidence Interval',
                    }),
                );

                test('THEN: it sets the uncertainty range label as a data attribute', () => {
                    const baseChart = $('[data-highcharts-base-chart]');
                    expect(baseChart.attr('data-highcharts-uncertainty-range-label')).toBe('95% Confidence Interval');
                });
            });
        });

        describe('GIVEN: Params: yAxis', () => {
            describe('WHEN: yAxis min and max are provided', () => {
                test('THEN: yAxis min and max are included in config ', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                        },
                        chartType: 'boxplot',
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                            min: 0,
                            max: 100,
                            startOnTick: false,
                            endOnTick: true,
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    expect(configScript).toContain('"min":0');
                    expect(configScript).toContain('"max":100');
                    expect(configScript).toContain('"startOnTick":false');
                    expect(configScript).toContain('"endOnTick":true');
                });
            });
            describe('WHEN: yAxis min and max are not provided', () => {
                test('THEN: yAxis min and max are not included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                        },
                        chartType: 'boxplot',
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                            min: undefined,
                            max: undefined,
                            startOnTick: undefined,
                            endOnTick: undefined,
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    const config = JSON.parse(configScript);

                    expect(config.yAxis.min).toBeUndefined();
                    expect(config.yAxis.max).toBeUndefined();
                    expect(config.yAxis.startOnTick).toBeUndefined();
                    expect(config.yAxis.endOnTick).toBeUndefined();
                });
            });
        });
    });

    describe('FOR: Column Range Chart', () => {
        describe('GIVEN: Params: required', () => {
            describe('WHEN: required params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_COLUMN_RANGE_CHART_PARAMS));
                const configScript = $(`script[data-highcharts-config--column-range-chart-123]`).html();

                test('THEN: it passes jest-axe accessibility checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it renders with correct chart metadata attributes', () => {
                    const baseChart = $('[data-highcharts-base-chart]');
                    expect(baseChart.attr('data-highcharts-type')).toBe('columnrange');
                    expect(baseChart.attr('data-highcharts-theme')).toBe('primary');
                    expect(baseChart.attr('data-highcharts-title')).toBe(
                        'Food stores showed a strong rise on the month, while non-food stores fell',
                    );
                    expect(baseChart.attr('data-highcharts-id')).toBe('column-range-chart-123');
                });

                test('THEN: it includes columnrange and scatter series types', () => {
                    expect(configScript).toContain('"type":"columnrange"');
                    expect(configScript).toContain('"type":"scatter"');
                });
            });
        });

        describe('GIVEN: Params: yAxis', () => {
            describe('WHEN: yAxis min and max are provided', () => {
                test('THEN: yAxis min and max are included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                        },
                        chartType: 'columnrange',
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                            min: 0,
                            max: 100,
                            startOnTick: false,
                            endOnTick: true,
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    expect(configScript).toContain('"min":0');
                    expect(configScript).toContain('"max":100');
                    expect(configScript).toContain('"startOnTick":false');
                    expect(configScript).toContain('"endOnTick":true');
                });
            });
            describe('WHEN: yAxis min and max are not provided', () => {
                test('THEN: yAxis min and max are not included in config', () => {
                    const params = {
                        id: 'test-chart',
                        title: 'Test Chart',
                        xAxis: {
                            title: 'X Axis Title',
                            categories: ['A', 'B', 'C'],
                            type: 'linear',
                            labelFormat: '{value}',
                        },
                        chartType: 'columnrange',
                        yAxis: {
                            title: 'Y Axis Title',
                            labelFormat: '{value}',
                            min: undefined,
                            max: undefined,
                            startOnTick: undefined,
                            endOnTick: undefined,
                        },
                        series: [],
                    };

                    const $ = cheerio.load(renderComponent('chart', params));
                    const configScript = $(`script[data-highcharts-config--${params.id}]`).html();

                    const config = JSON.parse(configScript);

                    expect(config.yAxis.min).toBeUndefined();
                    expect(config.yAxis.max).toBeUndefined();
                    expect(config.yAxis.startOnTick).toBeUndefined();
                    expect(config.yAxis.endOnTick).toBeUndefined();
                });
            });
        });
    });

    describe('FOR: Invalid Chart', () => {
        describe('GIVEN: Params: chartType', () => {
            describe('WHEN: an invalid chart type is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_INVALID_CHART_PARAMS));

                test('THEN: it does not render the chart', () => {
                    expect($('[data-highcharts-chart]').length).toBe(0);
                });

                test('THEN: it renders the error message', () => {
                    expect($('[data-invalid-chart-type]').text().trim()).toBe('"invalid" - chart type is not supported');
                });

                test('THEN: it does not include the Highcharts JSON config', () => {
                    const configScript = $(`script[data-highcharts-config--invalid-chart-123]`).html();
                    expect(configScript).toBeNull();
                });

                test('THEN: it still renders the title', () => {
                    expect($('.ons-chart__title').text()).toBe('Example Invalid Chart');
                });

                test('THEN: it still renders the subtitle', () => {
                    expect($('.ons-chart__subtitle').text()).toBe('A sample subtitle');
                });

                test('THEN: it still renders the description', () => {
                    expect($('#chart-audio-description-invalid-chart-123').text()).toBe('A detailed description');
                });

                test('THEN: it still renders the caption', () => {
                    expect($('figcaption').text()).toBe('A detailed caption');
                });

                test('THEN: it still renders the download', () => {
                    expect($('.ons-chart__download-title').text()).toBe('Download this chart');
                });
            });
        });
    });

    describe('FOR: Iframe Chart', () => {
        describe('GIVEN: Params: required', () => {
            describe('WHEN: iframeUrl param is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_IFRAME_CHART_PARAMS));

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it renders the iframe', () => {
                    expect($('.ons-chart__iframe-wrapper').length).toBe(1);
                });

                test('THEN: the Highcharts config is not included', () => {
                    const configScript = $(`script[data-highcharts-config--iframe-chart-123]`).html();
                    expect(configScript).toBeNull();
                });
            });
        });

        describe('GIVEN: Params: theme', () => {
            describe('WHEN: theme is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_IFRAME_CHART_PARAMS,
                        theme: 'secondary',
                    }),
                );

                test('THEN: the theme parameter is ignored', () => {
                    expect($('[data-highcharts-theme]').length).toBe(0);
                });
            });
        });

        describe('GIVEN: Params: percentageHeightDesktop', () => {
            describe('WHEN: percentageHeightDesktop is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_IFRAME_CHART_PARAMS,
                        percentageHeightDesktop: 50,
                    }),
                );

                test('THEN: the percentageHeightDesktop parameter is ignored', () => {
                    expect($('[data-highcharts-percentage-height-desktop]').length).toBe(0);
                });
            });
        });

        describe('GIVEN: Params: percentageHeightMobile', () => {
            describe('WHEN: percentageHeightMobile is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_IFRAME_CHART_PARAMS,
                        percentageHeightMobile: 10,
                    }),
                );

                test('THEN: the percentageHeightMobile parameter is ignored', () => {
                    expect($('[data-highcharts-percentage-height-mobile]').length).toBe(0);
                });
            });
        });

        describe('GIVEN: Params: tickInterval', () => {
            describe('WHEN: tickIntervalDesktop and tickIntervalMobile are provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_IFRAME_CHART_PARAMS,
                        xAxis: { tickIntervalDesktop: 10, tickIntervalMobile: 5 },
                        yAxis: { tickIntervalDesktop: 10, tickIntervalMobile: 5 },
                    }),
                );

                test('THEN: the tickIntervalDesktop and tickIntervalMobile parameters are ignored', () => {
                    expect($('[data-highcharts-x-axis-tick-interval-desktop]').length).toBe(0);
                    expect($('[data-highcharts-x-axis-tick-interval-mobile]').length).toBe(0);
                    expect($('[data-highcharts-y-axis-tick-interval-desktop]').length).toBe(0);
                    expect($('[data-highcharts-y-axis-tick-interval-mobile]').length).toBe(0);
                });
            });
        });

        describe('GIVEN: Params: estimateLineLabel', () => {
            describe('WHEN: estimateLineLabel is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_IFRAME_CHART_PARAMS,
                        estimateLineLabel: 'Estimated value',
                    }),
                );

                test('THEN: the estimateLineLabel parameter is ignored', () => {
                    expect($('[data-highcharts-estimate-line-label]').length).toBe(0);
                });
            });
        });

        describe('GIVEN: Params: uncertaintyRangeLabel', () => {
            describe('WHEN: uncertaintyRangeLabel is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_IFRAME_CHART_PARAMS,
                        uncertaintyRangeLabel: '95% Confidence Interval',
                    }),
                );

                test('THEN: the uncertaintyRangeLabel parameter is ignored', () => {
                    expect($('[data-highcharts-uncertainty-range-label]').length).toBe(0);
                });
            });
        });

        describe('GIVEN: Params: customReferenceLineValue', () => {
            describe('WHEN: customReferenceLineValue is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_IFRAME_CHART_PARAMS,
                        yAxis: { customReferenceLineValue: 10 },
                    }),
                );

                test('THEN: the customReferenceLineValue parameter is ignored', () => {
                    expect($('[data-highcharts-custom-reference-line-value]').length).toBe(0);
                });
            });
        });

        describe('GIVEN: Params: chartType', () => {
            describe('WHEN: chartType is boxplot and legend params are provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_IFRAME_CHART_PARAMS,
                        chartType: 'boxplot',
                        legend: true,
                        estimateLineLabel: 'Estimated value',
                        uncertaintyRangeLabel: '95% Confidence Interval',
                    }),
                );

                test('THEN: the boxplot legend is not rendered', () => {
                    expect($('.ons-chart__boxplot-legend').length).toBe(0);
                });
            });
        });

        describe('GIVEN: Params: invalidChartType', () => {
            describe('WHEN: an invalid chart type is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_IFRAME_CHART_PARAMS,
                        chartType: 'foobar',
                    }),
                );

                test('THEN: the invalid chart type is ignored', () => {
                    expect($('[data-invalid-chart-type]').length).toBe(0);
                });
            });
        });

        describe('GIVEN: Params: annotations', () => {
            describe('WHEN: annotations, rangeAnnotations and referenceLineAnnotations are provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_IFRAME_CHART_PARAMS,
                        annotations: [{ text: 'A test point annotation', point: { x: 2, y: 3 } }],
                        rangeAnnotations: [{ text: 'Range annotation', range: { axisValue1: 10, axisValue2: 15 }, axis: 'x' }],
                        referenceLineAnnotations: [{ text: 'Reference line', value: 34, axis: 'x' }],
                    }),
                );

                test('THEN: annotations footnotes are not rendered', () => {
                    expect($('[data-annotations-footnotes]').length).toBe(0);
                });

                test('THEN: annotation scripts are not rendered', () => {
                    expect($('[data-highcharts-annotations--iframe-chart-123]').length).toBe(0);
                    expect($('[data-highcharts-range-annotations--iframe-chart-123]').length).toBe(0);
                    expect($('[data-highcharts-reference-line-annotations--iframe-chart-123]').length).toBe(0);
                });
            });
        });

        describe('GIVEN: Params: iframeAspectRatio', () => {
            describe('WHEN: iframeAspectRatio is not set', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_IFRAME_CHART_PARAMS));

                test('THEN: it defaults to 16-9', () => {
                    expect($('.ons-chart__iframe').hasClass('ons-chart__iframe--16-9')).toBe(true);
                });
            });

            describe('WHEN: iframeAspectRatio is unsupported', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_IFRAME_CHART_PARAMS,
                        iframeAspectRatio: '16-10',
                    }),
                );

                test('THEN: it defaults to 16-9', () => {
                    expect($('.ons-chart__iframe').hasClass('ons-chart__iframe--16-9')).toBe(true);
                });
            });

            describe('WHEN: iframeAspectRatio is supported', () => {
                const aspectRatio = '21-9';
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_IFRAME_CHART_PARAMS,
                        iframeAspectRatio: aspectRatio,
                    }),
                );

                test('THEN: it applies the aspect ratio class', () => {
                    expect($('.ons-chart__iframe').hasClass(`ons-chart__iframe--${aspectRatio}`)).toBe(true);
                });
            });
        });

        describe('GIVEN: Params: fallbackImageUrl', () => {
            describe('WHEN: fallbackImageUrl is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_IFRAME_CHART_PARAMS,
                        fallbackImageUrl: '/img/small/line-chart-screenshot.png',
                    }),
                );

                test('THEN: the iframe wrapper is hidden when JavaScript is disabled', () => {
                    expect($('.ons-chart__iframe-wrapper').attr('class')).toContain('ons-chart__non-js-hide');
                });
            });
        });
    });
});
