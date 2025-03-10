import ChartConstants from './chart-constants';

class SpecificChartOptions {
    constructor(theme, type, useStackedLayout, config) {
        this.constants = ChartConstants.constants();
        this.theme = theme;
        this.type = type;
        this.useStackedLayout = useStackedLayout;
        this.config = config;

        this.hideDataLabels = false;

        // Hide data labels for clustered bar charts with more than 2 series, and also for stacked bar charts
        this.checkHideDataLabels();

        this.options = {
            colors: this.theme === 'primary' ? this.constants.primaryTheme : this.constants.alternateTheme,
            legend: {
                align: 'left',
                verticalAlign: 'top',
                layout: 'horizontal',
                symbolWidth: this.type === 'line' ? 20 : 12,
                symbolHeight: this.type === 'line' ? 3 : 12,
                margin: 50,
                itemStyle: {
                    color: this.constants.labelColor,
                    fontSize: this.constants.desktopFontSize,
                    fontWeight: 'normal',
                },
                // Disable click event on legend
                // There is currently an issue because the legend items are still buttons
                // and therefore the screen reader still announces that they can be clicked
                events: {
                    itemClick: () => {
                        return false;
                    },
                },
            },
            chart: {
                events: {
                    load: (event) => {
                        const currentChart = event.target;
                        currentChart.update(
                            {
                                chart: {
                                    marginTop: currentChart.legend.display ? undefined : 50, // Only set marginTop when legend is off
                                },
                            },
                            false,
                            false,
                            false,
                        );

                        if (this.type === 'line') {
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

                            currentChart.redraw(false);
                        }

                        if (type === 'bar') {
                            if (useStackedLayout === false) {
                                this.updateBarChartHeight(currentChart);
                            }
                            if (!this.hideDataLabels) {
                                this.postLoadDataLabels(currentChart);
                            }
                        }
                    },
                },
            },
            xAxis: {
                labels: {
                    style: {
                        color: this.type === 'bar' ? this.constants.categoryLabelColor : this.constants.axisLabelColor,
                    },
                },
            },
        };
    }

    checkHideDataLabels = () => {
        // Hide data labels for clustered bar charts with more than 2 series, and also for stacked bar charts
        this.hideDataLabels =
            (this.chartType === 'bar' && this.useStackedLayout === false && this.config.series.length > 2) ||
            this.useStackedLayout === true;
        if (this.hideDataLabels) {
            this.config.series.forEach((series) => {
                /* eslint-disable no-param-reassign */
                series.dataLabels = {
                    enabled: false,
                };
                /* eslint-enable no-param-reassign */
            });
        }
    };

    getOptions = () => this.options;

    // This updates the height of the vertical axis and overall chart to fit the number of categories
    // Note that the vertical axis on a bar chart is the x axis
    updateBarChartHeight = (currentChart) => {
        const numberOfCategories = this.config.xAxis.categories.length;
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

        this.config.xAxis.height = categoriesTotalHeight + totalSpaceHeight;
        const totalHeight = currentChart.plotTop + this.config.xAxis.height + currentChart.marginBottom;
        if (totalHeight !== currentChart.chartHeight) {
            currentChart.setSize(null, totalHeight, false);
        }

        currentChart.redraw();
    };

    // Updates the config to move the data labels inside the bars, but only if the bar is wide enough
    // This may also need to run when the chart is resized
    postLoadDataLabels = (currentChart) => {
        const options = {
            dataLabels: this.getBarChartLabelsInsideOptions(),
        };

        currentChart.series.forEach((series) => {
            const points = series.data;
            points.forEach((point) => {
                // Get the actual width of the data label
                const labelWidth = point.dataLabel && point.dataLabel.absoluteBox.width;
                // Move the data labels inside the bar if the bar is wider than the label plus some padding
                if (point.shapeArgs.height > labelWidth + 20) {
                    point.update(options, false);
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
}

export default SpecificChartOptions;
