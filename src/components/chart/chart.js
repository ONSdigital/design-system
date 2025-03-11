import CommonChartOptions from './common-chart-options';
import SpecificChartOptions from './specific-chart-options';
import LineChart from './line-chart';
import BarChart from './bar-chart';
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
        if (window.isCommonChartOptionsDefined === undefined) {
            this.setCommonChartOptions();
            window.isCommonChartOptionsDefined = true;
        }

        this.setSpecificChartOptions();
        this.setLoadEvent();
        this.hideDataLabels = this.checkHideDataLabels();

        Highcharts.chart(chartNode, this.config);
    }

    // Set up the global Highcharts options which are used for all charts
    setCommonChartOptions = () => {
        const chartOptions = this.commonChartOptions.getOptions();
        Highcharts.setOptions(chartOptions);
    };

    // Utility function to merge two configs together
    mergeConfigs = (baseConfig, newConfig) => {
        return {
            ...baseConfig,
            ...Object.keys(newConfig).reduce((mergedOptions, optionKey) => {
                if (typeof baseConfig[optionKey] === 'object' && typeof newConfig[optionKey] === 'object') {
                    mergedOptions[optionKey] = { ...baseConfig[optionKey], ...newConfig[optionKey] };
                } else {
                    mergedOptions[optionKey] = newConfig[optionKey];
                }
                return mergedOptions;
            }, {}),
        };
    };

    // Set up options for specific charts and chart types
    setSpecificChartOptions = () => {
        const specificChartOptions = this.specificChartOptions.getOptions();
        const lineChartOptions = this.lineChart.getLineChartOptions();
        const barChartOptions = this.barChart.getBarChartOptions();

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
    };

    // Check if the data labels should be hidden
    // They should be hidden for clustered bar charts with more than 2 series, and also for stacked bar charts
    checkHideDataLabels = () => {
        this.hideDataLabels = (this.chartType === 'bar' && this.config.series.length > 2) || this.useStackedLayout === true;
    };

    // Create the load event for various chart types
    setLoadEvent = () => {
        this.config.chart.events = {};
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
            currentChart.redraw(false);
        };
    };
}

export default HighchartsBaseChart;
