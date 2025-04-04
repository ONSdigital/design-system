import ChartConstants from './chart-constants';

class BarChart {
    constructor() {
        this.constants = ChartConstants.constants();
    }

    getBarChartOptions = (useStackedLayout) => {
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
                            // The design system does not include a semibold font weight, so we use 700 (bold) as an alternative.
                            fontWeight: '700',
                            color: this.constants.labelColor,
                            fontSize: this.constants.mobileFontSize,
                        },
                    },
                },
                series: {
                    stacking: useStackedLayout ? 'normal' : null,
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
                title: { align: 'high', textAlign: 'middle', reserveSpace: false, rotation: 0, y: -25, useHTML: true },
            },
            yAxis: {
                title: {
                    // Override the y Axis title settings for bar charts where the y axis is horizontal
                    textAlign: 'right',
                    offset: undefined,
                    y: 0,
                    reserveSpace: true,
                    useHTML: false,
                },
            },
        };
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
                if (series.type == 'line') {
                    // If we have a bar chart with an extra line, exit early for the line series
                    return;
                }
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
            // The design system does not include a semibold font weight, so we use 700 (bold) as an alternative.
            fontWeight: '700',
            color: this.constants.labelColor,
            fontSize: this.constants.mobileFontSize,
        },
    });

    // This updates the height of the vertical axis and overall chart to fit the number of categories
    // Note that the vertical axis on a bar chart is the x axis
    // If there are extra lines, we need to subtract the number of extra lines from the number of series
    updateBarChartHeight = (config, currentChart, useStackedLayout, numberOfExtraLines) => {
        const numberOfCategories = config.xAxis.categories.length;
        const numberOfSeries = currentChart.series.length - numberOfExtraLines; // Get number of bar series
        let barHeight = 30; // Height of each individual bar - set in bar-chart-plot-options
        let groupSpacing = 0; // Space we want between category groups, or between series groups for cluster charts
        let categoriesTotalHeight = 0;
        let totalSpaceHeight = 0;
        if (useStackedLayout == false && numberOfSeries > 1) {
            // slightly lower bar height for cluster charts
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
