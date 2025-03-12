import CommonChartOptions from './common-chart-options';
import SpecificChartOptions from './specific-chart-options';
import LineChart from './line-chart';
import BarChart from './bar-chart';
import ColumnChart from './column-chart';
import Highcharts from 'highcharts';

class HighchartsBaseChart {
    static selector() {
        return '[data-highcharts-base-chart]';
    }

    constructor(node) {
        this.node = node;
        this.chartType = this.node.dataset.highchartsType;
        this.theme = this.node.dataset.highchartsTheme;
        this.title = this.node.dataset.highchartsTitle;
        const chartNode = this.node.querySelector('[data-highcharts-chart]');
        this.uuid = this.node.dataset.highchartsUuid;
        this.useStackedLayout = this.node.hasAttribute('data-highcharts-use-stacked-layout');
        this.config = JSON.parse(this.node.querySelector(`[data-highcharts-config--${this.uuid}]`).textContent);

        this.commonChartOptions = new CommonChartOptions();
        this.specificChartOptions = new SpecificChartOptions(this.theme, this.config);
        this.lineChart = new LineChart();
        this.barChart = new BarChart();
        this.columnChart = new ColumnChart();
        if (window.isCommonChartOptionsDefined === undefined) {
            this.setCommonChartOptions();
            window.isCommonChartOptionsDefined = true;
        }

        this.setSpecificChartOptions();
        this.setLoadEvent();
        this.hideDataLabels = this.checkHideDataLabels();
        this.setWindowResizeEvent();
        this.chart = Highcharts.chart(chartNode, this.config);
    }

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
        const barChartOptions = this.barChart.getBarChartOptions();
        const columnChartOptions = this.columnChart.getColumnChartOptions();
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
    };

    // Check if the data labels should be hidden
    // They should be hidden for clustered bar charts with more than 2 series, and also for stacked bar charts
    checkHideDataLabels = () => {
        this.hideDataLabels = (this.chartType === 'bar' && this.config.series.length > 2) || this.useStackedLayout === true;
    };

    // Create the load event for various chart types
    setLoadEvent = () => {
        if (!this.config.chart.events) {
            this.config.chart.events = {};
        }
        this.config.chart.events.load = (event) => {
            const currentChart = event.target;
            if (this.chartType === 'line') {
                this.lineChart.updateLastPointMarker(currentChart);
            }
            if (this.chartType === 'bar') {
                if (this.useStackedLayout === false) {
                    this.barChart.updateBarChartHeight(this.config, currentChart);
                }
                if (!this.hideDataLabels) {
                    this.barChart.postLoadDataLabels(currentChart);
                }
            }
            if (this.chartType === 'column') {
                this.columnChart.updatePointPadding(this.config, currentChart);
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
                    // Update the point padding for column charts when the window is resized
                    if (this.chartType === 'column') {
                        this.columnChart.updatePointPadding(this.config, currentChart);
                    }
                }, 100);
            });
        }
    };
}

export default HighchartsBaseChart;
