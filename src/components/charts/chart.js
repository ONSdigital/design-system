import CommonChartOptions from './common-chart-options';
import SpecificChartOptions from './specific-chart-options';
import LineChartPlotOptions from './line-chart';
import Highcharts from 'highcharts';
import Accessibility from 'highcharts/modules/accessibility';

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

        // Sets some options globally for all charts
        // Only needs to be done once
        // todo: use a suitable namespace for this
        if (window.commonOptionsDefined === undefined) {
            this.setCommonChartOptions();
            window.commonOptionsDefined = true;
        }
        this.setSpecificChartOptions();

        Accessibility.Highcharts = Highcharts;
        Highcharts.chart(chartNode, this.config);
    }

    // Set up the global Highcharts options
    setCommonChartOptions = () => {
        const chartOptions = this.commonChartOptions.getOptions();
        Highcharts.setOptions(chartOptions);
    };

    // Set up the chart specific options
    // This is done for each chart as the options vary
    setSpecificChartOptions = () => {
        const specificChartOptions = this.specificChartOptions.getOptions();
        // loop over specificChartOptions and add to config
        for (const option in specificChartOptions) {
            this.config[option] = specificChartOptions[option];
        }
        // Sets line chart options
        this.config.plotOptions = {
            line: new LineChartPlotOptions().plotOptions.line,
        };
        console.log(this.config);
    };
}

export default HighchartsBaseChart;
