import Highcharts from 'highcharts';
import 'highcharts/modules/accessibility';
import 'highcharts/modules/annotations';
import 'highcharts/highcharts-more';

import CommonChartOptions from './common-chart-options';
import SpecificChartOptions from './specific-chart-options';
import LineChart from './line-chart';
import BarChart from './bar-chart';
import ColumnChart from './column-chart';
import ScatterChart from './scatter-chart';
import AnnotationsOptions from './annotations-options';
import AreaChart from './area-chart';
import ColumnRangeChart from './columnrange-chart';

class HighchartsBaseChart {
    static selector() {
        return '[data-highcharts-base-chart]';
    }

    constructor(node) {
        this.node = node;
        this.chartType = this.node.dataset.highchartsType;
        this.theme = this.node.dataset.highchartsTheme;
        const chartNode = this.node.querySelector('[data-highcharts-chart]');
        if (!chartNode) {
            console.error('No chart node found');
            return;
        }
        this.id = this.node.dataset.highchartsId;
        this.useStackedLayout = this.node.hasAttribute('data-highcharts-use-stacked-layout');
        this.config = JSON.parse(this.node.querySelector(`[data-highcharts-config--${this.id}]`).textContent);
        if (this.node.querySelector(`[data-highcharts-annotations--${this.id}]`)) {
            const annotations = JSON.parse(this.node.querySelector(`[data-highcharts-annotations--${this.id}]`).textContent);
            this.annotationsOptions = new AnnotationsOptions(annotations);
        }
        this.percentageHeightDesktop = this.node.dataset.highchartsPercentageHeightDesktop;
        this.percentageHeightMobile = this.node.dataset.highchartsPercentageHeightMobile;
        this.xAxisTickIntervalMobile = parseInt(this.node.dataset.highchartsXAxisTickIntervalMobile);
        this.xAxisTickIntervalDesktop = parseInt(this.node.dataset.highchartsXAxisTickIntervalDesktop);
        this.yAxisTickIntervalMobile = parseInt(this.node.dataset.highchartsYAxisTickIntervalMobile);
        this.yAxisTickIntervalDesktop = parseInt(this.node.dataset.highchartsYAxisTickIntervalDesktop);
        this.commonChartOptions = new CommonChartOptions(this.xAxisTickIntervalDesktop, this.yAxisTickIntervalDesktop);
        this.specificChartOptions = new SpecificChartOptions(this.theme, this.chartType, this.config);
        this.lineChart = new LineChart();
        this.barChart = new BarChart();
        this.columnChart = new ColumnChart();
        this.areaChart = new AreaChart();
        this.scatterChart = new ScatterChart();
        this.columnRangeChart = new ColumnRangeChart();
        this.extraLines = this.checkForExtraLines();
        this.extraScatter = this.checkForExtraScatter();
        if (window.isCommonChartOptionsDefined === undefined) {
            this.setCommonChartOptions();
            window.isCommonChartOptionsDefined = true;
        }
        this.hideDataLabels = this.checkHideDataLabels();
        this.setSpecificChartOptions();
        this.setResponsiveOptions();
        this.setLoadEvent();
        this.setWindowResizeEvent();
        console.log('HighchartsBaseChart', this.chartType, this.config);
        this.chart = Highcharts.chart(chartNode, this.config);
    }

    // Check for the number of extra line series in the config
    checkForExtraLines = () => {
        return this.chartType === 'line' ? 0 : this.config.series.filter((series) => series.type === 'line').length;
    };

    // Check for the number of extra line series in the config
    checkForExtraScatter = () => {
        return this.chartType === 'scatter' ? 0 : this.config.series.filter((series) => series.type === 'scatter').length;
    };

    // Set up the global Highcharts options which are used for all charts
    setCommonChartOptions = () => {
        const chartOptions = this.commonChartOptions.getOptions();
        Highcharts.setOptions(chartOptions);
    };

    // Utility function to merge two configs together
    mergeConfigs = (baseConfig, newConfig) => {
        // If newConfig is null/undefined, return baseConfig
        if (!newConfig) return baseConfig;

        // Create a new object to store the merged result
        const merged = { ...baseConfig };

        // Iterate through all keys in newConfig
        Object.keys(newConfig).forEach((key) => {
            // Get values from both configs for this key
            const baseValue = merged[key];
            const newValue = newConfig[key];

            // If both values are objects (and not null), recursively merge them
            if (
                baseValue &&
                newValue &&
                typeof baseValue === 'object' &&
                typeof newValue === 'object' &&
                !Array.isArray(baseValue) &&
                !Array.isArray(newValue)
            ) {
                merged[key] = this.mergeConfigs(baseValue, newValue);
            } else {
                // For non-objects and arrays use the new value
                // If the new value is null/undefined, use the base value
                merged[key] = newValue ?? baseValue;
            }
        });

        return merged;
    };

    // Set up options for specific charts and chart types
    setSpecificChartOptions = () => {
        const specificChartOptions = this.specificChartOptions.getOptions();
        const lineChartOptions = this.lineChart.getLineChartOptions();
        const barChartOptions = this.barChart.getBarChartOptions(this.useStackedLayout);
        const columnRangeChartOptions = this.columnRangeChart.getColumnRangeChartOptions();
        const columnChartOptions = this.columnChart.getColumnChartOptions(this.config, this.useStackedLayout, this.extraLines);
        const areaChartOptions = this.areaChart.getAreaChartOptions();
        const scatterChartOptions = this.scatterChart.getScatterChartOptions();
        // Merge specificChartOptions with the existing config
        this.config = this.mergeConfigs(this.config, specificChartOptions);

        if (this.chartType === 'line') {
            // Merge the line chart options with the existing config
            this.config = this.mergeConfigs(this.config, lineChartOptions);
        }

        if (this.chartType === 'bar') {
            // Merge the bar chart options with the existing config
            this.config = this.mergeConfigs(this.config, barChartOptions);
        }
        if (this.chartType === 'columnrange') {
            // Merge the bar chart options with the existing config
            this.config = this.mergeConfigs(this.config, columnRangeChartOptions);
        }
        if (this.chartType === 'column') {
            // Merge the column chart options with the existing config
            this.config = this.mergeConfigs(this.config, columnChartOptions);
        }
        if (this.chartType === 'area') {
            // Merge the area chart options with the existing config
            this.config = this.mergeConfigs(this.config, areaChartOptions);
        }
        if (this.chartType === 'scatter') {
            // Merge the scatter chart options with the existing config
            this.config = this.mergeConfigs(this.config, scatterChartOptions);
        }

        if (this.extraLines > 0) {
            this.config = this.mergeConfigs(this.config, this.lineChart.getLineChartOptions());
            if (this.chartType === 'column') {
                this.config = this.mergeConfigs(this.config, columnChartOptions);
            }
        }
        if (this.extraScatter > 0) {
            //this.config = this.mergeConfigs(this.config, this.scatterChart.getScatterChartOptions());
            if (this.chartType === 'columnrange') {
                this.config = this.mergeConfigs(this.config, columnRangeChartOptions);
            }
        }

        // Disable the legend for single series charts
        this.commonChartOptions.disableLegendForSingleSeries(this.config);
    };

    // Check if the data labels should be hidden
    // They should be hidden for clustered bar charts with more than 2 series, and also for stacked bar charts
    checkHideDataLabels = () => {
        return (this.chartType === 'bar' && this.config.series.length > 2) || this.useStackedLayout === true;
    };

    // Adjust font size and annotations for smaller width of chart
    // Note this is not the same as the viewport width
    // All responsive rules should be defined here to avoid overriding existing rules
    setResponsiveOptions = () => {
        let mobileChartOptions = this.commonChartOptions.getMobileOptions(this.xAxisTickIntervalMobile, this.yAxisTickIntervalMobile);
        if (this.chartType === 'column') {
            const mobileColumnChartOptions = this.columnChart.getColumnChartMobileOptions(
                this.config,
                this.useStackedLayout,
                this.extraLines,
            );
            mobileChartOptions = this.mergeConfigs(mobileChartOptions, mobileColumnChartOptions);
        }

        if (!this.config.responsive) {
            this.config.responsive = {};
        }

        let rules = [
            {
                condition: {
                    maxWidth: 400,
                },
                chartOptions: {
                    ...mobileChartOptions,
                },
            },
            {
                // If these conditions change, the styling for the footnotes container query in _chart.scss needs to be updated
                // We are using a slightly wider breakpoint for annotations
                // to try and reduce the likelihood of them being automatically
                // hidden by Highcharts
                condition: {
                    maxWidth: 600,
                },
                chartOptions: {
                    annotations: this.annotationsOptions ? this.annotationsOptions.getAnnotationsOptionsMobile() : undefined,
                },
            },
            {
                condition: {
                    minWidth: 601,
                },
                chartOptions: {
                    annotations: this.annotationsOptions ? this.annotationsOptions.getAnnotationsOptionsDesktop() : undefined,
                },
            },
        ];
        this.config.responsive.rules = rules;
    };

    // Create the load event for various chart types
    // All load events should be defined here to avoid overriding existing events
    setLoadEvent = () => {
        if (!this.config.chart.events) {
            this.config.chart.events = {};
        }
        this.config.chart.events.load = (event) => {
            const currentChart = event.target;
            if (this.chartType === 'line') {
                this.lineChart.updateLastPointMarker(currentChart.series);
                this.commonChartOptions.hideDataLabels(currentChart.series);
            }
            if (this.chartType === 'bar') {
                this.barChart.updateBarChartHeight(this.config, currentChart, this.useStackedLayout);
                if (!this.hideDataLabels) {
                    this.barChart.postLoadDataLabels(currentChart);
                } else {
                    this.commonChartOptions.hideDataLabels(currentChart.series);
                }
            }
            if (this.chartType === 'column') {
                this.commonChartOptions.hideDataLabels(currentChart.series);
            }
            if (this.chartType === 'scatter') {
                this.scatterChart.updateMarkers(currentChart);
            }
            if (this.chartType === 'columnrange') {
                this.columnRangeChart.updateColumnRangeChartHeight(this.config, currentChart);
                this.commonChartOptions.hideDataLabels(currentChart.series);

                if (this.extraScatter > 0) {
                    const scatterSeries = currentChart.series.filter((series) => series.type === 'scatter');
                    this.scatterChart.updateMarkersForConfidenceLevels(scatterSeries);
                }
            }
            if (this.chartType != 'bar') {
                this.commonChartOptions.adjustChartHeight(currentChart, this.percentageHeightDesktop, this.percentageHeightMobile);
            }

            // If the chart has an extra line or lines, hide the data labels for
            // that series, update the last point marker
            if (this.extraLines > 0) {
                currentChart.series.forEach((series) => {
                    if (series.type === 'line') {
                        this.commonChartOptions.hideDataLabels([series]);
                    }
                });
            }
            // Update the legend items for all charts
            this.commonChartOptions.updateLegendSymbols(currentChart);
            currentChart.redraw(false);
        };
    };

    // Set resize events - throttled to 50ms
    // All resize events should be defined here to avoid overriding existing events
    setWindowResizeEvent = () => {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                // Get the current rendered chart instance
                const currentChart = Highcharts.charts.find((chart) => chart && chart.container === this.chart.container);
                // Update the data labels when the window is resized
                if (this.chartType === 'bar' && !this.hideDataLabels) {
                    this.barChart.postLoadDataLabels(currentChart);
                }
                if (this.chartType != 'bar') {
                    this.commonChartOptions.adjustChartHeight(currentChart, this.percentageHeightDesktop, this.percentageHeightMobile);
                }
            }, 50);
        });
    };
}

export default HighchartsBaseChart;
