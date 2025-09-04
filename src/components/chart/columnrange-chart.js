import ChartConstants from './chart-constants';

class ColumnRangeChart {
    constructor() {
        this.constants = ChartConstants.constants();
    }

    getColumnRangeChartOptions = () => {
        return {
            plotOptions: {
                columnrange: {
                    color: this.constants.uncertaintyRangeColor, // Set the default color for the column range
                    pointWidth: 20, // Fixed bar height
                    pointPadding: 0,
                    groupPadding: 0,
                    borderWidth: 0,
                    borderRadius: 0,
                    dataLabels: {
                        enabled: false,
                    },
                },
            },
            tooltip: {
                enabled: false,
            },
            xAxis: {
                // Update the category label colours for bar charts
                labels: {
                    style: {
                        color: this.constants.categoryLabelColor,
                    },
                    useHTML: false,
                },
                // remove the tick marks for bar charts
                tickWidth: 0,
                tickLength: 0,
                gridlineWidth: 0,
                tickColor: 'transparent',
                title: { align: 'high', textAlign: 'middle', reserveSpace: false, rotation: 0, y: -25, useHTML: true },
            },
            yAxis: {
                labels: {
                    rotation: 0,
                    useHTML: true,
                    style: {
                        whiteSpace: 'nowrap',
                        color: this.constants.categoryLabelColor,
                    },
                },
                tickLength: 0,
                tickWidth: 0,
                tickColor: 'transparent',
                gridlineWidth: 0,
                title: {
                    // Override the y Axis title settings for bar charts where the y axis is horizontal
                    textAlign: 'right',
                    offset: undefined,
                    y: 0,
                    reserveSpace: true,
                    useHTML: false,
                },
            },
            chart: {
                inverted: true, // Invert the chart to make it horizontal
            },
            legend: {
                symbolRadius: 0,
                itemStyle: {
                    fontSize: this.constants.defaultFontSize,
                    color: this.constants.legendLabelColor,
                },
            },
        };
    };

    // This updates the height of the vertical axis and overall chart to fit the number of categories
    // Note that the vertical axis on a bar chart is the x axis
    updateColumnRangeChartHeight = (config, currentChart) => {
        const numberOfCategories = config.xAxis.categories.length;
        let barHeight = 20; // Height of each individual bar - set in bar-chart-plot-options
        let groupSpacing = 0; // Space we want between category groups, or between series groups for cluster charts
        let categoriesTotalHeight = 0;
        let totalSpaceHeight = 0;

        groupSpacing = 14;
        categoriesTotalHeight = numberOfCategories * barHeight;

        totalSpaceHeight = numberOfCategories * groupSpacing;

        config.xAxis.height = categoriesTotalHeight + totalSpaceHeight;
        const totalHeight = currentChart.plotTop + config.xAxis.height + currentChart.marginBottom;
        if (totalHeight !== currentChart.chartHeight) {
            currentChart.setSize(null, totalHeight, false);
        }

        currentChart.redraw();
    };
}

export default ColumnRangeChart;
