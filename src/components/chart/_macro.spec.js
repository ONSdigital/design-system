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
    EXAMPLE_INVALID_CHART_PARAMS,
    EXAMPLE_LINE_CHART_WITH_RANGE_ANNOTATION_ON_X_AXIS_PARAMS,
    EXAMPLE_LINE_CHART_WITH_RANGE_ANNOTATION_ON_Y_AXIS_WITH_LABEL_WIDTH_PARAMS,
    EXAMPLE_LINE_CHART_WITH_RANGE_ANNOTATION_WITH_LABEL_INSIDE_PARAMS,
    EXAMPLE_LINE_CHART_WITH_MIXED_ANNOTATION_TYPES_PARAMS,
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
            });
        });

        describe('GIVEN: Params: Theme', () => {
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

        describe('GIVEN: Params: Heading Level', () => {
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

        describe('GIVEN: Params: Tick Interval', () => {
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

        describe('GIVEN: Params: Config', () => {
            describe('WHEN: config params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_CONFIG_PARAMS));
                const configScript = $(`script[data-highcharts-config--chart-456]`).html();

                test('THEN: it renders the legend when enabled', () => {
                    expect(configScript).toContain('"enabled":true');
                });

                test('THEN: it includes correct xAxis properties', () => {
                    expect(configScript).toContain('"text":"X Axis Label"');
                    expect(configScript).toContain('"categories":["A","B","C"]');
                    expect(configScript).toContain('"type":"linear"');
                });

                test('THEN: it includes correct yAxis properties', () => {
                    expect(configScript).toContain('"text":"Y Axis Label"');
                    expect(configScript).toContain('"labels":{"format":"{value:,.f}"}');
                });

                test('THEN: it includes correct series data', () => {
                    expect(configScript).toContain('"name":"Category 1"');
                    expect(configScript).toContain('"data":[5,15,25]');
                    expect(configScript).toContain('"name":"Category 2"');
                    expect(configScript).toContain('"data":[10,20,30]');
                    expect(configScript).toContain('"connectNulls":true');
                    expect(configScript).toContain('"marker":{"enabled":true}');
                    expect(configScript).toContain('"dataLabels":{"enabled":true}');
                });
            });
        });

        describe('GIVEN: Params: Percentage Height Desktop', () => {
            describe('WHEN: percentage height desktop is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_CONFIG_PARAMS));
                test('THEN: it includes correct percentage height desktop', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-percentage-height-desktop')).toBe('50');
                });
            });
        });

        describe('GIVEN: Params: Percentage Height Mobile', () => {
            describe('WHEN: percentage height mobile is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_CONFIG_PARAMS));
                test('THEN: it includes correct percentage height mobile', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-percentage-height-mobile')).toBe('120');
                });
            });
        });

        describe('GIVEN: Params: Caption', () => {
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

        describe('GIVEN: Params: Description', () => {
            describe('WHEN: description is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_LINE_CHART_REQUIRED_PARAMS,
                        description: 'An accessible description for screen readers.',
                    }),
                );

                test('THEN: it renders the description for accessibility', () => {
                    expect($('.ons-u-vh').text()).toBe('An accessible description for screen readers.');
                });
            });
        });

        describe('GIVEN: Params: Download', () => {
            describe('WHEN: download object are provided', () => {
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

        describe('GIVEN: Params: Legend', () => {
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
                test('THEN: it renders the legend', () => {
                    const configScript = $(`script[data-highcharts-config--line-chart-legend-tests-123]`).html();
                    expect(configScript).toContain('"legend":{"enabled":true}');
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

        describe('GIVEN: Params: Config', () => {
            describe('WHEN: config params are provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_BAR_CHART_PARAMS,
                        legend: true,
                    }),
                );

                test('THEN: it renders the legend when enabled', () => {
                    const configScript = $(`script[data-highcharts-config--bar-chart-123]`).html();
                    expect(configScript).toContain('"enabled":true');
                });

                test('THEN: it includes correct xAxis and yAxis titles', () => {
                    const configScript = $(`script[data-highcharts-config--bar-chart-123]`).html();
                    expect(configScript).toContain('"text":"X Axis Title"');
                    expect(configScript).toContain('"text":"Y Axis Title"');
                });
            });
        });

        describe('GIVEN: Params: Percentage Height Desktop', () => {
            describe('WHEN: percentage height desktop is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_BAR_CHART_WITH_PERCENTAGE_HEIGHT_PARAMS));
                test('THEN: it does not include percentage height desktop', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-percentage-height-desktop')).toBe(undefined);
                });
            });
        });

        describe('GIVEN: Params: Percentage Height Mobile', () => {
            describe('WHEN: percentage height mobile is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_BAR_CHART_WITH_PERCENTAGE_HEIGHT_PARAMS));
                test('THEN: it does not include percentage height mobile', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-percentage-height-mobile')).toBe(undefined);
                });
            });
        });

        describe('GIVEN: Params: Caption', () => {
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

        describe('GIVEN: Params: Description', () => {
            describe('WHEN: description is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_BAR_CHART_PARAMS,
                        description: 'An accessible description for screen readers.',
                    }),
                );

                test('THEN: it renders the description for accessibility', () => {
                    expect($('.ons-u-vh').text()).toBe('An accessible description for screen readers.');
                });
            });
        });

        describe('GIVEN: Params: Download', () => {
            describe('WHEN: download object are provided', () => {
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

        describe('GIVEN: Stacked Bar Chart', () => {
            describe('WHEN: Stacked layout is enabled', () => {
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

        describe('GIVEN: Params: Config', () => {
            describe('WHEN: config params are provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_COLUMN_CHART_PARAMS,
                        legend: true,
                    }),
                );

                test('THEN: it renders the legend when enabled', () => {
                    const configScript = $(`script[data-highcharts-config--column-chart-123]`).html();
                    expect(configScript).toContain('"enabled":true');
                });

                test('THEN: it includes correct xAxis and yAxis titles', () => {
                    const configScript = $(`script[data-highcharts-config--column-chart-123]`).html();
                    expect(configScript).toContain('"text":"X Axis Title"');
                    expect(configScript).toContain('"text":"Y Axis Title"');
                });
            });
        });

        describe('GIVEN: Params: Percentage Height Desktop', () => {
            describe('WHEN: percentage height desktop is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_COLUMN_CHART_PARAMS));
                test('THEN: it includes correct percentage height desktop', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-percentage-height-desktop')).toBe('50');
                });
            });
        });

        describe('GIVEN: Params: Percentage Height Mobile', () => {
            describe('WHEN: percentage height mobile is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_COLUMN_CHART_PARAMS));
                test('THEN: it includes correct percentage height mobile', () => {
                    expect($('[data-highcharts-base-chart]').attr('data-highcharts-percentage-height-mobile')).toBe('120');
                });
            });
        });

        describe('GIVEN: Params: Caption', () => {
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

        describe('GIVEN: Params: Description', () => {
            describe('WHEN: description is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_COLUMN_CHART_PARAMS,
                        description: 'An accessible description for screen readers.',
                    }),
                );

                test('THEN: it renders the description for accessibility', () => {
                    expect($('.ons-u-vh').text()).toBe('An accessible description for screen readers.');
                });
            });
        });

        describe('GIVEN: Params: Download', () => {
            describe('WHEN: download object are provided', () => {
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

        describe('GIVEN: Stacked Column Chart', () => {
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
    });

    describe('FOR: Line chart with annotations', () => {
        describe('GIVEN: Params: Annotations', () => {
            describe('WHEN: annotations params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_ANNOTATIONS_PARAMS));

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it renders the footnotes', () => {
                    expect($('.ons-chart__footnotes').text()).toContain('1');
                    expect($('.ons-chart__footnotes').text()).toContain('A test annotation');
                    expect($('.ons-chart__footnotes').text()).toContain('2');
                    expect($('.ons-chart__footnotes').text()).toContain('Another test annotation');
                });

                test('THEN: the footnotes are hidden from screen readers', () => {
                    expect($('.ons-chart__footnotes').attr('aria-hidden')).toBe('true');
                });

                test('THEN: it includes the Annotations JSON config', () => {
                    const configScript = $(`script[data-highcharts-annotations--line-chart-annotations-123]`).html();
                    expect(configScript).toContain('"text":"A test annotation"');
                    expect(configScript).toContain('"point":{"x":10,"y":1.3}');
                    expect(configScript).toContain('"labelOffsetX":10,"labelOffsetY":-50');
                });
            });
        });
    });

    describe('FOR: Bar chart with annotations', () => {
        describe('GIVEN: Params: Annotations', () => {
            describe('WHEN: annotations params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_BAR_CHART_WITH_ANNOTATIONS_PARAMS));
                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it renders the footnotes', () => {
                    expect($('.ons-chart__footnotes').text()).toContain('1');
                    expect($('.ons-chart__footnotes').text()).toContain('A test annotation');
                });

                test('THEN: the footnotes are hidden from screen readers', () => {
                    expect($('.ons-chart__footnotes').attr('aria-hidden')).toBe('true');
                });

                test('THEN: it includes the Annotations JSON config', () => {
                    const configScript = $(`script[data-highcharts-annotations--bar-chart-annotations-123]`).html();
                    expect(configScript).toContain('"text":"A test annotation"');
                    expect(configScript).toContain('"point":{"x":2,"y":3}');
                    expect(configScript).toContain('"labelOffsetX":10,"labelOffsetY":-50');
                });
            });
        });
    });

    describe('FOR: Column chart with annotations', () => {
        describe('GIVEN: Params: Annotations', () => {
            describe('WHEN: annotations params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_COLUMN_CHART_WITH_ANNOTATIONS_PARAMS));

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it renders the footnotes', () => {
                    expect($('.ons-chart__footnotes').text()).toContain('1');
                    expect($('.ons-chart__footnotes').text()).toContain('A test annotation');
                });

                test('THEN: the footnotes are hidden from screen readers', () => {
                    expect($('.ons-chart__footnotes').attr('aria-hidden')).toBe('true');
                });

                test('THEN: it includes the Annotations JSON config', () => {
                    const configScript = $(`script[data-highcharts-annotations--column-chart-annotations-123]`).html();
                    expect(configScript).toContain('"text":"A test annotation"');
                    expect(configScript).toContain('"point":{"x":11,"y":31.8}');
                    expect(configScript).toContain('"labelOffsetX":10,"labelOffsetY":-50');
                });
            });
        });
    });

    describe('FOR: Column Chart with Line', () => {
        describe('GIVEN: Params: required', () => {
            describe('WHEN: required params are provided', () => {
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
                });

                test('THEN: it includes the Highcharts JSON config', () => {
                    expect(configScript).toContain('"text":"X Axis Title"');
                    expect(configScript).toContain('"text":"Y Axis Title"');
                });
            });
        });

        describe('GIVEN: Params: Legend', () => {
            describe('WHEN: legend is enabled', () => {
                const $ = cheerio.load(renderComponent('chart', { ...EXAMPLE_COLUMN_WITH_LINE_CHART_PARAMS, legend: false }));

                test('THEN: it renders the legend', () => {
                    const configScript = $(`script[data-highcharts-config--column-chart-123]`).html();
                    expect(configScript).toContain('"enabled":false');
                });
            });
        });

        describe('GIVEN: Params: Caption', () => {
            describe('WHEN: caption is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_COLUMN_WITH_LINE_CHART_PARAMS,
                        caption: 'This is an example caption for the chart.',
                    }),
                );

                test('THEN: it renders the caption when provided', () => {
                    expect($('figcaption').text()).toBe('This is an example caption for the chart.');
                });
            });
        });

        describe('GIVEN: Params: Description', () => {
            describe('WHEN: description is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_COLUMN_WITH_LINE_CHART_PARAMS,
                        description: 'An accessible description for screen readers.',
                    }),
                );

                test('THEN: it renders the description for accessibility', () => {
                    expect($('.ons-u-vh').text()).toBe('An accessible description for screen readers.');
                });
            });
        });

        describe('GIVEN: Params: Download', () => {
            describe('WHEN: download object is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_COLUMN_WITH_LINE_CHART_PARAMS,
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

        describe('GIVEN: Params: Series: Type', () => {
            describe('WHEN: a series has an invalid type', () => {
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

        describe('GIVEN: Params: ChartType', () => {
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

        describe('GIVEN: Params: Legend', () => {
            describe('WHEN: legend is enabled', () => {
                const $ = cheerio.load(renderComponent('chart', { ...EXAMPLE_AREA_CHART_PARAMS, legend: false }));

                test('THEN: it renders the legend', () => {
                    const configScript = $(`script[data-highcharts-config--area-chart-123]`).html();
                    expect(configScript).toContain('"enabled":false');
                });
            });
        });

        describe('GIVEN: Params: Caption', () => {
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

        describe('GIVEN: Params: Description', () => {
            describe('WHEN: description is provided', () => {
                const $ = cheerio.load(
                    renderComponent('chart', {
                        ...EXAMPLE_AREA_CHART_PARAMS,
                        description: 'An accessible description for screen readers.',
                    }),
                );

                test('THEN: it renders the description for accessibility', () => {
                    expect($('.ons-u-vh').text()).toBe('An accessible description for screen readers.');
                });
            });
        });

        describe('GIVEN: Params: Download', () => {
            describe('WHEN: download object are provided', () => {
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
    });

    describe('FOR: Invalid Chart', () => {
        describe('GIVEN: Invalid chart type', () => {
            describe('WHEN: an invalid chart type is provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_INVALID_CHART_PARAMS));

                test('THEN: it does not render the chart', () => {
                    expect($('[data-highcharts-chart]').length).toBe(0);
                });

                test('THEN: it renders the error message', () => {
                    expect($('[data-invalid-chart-type]').text()).toBe('Chart type "invalid" is not supported');
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
                    expect($('.ons-u-vh').text()).toBe('A detailed description');
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

    describe('FOR: Line chart with range annotation on the x axis', () => {
        describe('GIVEN: Params: Range annotations', () => {
            describe('WHEN: range annotations params are provided', () => {
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
        });
    });

    describe('FOR: Line chart with range annotation on the y axis with label width', () => {
        describe('GIVEN: Params: Range annotations', () => {
            describe('WHEN: range annotations params are provided', () => {
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
        });
    });

    describe('FOR: Line chart with range annotation with the label inside', () => {
        describe('GIVEN: Params: Range annotations', () => {
            describe('WHEN: range annotations params are provided', () => {
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
    });

    describe('FOR: Line chart with mixed annotation types', () => {
        describe('GIVEN: Params: Mixed annotations', () => {
            describe('WHEN: mixed annotations params are provided', () => {
                const $ = cheerio.load(renderComponent('chart', EXAMPLE_LINE_CHART_WITH_MIXED_ANNOTATION_TYPES_PARAMS));

                test('THEN: it passes jest-axe checks', async () => {
                    const results = await axe($.html());
                    expect(results).toHaveNoViolations();
                });

                test('THEN: it renders the footnotes sequentially', () => {
                    expect($('.ons-chart__footnotes').text()).toContain('1');
                    expect($('.ons-chart__footnotes').text()).toContain('A test point annotation');
                    expect($('.ons-chart__footnotes').text()).toContain('2');
                    expect($('.ons-chart__footnotes').text()).toContain('A test x axis range annotation');
                    expect($('.ons-chart__footnotes').text()).toContain('3');
                    expect($('.ons-chart__footnotes').text()).toContain('A test y axis range annotation with the label inside');
                });
            });
        });
    });
});
