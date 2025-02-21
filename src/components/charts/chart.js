import ChartOptions from './chart-options';
import LineChartPlotOptions from './line-chart';

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

        this.config = JSON.parse(this.node.querySelector(`[data-highcharts-config--${this.uuid}]`).textContent);

        this.commonChartOptions = new ChartOptions(this.theme, this.title, this.chartType);

        // Configure the chart styling options common to all charts
        // Will only run once per page load
        this.setCommonChartOptions();

        // Create the chart
        Highcharts.chart(chartNode, this.config);
    }

    // Set up the global Highcharts options
    setCommonChartOptions = () => {
        // currently set each time a chart is rendered as some options depend on the chart type
        const chartOptions = this.commonChartOptions.getOptions();
        chartOptions.plotOptions = {
            line: new LineChartPlotOptions().plotOptions.line,
        };

        // Apply the options globally
        Highcharts.setOptions(chartOptions);
    };
}

export default HighchartsBaseChart;
