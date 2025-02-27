import CommonChartOptions from './common-chart-options';
import SpecificChartOptions from './specific-chart-options';
import LineChartPlotOptions from './line-chart';
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

        this.config = JSON.parse(this.node.querySelector(`[data-highcharts-config--${this.uuid}]`).textContent);

        this.commonChartOptions = new CommonChartOptions();
        this.specificChartOptions = new SpecificChartOptions(this.theme, this.chartType);

        if (window.isCommonChartOptionsDefined === undefined) {
            this.setCommonChartOptions();
            window.isCommonChartOptionsDefined = true;
        }

        this.setSpecificChartOptions();

        Highcharts.chart(chartNode, this.config);
    }

    // Set up the global Highcharts options
    setCommonChartOptions = () => {
        const chartOptions = this.commonChartOptions.getOptions();
        Highcharts.setOptions(chartOptions);
    };

    setSpecificChartOptions = () => {
        const specificChartOptions = this.specificChartOptions.getOptions();
        for (const option in specificChartOptions) {
            this.config[option] = specificChartOptions[option];
        }
        // Add the line chart plotOptions to the config - merge with
        // any existing plotOptions
        this.config.plotOptions = {
            ...(Highcharts.getOptions()?.plotOptions || {}),
            line: new LineChartPlotOptions().plotOptions.line,
        };
    };
}

export default HighchartsBaseChart;
