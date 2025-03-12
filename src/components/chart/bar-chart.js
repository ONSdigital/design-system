import ChartConstants from './chart-constants';

class BarChart {
    constructor() {
        this.constants = ChartConstants.constants();
        //this.hideDataLabels = false;
    }

    getBarChartOptions = () => {
        return {
            plotOptions: {
                bar: {
                    // Set the width of the bars to be 30px
                    // The spacing is worked out in the specific-chart-options.js file
                    pointWidth: 30, // Fixed bar height
                    pointPadding: 0,
                    groupPadding: 0,
                    borderWidth: 0,
                    borderRadius: 0,
                    // Set the data labels to be enabled and positioned outside the bars
                    // We can add custom formatting on each chart to move the labels inside the bars if the bar is wide enough
                    dataLabels: {
                        enabled: true,
                        inside: false,
                        style: {
                            textOutline: 'none',
                            // there is no semibold font weight available in the design system fonts, so we use 700 instead
                            fontWeight: '700',
                            color: this.constants.labelColor,
                            fontSize: this.constants.mobileFontSize,
                        },
                    },
                },
            },
            xAxis: {
                // Update the category label colours for bar charts
                labels: {
                    style: {
                        color: this.constants.categoryLabelColor,
                    },
                },
                // remove the tick marks for bar charts
                tickWidth: 0,
                tickLength: 0,
                tickColor: 'transparent',
            },
            yAxis: {
                title: {
                    // Todo: stop this overriding the other title properties
                    // Override the y Axis title settings for bar charts where the y axis is horizontal
                    offset: undefined,
                    y: 0,
                },
            },
        };
    };

    hideDataLabels = (config) => {
        config.series.forEach((series) => {
            series.dataLabels = {
                enabled: false,
            };
        });
    };

    // Updates the config to move the data labels inside the bars, but only if the bar is wide enough
    // This may also need to run when the chart is resized
    postLoadDataLabels = (currentChart) => {
        const insideOptions = {
            dataLabels: this.getBarChartLabelsInsideOptions(),
        };
        const outsideOptions = {
            dataLabels: this.getBarChartLabelsOutsideOptions(),
        };

        currentChart.series.forEach((series) => {
            const points = series.data;
            points.forEach((point) => {
                // Get the actual width of the data label
                const labelWidth = point.dataLabel && point.dataLabel.getBBox().width;
                // Move the data labels inside the bar if the bar is wider than the label plus some padding
                if (point.shapeArgs.height > labelWidth + 20) {
                    point.update(insideOptions, false);
                } else {
                    point.update(outsideOptions, false);
                }
            });
        });

        currentChart.redraw();
    };

    getBarChartLabelsInsideOptions = () => ({
        inside: true,
        align: 'right',
        verticalAlign: 'middle',
        style: {
            color: 'white',
            fontWeight: 'bold',
        },
    });

    getBarChartLabelsOutsideOptions = () => ({
        inside: false,
        align: undefined,
        verticalAlign: undefined,
        style: {
            textOutline: 'none',
            // there is no semibold font weight available in the design system fonts, so we use 700 instead
            fontWeight: '700',
            color: this.constants.labelColor,
            fontSize: this.constants.mobileFontSize,
        },
    });

    // This updates the height of the vertical axis and overall chart to fit the number of categories
    // Note that the vertical axis on a bar chart is the x axis
    updateBarChartHeight = (config, currentChart) => {
        const numberOfCategories = config.xAxis.categories.length;
        const numberOfSeries = currentChart.series.length; // Get number of bar series
        let barHeight = 30; // Height of each individual bar - set in bar-chart-plot-options
        let groupSpacing = 0; // Space we want between category groups, or betweeen series groups for cluster charts
        let categoriesTotalHeight = 0;
        let totalSpaceHeight = 0;
        if (numberOfSeries > 1) {
            // slighly lower bar height for cluster charts
            barHeight = 28;
            // for cluster charts there is no space between the bars within a series, and 14px between each series
            groupSpacing = 14;
            // lower barHeight for series with 3 categories or more
            if (numberOfSeries >= 3) {
                barHeight = 20;
            }
            categoriesTotalHeight = numberOfCategories * barHeight * numberOfSeries;

            totalSpaceHeight = numberOfCategories * groupSpacing;
            // work out the group padding for cluster charts which is measured in xAxis units.
            const plotHeight = categoriesTotalHeight + totalSpaceHeight;
            const xUnitHeight = plotHeight / numberOfCategories;
            const groupPadding = groupSpacing / 2 / xUnitHeight;
            currentChart.series.forEach((series) => {
                series.update({
                    groupPadding: groupPadding,
                    pointWidth: barHeight,
                });
            });
        } else {
            groupSpacing = 10;
            categoriesTotalHeight = numberOfCategories * barHeight;
            totalSpaceHeight = (numberOfCategories - 1) * groupSpacing;
        }

        config.xAxis.height = categoriesTotalHeight + totalSpaceHeight;
        const totalHeight = currentChart.plotTop + config.xAxis.height + currentChart.marginBottom;
        if (totalHeight !== currentChart.chartHeight) {
            currentChart.setSize(null, totalHeight, false);
        }

        currentChart.redraw();
    };
}

export default BarChart;
