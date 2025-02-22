import ChartOptions from './chart-options';
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

        this.commonChartOptions = new ChartOptions(this.theme, this.title, this.chartType);

        this.setCommonChartOptions();
        console.log(Highcharts.getOptions());
        Accessibility.Highcharts = Highcharts;
        Highcharts.chart(chartNode, this.config);
    }

    // Set up the global Highcharts options
    setCommonChartOptions = () => {
        const chartOptions = this.commonChartOptions.getOptions();
        chartOptions.plotOptions = {
            line: new LineChartPlotOptions().plotOptions.line,
        };

        Highcharts.setOptions(chartOptions);
    };
}

export default HighchartsBaseChart;
