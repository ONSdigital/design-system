import CommonChartOptions from './common-chart-options';
import SpecificChartOptions from './specific-chart-options';
import LineChart from './line-chart';
import BarChart from './bar-chart';
import ColumnChart from './column-chart';
import Highcharts from 'highcharts';
import 'highcharts/modules/accessibility';

class HighchartsBaseChart {
    static selector() {
        return '[data-highcharts-base-chart]';
    }

    constructor(node) {
        this.node = node;
        this.chartType = this.node.dataset.highchartsType;
        this.theme = this.node.dataset.highchartsTheme;
        const chartNode = this.node.querySelector('[data-highcharts-chart]');

        this.id = this.node.dataset.highchartsId;
        this.useStackedLayout = this.node.hasAttribute('data-highcharts-use-stacked-layout');
        this.config = JSON.parse(this.node.querySelector(`[data-highcharts-config--${this.id}]`).textContent);

        this.commonChartOptions = new CommonChartOptions();
        this.specificChartOptions = new SpecificChartOptions(this.theme, this.chartType, this.config);
        this.lineChart = new LineChart();
        this.barChart = new BarChart();
        this.columnChart = new ColumnChart();
        this.extraLines = this.checkForExtraLines();
        if (window.isCommonChartOptionsDefined === undefined) {
            this.setCommonChartOptions();
            window.isCommonChartOptionsDefined = true;
        }
        this.hideDataLabels = this.checkHideDataLabels();
        this.setSpecificChartOptions();
        this.setLoadEvent();
        this.setWindowResizeEvent();
        this.chart = Highcharts.chart(chartNode, this.config);
    }

    // Check for the number of extra line series in the config
    checkForExtraLines = () => {
        return this.config.series.filter((series) => series.type === 'line').length;
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
        const columnChartOptions = this.columnChart.getColumnChartOptions(this.useStackedLayout);
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
        if (this.chartType === 'column') {
            // Merge the column chart options with the existing config
            this.config = this.mergeConfigs(this.config, columnChartOptions);
        }

        if (this.extraLines > 0) {
            this.config = this.mergeConfigs(this.config, this.lineChart.getPlotOptionsOnly());
            if (this.chartType === 'column') {
                this.config = this.mergeConfigs(this.config, columnChartOptions);
            }
            if (this.chartType === 'bar') {
                this.config = this.mergeConfigs(this.config, barChartOptions);
            }
        }
    };

    // Check if the data labels should be hidden
    // They should be hidden for clustered bar charts with more than 2 series, and also for stacked bar charts
    checkHideDataLabels = () => {
        return (this.chartType === 'bar' && this.config.series.length > 2) || this.useStackedLayout === true;
    };

    // Create the load event for various chart types
    setLoadEvent = () => {
        if (!this.config.chart.events) {
            this.config.chart.events = {};
        }
        this.config.chart.events.load = (event) => {
            const currentChart = event.target;
            // Disable the legend for single series charts
            this.commonChartOptions.disableLegendForSingleSeries(currentChart);
            if (this.chartType === 'line') {
                this.lineChart.updateLastPointMarker(currentChart.series);
                this.commonChartOptions.hideDataLabels(currentChart.series);
            }
            if (this.chartType === 'bar') {
                this.barChart.updateBarChartHeight(this.config, currentChart, this.useStackedLayout, this.extraLines);
                if (!this.hideDataLabels) {
                    this.barChart.postLoadDataLabels(currentChart);
                } else {
                    this.commonChartOptions.hideDataLabels(currentChart.series);
                }
            }
            if (this.chartType === 'column') {
                this.columnChart.updatePointPadding(this.config, currentChart, this.useStackedLayout, this.extraLines);
                this.commonChartOptions.hideDataLabels(currentChart.series);
            }

            // If the chart has an extra line or lines, hide the data labels for for
            // that series, update the last point marker
            if (this.extraLines > 0) {
                currentChart.series.forEach((series) => {
                    if (series.type && series.type === 'line') {
                        this.lineChart.updateLastPointMarker([series]);
                        this.commonChartOptions.hideDataLabels([series]);
                        this.commonChartOptions.updateLegendForLineSeries(currentChart);
                    }
                });
            }
            currentChart.redraw(false);
        };
    };

    // Set resize events - throttled to 100ms
    setWindowResizeEvent = () => {
        if (this.chartType === 'column' || this.chartType === 'bar') {
            window.addEventListener('resize', () => {
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(() => {
                    // Get the current rendered chart instance
                    const currentChart = Highcharts.charts.find((chart) => chart && chart.container === this.chart.container);
                    // Update the data labels when the window is resized
                    if (this.chartType === 'bar' && !this.hideDataLabels) {
                        this.barChart.postLoadDataLabels(currentChart);
                    }
                }, 100);
            });
        }
    };
}

export default HighchartsBaseChart;
