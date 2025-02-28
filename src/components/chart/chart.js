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

        // // test labels at the end of the line
        // this.config.series.forEach((series) => {
        //     series.dataLabels = {
        //         enabled: true,
        //         align: 'left',
        //         x: 10, // Distance from the end of the line
        //         verticalAlign: 'middle',
        //         formatter: function () {
        //             // Only show label for the last point
        //             if (this.x === this.series.data[this.series.data.length - 1].x) {
        //                 return '<span style="color: ' + this.color + '">' + this.series.name + '</span>';
        //             }
        //             return '';
        //         },
        //         style: {
        //             fontWeight: 'bold',
        //         },
        //         allowOverlap: true, // Add this to ensure all the labels show - but
        //         // they will then overlap
        //         crop: false, // Add this to prevent cropping
        //         overflow: 'none', // Add this to ensure visibility
        //         useHTML: true,
        //     };
        // });

        // this.config.chart.marginRight = 200;

        // // end test labels at the end of the line

        this.config.chart.events = {};
        this.config.chart.events.load = (event) => {
            console.log('afterRender');
            if (this.chartType === 'line') {
                this.setLastPointMarker(event);
            }
        };
        console.log(this.config);

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

    // Sets the last point in each series to have a circular marker enabled
    setLastPointMarker = (event) => {
        const currentChart = event.target;

        currentChart.series.forEach((series) => {
            const points = series.points;
            if (points && points.length > 0) {
                // Show only the last point marker
                const lastPoint = points[points.length - 1];
                lastPoint.update(
                    {
                        marker: {
                            enabled: true,
                            radius: 4,
                            symbol: 'circle',
                            fillColor: series.color,
                            lineWidth: 0,
                        },
                    },
                    false,
                );
            }
        });

        currentChart.redraw();
    };
}

export default HighchartsBaseChart;
