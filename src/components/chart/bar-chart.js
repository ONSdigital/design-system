import Highcharts from 'highcharts';

import ChartConstants from './chart-constants';

class BarChart {
    constructor() {
        this.constants = ChartConstants.constants();
    }

    getBarChartOptions = (useStackedLayout, dataLabelDecimalPoints) => {
        const dataLabels = {
            enabled: true,
            inside: false,
            style: {
                textOutline: 'none',
                // The design system does not include a semibold font weight, so we use 700 (bold) as an alternative.
                fontWeight: '700',
                color: this.constants.labelColor,
                fontSize: this.constants.defaultFontSize,
            },
        };
        if (dataLabelDecimalPoints !== undefined) {
            dataLabels.formatter = function () {
                if (this.y === null || this.y === undefined) {
                    return '';
                }
                return Highcharts.numberFormat(this.y, dataLabelDecimalPoints);
            };
        }
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
                    dataLabels,
                },
                series: {
                    stacking: useStackedLayout ? 'normal' : null,
                },
            },
            xAxis: {
                // Update the category label colours for bar charts
                labels: {
                    style: {
                        // Allow long category labels to wrap across multiple lines
                        // rather than being truncated with an ellipsis. The row
                        // spacing is grown in updateBarChartHeight to accommodate
                        // the resulting label height.
                        textOverflow: 'none',
                        whiteSpace: 'normal',
                        color: this.constants.categoryLabelColor,
                    },
                    useHTML: false,
                },
                // remove the tick marks for bar charts
                tickWidth: 0,
                tickLength: 0,
                tickColor: 'transparent',
                title: {
                    text: '', // Set to an empty string to hide the x-axis title for bar charts
                    textAlign: 'middle',
                    reserveSpace: false,
                    rotation: 0,
                    y: -25,
                    useHTML: true,
                },
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
                title: {
                    // Override the y Axis title settings for bar charts where the y axis is horizontal
                    textAlign: 'right',
                    offset: undefined,
                    y: 0,
                    reserveSpace: true,
                    useHTML: false,
                },
                reversedStacks: false,
            },
        };
    };

    // Updates the config to move the data labels inside the bars, but only if the bar is wide enough
    // See the checkHideDataLabels function in chart.js for more details about when this function is run
    // This also runs when the chart is resized
    postLoadDataLabels = (currentChart) => {
        const insideOptions = this.getBarChartLabelsInsideOptions();
        const outsideOptions = this.getBarChartLabelsOutsideOptions();
        currentChart.series.forEach((series) => {
            // If we have a bar chart with an extra line, exit early for the line series
            if (series.type == 'line') {
                return;
            }

            if (series.type == 'scatter') {
                // If we have a bar chart with confidence levels, exit early for the scatter series
                return;
            }

            const points = series.data;

            points.forEach((point) => {
                if (point.dataLabel) {
                    // Get the actual width of the data label
                    const labelWidth = point.dataLabel.getBBox().width;

                    // Move the data labels inside the bar if the bar is wider than the label plus some padding
                    if (point.shapeArgs.height > labelWidth + 5) {
                        // Negative values are aligned on the left, positive values on the right
                        if (point.y < 0) {
                            point.update(
                                {
                                    dataLabels: {
                                        ...insideOptions,
                                        align: 'left',
                                    },
                                },
                                false,
                            );
                        } else {
                            point.update(
                                {
                                    dataLabels: {
                                        ...insideOptions,
                                        align: 'right',
                                    },
                                },
                                false,
                            );
                        }
                    } else {
                        point.update({ dataLabels: outsideOptions }, false);
                    }
                }
            });
        });
    };

    getBarChartLabelsInsideOptions = () => ({
        inside: true,
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
        overflow: 'allow',
        style: {
            textOutline: 'none',
            // The design system does not include a semibold font weight, so we use 700 (bold) as an alternative.
            fontWeight: '700',
            color: this.constants.labelColor,
            fontSize: this.constants.defaultFontSize,
        },
    });

    // This updates the height of the vertical axis and overall chart to fit the number of categories
    // Note that the vertical axis on a bar chart is the x axis
    updateBarChartHeight = (config, currentChart, useStackedLayout) => {
        // Ensure the chart has resized to its current container before we read
        // chartWidth or measure label heights, otherwise a resize race can leave
        // us calculating spacing against a stale width.
        currentChart.reflow();
        const numberOfCategories = config.xAxis.categories.length;
        const numberOfSeries = currentChart.series.length; // Get number of bar series
        let barHeight = 30; // Height of each individual bar - set in bar-chart-plot-options
        let groupSpacing = 0; // Space we want between category groups, or between series groups for cluster charts
        let categoriesTotalHeight = 0;
        let totalSpaceHeight = 0;
        const isCluster = useStackedLayout == false && numberOfSeries > 1;
        if (isCluster) {
            // slightly lower bar height for cluster charts
            barHeight = 28;
            // for cluster charts there is no space between the bars within a series, and 14px between each series
            groupSpacing = 14;
            // lower barHeight for series with 3 categories or more
            if (numberOfSeries >= 3) {
                barHeight = 20;
            }
        } else {
            groupSpacing = 10;
        }

        // Give category labels an explicit width so Highcharts wraps them onto
        // multiple lines (whiteSpace: 'normal' only wraps when a width is set)
        // A ratio is used to calculate the label width but with a minimum of 60px and a maximum of 200px.
        const chartWidth = currentChart.chartWidth || 0;
        // Narrower charts give labels a smaller share of the width so the plot
        // area stays usable; the row spacing growth below absorbs the extra
        // wrapping that results.
        const labelRatio = chartWidth < 500 ? 0.22 : 0.32;
        const labelMaxWidth = Math.max(60, Math.min(200, Math.round(chartWidth * labelRatio)));
        const xAxis = currentChart.xAxis[0];
        if (xAxis) {
            xAxis.update(
                {
                    labels: {
                        style: {
                            width: labelMaxWidth + 'px',
                        },
                    },
                },
                false,
            );
            // Force a redraw so labels re-render at the new width before we
            // measure their heights.
            currentChart.redraw(false);
        }

        // If any wrapped category label is taller than the row it sits in, the
        // groupSpacing needs to increase so the tallest label fits.
        // This preserves the fixed bar height and keeps every gap consistent.
        const rowBarsHeight = isCluster ? barHeight * numberOfSeries : barHeight;
        const labelPadding = 8; // small breathing room above and below wrapped text
        const xAxisTicks = xAxis && xAxis.ticks;
        let maxLabelHeight = 0;
        if (xAxisTicks) {
            Object.values(xAxisTicks).forEach((tick) => {
                if (tick.label && typeof tick.label.getBBox === 'function') {
                    const h = tick.label.getBBox().height;
                    if (h > maxLabelHeight) maxLabelHeight = h;
                }
            });
        }
        // Calculate the height needed for the bars plus spacing in order
        // to fit the tallest label, and increase the groupSpacing if necessary.
        const requiredRowPitch = maxLabelHeight + labelPadding;
        const currentRowPitch = rowBarsHeight + groupSpacing;
        if (requiredRowPitch > currentRowPitch) {
            groupSpacing = requiredRowPitch - rowBarsHeight;
        }

        if (isCluster) {
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
