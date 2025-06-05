import ChartConstants from './chart-constants';

// Options that rely on the chart config but are not specific to the chart type
class SpecificChartOptions {
    constructor(theme, type, config) {
        this.constants = ChartConstants.constants();
        this.theme = theme;
        this.config = config;

        this.options = {
            colors: this.theme === 'alternate' ? this.constants.alternateTheme : this.constants.primaryTheme,
            chart: {
                type: type,
                marginTop: this.config.legend.enabled ? (type === 'boxplot' ? 50 : undefined) : 50,
            },
        };
    }

    getOptions = () => this.options;

    getMobileOptions = (xAxisTickInterval, yAxisTickInterval) => {
        return {
            tooltip: {
                enabled: false,
            },
            xAxis: {
                tickInterval: xAxisTickInterval,
            },
            yAxis: {
                tickInterval: yAxisTickInterval,
            },
        };
    };

    disableLegendForSingleSeries = (config) => {
        if (config.chart.type != 'boxplot' && config.series.length === 1) {
            config.legend = {
                enabled: false,
            };
            config.chart.marginTop = 50;
        }
    };

    adjustChartHeight = (currentChart, percentageHeightDesktop, percentageHeightMobile) => {
        // get height and width of the plot area
        const plotHeight = currentChart.plotHeight;
        const plotWidth = currentChart.plotWidth;
        // calculate the new plot height based on the percentage height
        // default to the current height
        let newPlotHeight = plotHeight;
        if (plotWidth > 400) {
            newPlotHeight = plotWidth * (percentageHeightDesktop / 100);
        } else {
            newPlotHeight = plotWidth * (percentageHeightMobile / 100);
        }
        const totalHeight = currentChart.plotTop + newPlotHeight + currentChart.marginBottom;

        // set the new size of the chart
        if (totalHeight !== currentChart.chartHeight) {
            currentChart.setSize(null, totalHeight, false);
        }
    };
}

export default SpecificChartOptions;
