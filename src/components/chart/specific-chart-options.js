import ChartConstants from './chart-constants';

// Options that rely on the chart config but are not specific to the chart type
class SpecificChartOptions {
    constructor(theme, type, config, xAxisTickInterval, yAxisTickInterval) {
        this.constants = ChartConstants.constants();
        this.theme = theme;
        this.config = config;

        this.options = {
            colors: this.theme === 'alternate' ? this.constants.alternateTheme : this.constants.primaryTheme,
            chart: {
                type: type,
                marginTop: this.config.legend.enabled ? (type === 'boxplot' ? 50 : undefined) : 50,
            },
            yAxis: {
                tickInterval: yAxisTickInterval,
                // Configure the minimum and maximum value shown on the y-axis.
                // If not set in the config, it is set to undefined which is Highcharts default value.
                min: this.config.yAxis?.min ?? undefined,
                max: this.config.yAxis?.max ?? undefined,

                // Controls whether the y-axis starts and/or ends exactly on a tick mark.
                // Highcharts defaults to `true` for both startOnTick and endOnTick on y-axes.
                startOnTick: this.config.yAxis?.startOnTick ?? true,
                endOnTick: this.config.yAxis?.endOnTick ?? true,
            },

            xAxis: {
                tickInterval: xAxisTickInterval,
                // Configure the minimum and maximum value shown on the x-axis.
                // If not set in the config, it is set to undefined which is Highcharts default value.
                min: this.config.xAxis?.min ?? undefined,
                max: this.config.xAxis?.max ?? undefined,

                // Controls whether the x-axis starts and/or ends exactly on a tick mark.
                // Highcharts defaults to `false` for both startOnTick and endOnTick on x-axes.
                startOnTick: this.config.xAxis?.startOnTick ?? false,
                endOnTick: this.config.xAxis?.endOnTick ?? false,
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

    hideDataLabels = (series) => {
        series.forEach((series) => {
            series.update({
                dataLabels: {
                    enabled: false,
                },
            });
        });
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
        // Ensure the chart is fully rendered before calculating dimensions
        if (!currentChart || !currentChart.plotWidth) {
            // If chart isn't ready, schedule for next tick
            setTimeout(() => {
                this.adjustChartHeight(currentChart, percentageHeightDesktop, percentageHeightMobile);
            }, 0);
            return;
        }

        // get current width of the plot area
        const plotWidth = currentChart.plotWidth;
        let newPlotHeight = undefined;
        let totalHeight = 400; // Highcharts default height - needed if one of the percentage heights is undefined

        // Calculate the new plot height based on the percentage height
        if (plotWidth > 400) {
            if (percentageHeightDesktop !== undefined) {
                newPlotHeight = Math.round(plotWidth * (percentageHeightDesktop / 100));
            }
        } else {
            if (percentageHeightMobile !== undefined) {
                newPlotHeight = Math.round(plotWidth * (percentageHeightMobile / 100));
            }
        }
        // update the total height if we have a new plot height
        if (newPlotHeight !== undefined) {
            totalHeight = currentChart.plotTop + newPlotHeight + currentChart.marginBottom;
        }

        const tolerance = 2; // 2px tolerance
        if (Math.abs(totalHeight - currentChart.chartHeight) > tolerance) {
            currentChart.setSize(null, totalHeight, false);
        }
    };

    // Add zero line or custom reference line (but only for column or line charts)
    getReferenceLine = (customReferenceLineValue, chartType) => {
        let lineValue = 0;
        if (customReferenceLineValue && (chartType === 'line' || chartType === 'column')) {
            lineValue = customReferenceLineValue;
        }

        return {
            yAxis: {
                plotLines: [
                    {
                        color: this.constants.zeroLineColor,
                        width: 1.5,
                        value: lineValue,
                        zIndex: 2,
                    },
                ],
            },
        };
    };

    updateLegendSymbols = (chart) => {
        if (this.symbolUpdateTimeout) {
            clearTimeout(this.symbolUpdateTimeout);
        }

        this.symbolUpdateTimeout = setTimeout(() => {
            if (chart.legend.options.enabled) {
                chart.legend.allItems.forEach((item, index) => {
                    const { legendItem, userOptions } = item;
                    const seriesType = userOptions?.type;
                    const { label, symbol, line } = legendItem || {};

                    if (seriesType === 'line') {
                        // This is the case for the column plus line chart - the series type is
                        // line, but the chart type is column. In this case we show a simple
                        // line symbol in the legend, but we need to move the label to the right
                        // to account for the longer line symbol
                        if (chart.userOptions.chart.type !== 'line') {
                            label?.attr({
                                x: 30, // Adjust label position to account for longer line
                            });
                        }

                        // This is the scenario for a line chart with markers disabled
                        // We have custom code in line-chart.js to update the last point to
                        // display as a symbol. This code checks if there is no symbol in the legend
                        // (which means it is a line chart with markers disabled)
                        // and if so, it updates the legend to display as a symbol rather than as a line
                        // We only to this for chart types that are explicitly line charts - i.e. not column with line
                        if (!symbol && label && label.element && chart.userOptions.chart.type === 'line') {
                            // Hide the line in the legend
                            if (line) {
                                line.hide();
                            }

                            // Remove any existing custom symbols for this legend item
                            const existingSymbols = label.parentGroup.element.querySelectorAll('[data-custom-legend-symbol]');
                            existingSymbols.forEach((symbol) => symbol.remove());

                            // Create a custom symbol for the legend using the line marker symbol options
                            const renderer = chart.renderer;
                            const symbolX = -5;
                            const symbolY = 8;
                            const markerStyle = this.constants.lineMarkerStyles[index % this.constants.lineMarkerStyles.length];

                            const legendSymbol = renderer
                                .symbol(markerStyle.symbol, symbolX, symbolY, 12, markerStyle.radius, markerStyle.radius)
                                .attr({
                                    fill: item.color,
                                    stroke: item.color,
                                    'stroke-width': 1,
                                    // 10px accounts for the stroke width to end up at 12px overall
                                    width: 10,
                                    height: 10,
                                    'data-custom-legend-symbol': true,
                                });
                            legendSymbol.add(label.parentGroup);
                            label?.attr({
                                x: 15, // Adjust label position to account for shorter space that the symbol takes up
                            });
                        }
                    } else if (seriesType === 'scatter') {
                        // Because the scatter icons have a white border, we have to render them
                        // slightly larger to make them appear at 12 x 12 px
                        // Also the text looks better aligned if the y value is tweaked slightly for the scatter icons
                        symbol.attr({
                            width: 13,
                            height: 13,
                            y: 7,
                        });
                    } else {
                        if (!symbol) return;
                        // Update the symbol width and height
                        // For column, bar and other chart types
                        symbol.attr({
                            width: 12,
                            height: 12,
                            y: 8,
                        });
                    }
                });
            }
        }, 10);
    };
}

export default SpecificChartOptions;
