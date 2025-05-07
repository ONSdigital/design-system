import ChartConstants from './chart-constants';

class Boxplot {
    constructor() {
        this.constants = ChartConstants.constants();
    }

    getBoxplotOptions = () => {
        return {
            plotOptions: {
                boxplot: {
                    boxDashStyle: 'Solid',
                    fillColor: '#A6206096',
                    lineWidth: 0,
                    medianColor: '#003c57',
                    medianDashStyle: 'Solid',
                    medianWidth: 3,
                    stemColor: '#A63400',
                    stemDashStyle: 'dot',
                    stemWidth: 0,
                    whiskerColor: '#3D9200',
                    whiskerLength: '100%',
                    whiskerWidth: 0,
                },
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

export default Boxplot;
