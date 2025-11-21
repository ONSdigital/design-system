import Highcharts from 'highcharts';
import 'highcharts/modules/accessibility';
import 'highcharts/modules/annotations';
import 'highcharts/highcharts-more';

import CommonChartOptions from './common-chart-options';
import SpecificChartOptions from './specific-chart-options';
import LineChart from './line-chart';
import BarChart from './bar-chart';
import ColumnChart from './column-chart';
import ScatterChart from './scatter-chart';
import Boxplot from './boxplot';
import AnnotationsOptions from './annotations-options';
import RangeAnnotationsOptions from './range-annotations-options';
import ReferenceLineAnnotationsOptions from './reference-line-annotations-options';
import { preparePlotLinesAndBands, mergeConfigs } from './utilities';
import AreaChart from './area-chart';
import ColumnRangeChart from './columnrange-chart';

class HighchartsBaseChart {
    static selector() {
        return '[data-highcharts-base-chart]';
    }

    constructor(node) {
        this.node = node;
        this.chartType = this.node.dataset.highchartsType;
        this.theme = this.node.dataset.highchartsTheme;
        const chartNode = this.node.querySelector('[data-highcharts-chart]');
        if (!chartNode) {
            console.error('No chart node found');
            return;
        }

        // Add a CSS class to the chart based on the chart type (e.g., 'bar-chart-container', 'line-chart-container')
        // This allows type-specific styling in CSS.
        chartNode.classList.add(`${this.chartType}-chart-container`);

        this.id = this.node.dataset.highchartsId;
        this.useStackedLayout = this.node.hasAttribute('data-highcharts-use-stacked-layout');
        this.config = JSON.parse(this.node.querySelector(`[data-highcharts-config--${this.id}]`).textContent);
        if (this.node.querySelector(`[data-highcharts-annotations--${this.id}]`)) {
            this.annotations = JSON.parse(this.node.querySelector(`[data-highcharts-annotations--${this.id}]`).textContent);
            this.annotationsOptions = new AnnotationsOptions(this.annotations);
        }
        if (this.node.querySelector(`[data-highcharts-range-annotations--${this.id}]`)) {
            this.rangeAnnotations = JSON.parse(this.node.querySelector(`[data-highcharts-range-annotations--${this.id}]`).textContent);
            this.rangeAnnotationsOptions = new RangeAnnotationsOptions(this.rangeAnnotations);
        }
        if (this.node.querySelector(`[data-highcharts-reference-line-annotations--${this.id}]`)) {
            this.referenceLineAnnotations = JSON.parse(
                this.node.querySelector(`[data-highcharts-reference-line-annotations--${this.id}]`).textContent,
            );
            this.referenceLineAnnotationsOptions = new ReferenceLineAnnotationsOptions(this.referenceLineAnnotations);
        }
        this.percentageHeightDesktop = this.node.dataset.highchartsPercentageHeightDesktop;
        this.percentageHeightMobile = this.node.dataset.highchartsPercentageHeightMobile;
        this.xAxisTickIntervalMobile = this.node.dataset.highchartsXAxisTickIntervalMobile
            ? parseInt(this.node.dataset.highchartsXAxisTickIntervalMobile)
            : undefined;
        this.xAxisTickIntervalDesktop = this.node.dataset.highchartsXAxisTickIntervalDesktop
            ? parseInt(this.node.dataset.highchartsXAxisTickIntervalDesktop)
            : undefined;
        this.yAxisTickIntervalMobile = this.node.dataset.highchartsYAxisTickIntervalMobile
            ? parseInt(this.node.dataset.highchartsYAxisTickIntervalMobile)
            : undefined;
        this.yAxisTickIntervalDesktop = this.node.dataset.highchartsYAxisTickIntervalDesktop
            ? parseInt(this.node.dataset.highchartsYAxisTickIntervalDesktop)
            : undefined;
        this.commonChartOptions = new CommonChartOptions();
        this.estimateLineLabel = this.node.dataset.highchartsEstimateLineLabel;
        this.uncertainyRangeLabel = this.node.dataset.highchartsUncertaintyRangeLabel;
        this.customReferenceLineValue = this.node.dataset.highchartsCustomReferenceLineValue
            ? parseFloat(this.node.dataset.highchartsCustomReferenceLineValue)
            : undefined;

        this.specificChartOptions = new SpecificChartOptions(
            this.theme,
            this.chartType,
            this.config,
            this.xAxisTickIntervalDesktop,
            this.yAxisTickIntervalDesktop,
        );
        this.lineChart = new LineChart();
        this.barChart = new BarChart();
        this.columnChart = new ColumnChart();
        this.areaChart = new AreaChart();
        this.scatterChart = new ScatterChart();
        this.columnRangeChart = new ColumnRangeChart();
        this.boxplot = new Boxplot();
        this.extraLines = this.checkForExtraLines();
        this.extraScatter = this.checkForExtraScatter();
        // This code only needs to run once per request as it sets
        // options that are used for all charts
        if (window.isCommonChartOptionsDefined === undefined) {
            this.setCommonChartOptions();
            window.isCommonChartOptionsDefined = true;
        }
        this.hideDataLabels = this.checkHideDataLabels();
        this.setSpecificChartOptions();
        this.setResponsiveOptions();
        this.setLoadEvent();
        this.setRenderEvent();
        this.setWindowResizeEvent();
        this.chart = Highcharts.chart(chartNode, this.config);
    }

    // Check for the number of extra line series in the config
    checkForExtraLines = () => {
        return this.chartType === 'line' ? 0 : this.config.series.filter((series) => series.type === 'line').length;
    };

    // Used to ensure that extra line series always overlay the column series
    updateExtraLineZIndex = () => {
        this.config.series.forEach((series) => {
            if (series.type === 'line') {
                series.zIndex = this.config.series.length + 1;
            }
        });
    };

    // Check for the number of extra line series in the config
    checkForExtraScatter = () => {
        return this.chartType === 'scatter' ? 0 : this.config.series.filter((series) => series.type === 'scatter').length;
    };

    // Set up the global Highcharts options which are used for all charts
    setCommonChartOptions = () => {
        const chartOptions = this.commonChartOptions.getOptions();
        Highcharts.setOptions(chartOptions);
    };

    // Set up options for specific charts and chart types
    setSpecificChartOptions = () => {
        const specificChartOptions = this.specificChartOptions.getOptions();
        const lineChartOptions = this.lineChart.getLineChartOptions();
        const barChartOptions = this.barChart.getBarChartOptions(this.useStackedLayout);
        const columnRangeChartOptions = this.columnRangeChart.getColumnRangeChartOptions();
        const columnChartOptions = this.columnChart.getColumnChartOptions(this.config, this.useStackedLayout, this.extraLines);
        const areaChartOptions = this.areaChart.getAreaChartOptions();
        const scatterChartOptions = this.scatterChart.getScatterChartOptions();
        const boxplotOptions = this.boxplot.getBoxplotOptions(this.config, this.useStackedLayout, this.extraLines);
        // Merge specificChartOptions with the existing config
        this.config = mergeConfigs(this.config, specificChartOptions);

        if (this.chartType === 'line') {
            // Merge the line chart options with the existing config
            this.config = mergeConfigs(this.config, lineChartOptions);
        }

        if (this.chartType === 'bar') {
            // Merge the bar chart options with the existing config
            this.config = mergeConfigs(this.config, barChartOptions);
        }
        if (this.chartType === 'columnrange') {
            // Merge the bar chart options with the existing config
            this.config = mergeConfigs(this.config, columnRangeChartOptions);
        }
        if (this.chartType === 'column') {
            // Merge the column chart options with the existing config
            this.config = mergeConfigs(this.config, columnChartOptions);
        }
        if (this.chartType === 'area') {
            // Merge the area chart options with the existing config
            this.config = mergeConfigs(this.config, areaChartOptions);
        }
        if (this.chartType === 'scatter') {
            // Merge the scatter chart options with the existing config
            this.config = mergeConfigs(this.config, scatterChartOptions);
        }
        if (this.chartType === 'boxplot') {
            // Merge the boxplot chart options with the existing config
            this.config = mergeConfigs(this.config, boxplotOptions);
        }

        if (this.extraLines > 0) {
            this.updateExtraLineZIndex();
            this.config = mergeConfigs(this.config, this.lineChart.getLineChartOptions());
            this.config = mergeConfigs(this.config, this.lineChart.getExtraLineChartOptions(this.config.series.length + 1));
            if (this.chartType === 'column') {
                this.config = mergeConfigs(this.config, columnChartOptions);
            }
        }
        if (this.extraScatter > 0) {
            if (this.chartType === 'columnrange') {
                this.config = mergeConfigs(this.config, columnRangeChartOptions);
            }
        }

        this.specificChartOptions.limitSeriesToThemeLength();

        // Disable the legend for single series charts
        this.specificChartOptions.disableLegendForSingleSeries(this.config);
    };

    // Check if the data labels should be hidden
    // They should be hidden where there are more than 20 data points in a series, for clustered bar charts with more than 2 series, and also for stacked bar charts
    checkHideDataLabels = () => {
        let hideDataLabels = (this.chartType === 'bar' && this.config.series.length > 2) || this.useStackedLayout === true;
        this.config.series.forEach((series) => {
            if (series.data.length > 20) {
                hideDataLabels = true;
            }
        });
        return hideDataLabels;
    };

    // Adjust font size and annotations for smaller width of chart
    // Note this is not the same as the viewport width
    // All responsive rules should be defined here to avoid overriding existing rules
    setResponsiveOptions = () => {
        let mobileChartOptions = this.specificChartOptions.getMobileOptions(this.xAxisTickIntervalMobile, this.yAxisTickIntervalMobile);
        if (this.chartType === 'column' || this.chartType === 'boxplot') {
            const mobileColumnChartOptions = this.columnChart.getColumnChartMobileOptions(
                this.config,
                this.useStackedLayout,
                this.extraLines,
            );
            mobileChartOptions = mergeConfigs(mobileChartOptions, mobileColumnChartOptions);
        }

        if (!this.config.responsive) {
            this.config.responsive = {};
        }

        const { desktopAllPlotLinesAndBands, mobileAllPlotLinesAndBands } = preparePlotLinesAndBands(
            this.annotations,
            this.rangeAnnotations,
            this.rangeAnnotationsOptions,
            this.referenceLineAnnotationsOptions,
            this.specificChartOptions,
            this.chartType,
            this.customReferenceLineValue,
        );

        let rules = [
            {
                condition: {
                    maxWidth: 400,
                },
                chartOptions: {
                    ...mobileChartOptions,
                },
            },
            {
                // If these conditions change, the styling for the footnotes container query in _chart.scss needs to be updated
                // We are using a slightly wider breakpoint for annotations
                // to try and reduce the likelihood of them being automatically
                // hidden by Highcharts
                condition: {
                    maxWidth: 600,
                },
                chartOptions: {
                    annotations: this.annotationsOptions ? this.annotationsOptions.getAnnotationsOptionsMobile() : undefined,
                    ...(mobileAllPlotLinesAndBands != {} ? mobileAllPlotLinesAndBands : null),
                },
            },
            {
                condition: {
                    minWidth: 601,
                },
                chartOptions: {
                    annotations: this.annotationsOptions ? this.annotationsOptions.getAnnotationsOptionsDesktop() : undefined,
                    ...(desktopAllPlotLinesAndBands != {} ? desktopAllPlotLinesAndBands : null),
                },
            },
        ];
        this.config.responsive.rules = rules;
    };

    // Create the load event for various chart types
    // All load events should be defined here to avoid overriding existing events
    setLoadEvent = () => {
        if (!this.config.chart.events) {
            this.config.chart.events = {};
        }
        this.config.chart.events.load = (event) => {
            const currentChart = event.target;
            if (this.chartType === 'line') {
                this.lineChart.updateLastPointMarker(currentChart.series);
                this.specificChartOptions.hideDataLabels(currentChart.series);
            }
            if (this.chartType === 'bar') {
                this.barChart.updateBarChartHeight(this.config, currentChart, this.useStackedLayout);
                if (!this.hideDataLabels) {
                    this.barChart.postLoadDataLabels(currentChart);
                } else {
                    this.specificChartOptions.hideDataLabels(currentChart.series);
                }
            }
            if (this.chartType === 'column') {
                this.specificChartOptions.hideDataLabels(currentChart.series);
            }
            if (this.chartType === 'scatter') {
                this.scatterChart.updateMarkers(currentChart);
                this.specificChartOptions.hideDataLabels(currentChart.series);
            }
            if (this.chartType === 'boxplot') {
                this.specificChartOptions.hideDataLabels(currentChart.series);
            }
            if (this.chartType === 'columnrange') {
                this.columnRangeChart.updateColumnRangeChartHeight(this.config, currentChart);
                this.specificChartOptions.hideDataLabels(currentChart.series);

                if (this.extraScatter > 0) {
                    const scatterSeries = currentChart.series.filter((series) => series.type === 'scatter');
                    this.scatterChart.updateMarkersForConfidenceLevels(scatterSeries);
                }
            }

            // If the chart has an extra line or lines, hide the data labels for
            // that series, update the last point marker
            if (this.extraLines > 0) {
                currentChart.series.forEach((series) => {
                    if (series.type === 'line') {
                        this.specificChartOptions.hideDataLabels([series]);
                    }
                });
            }
            currentChart.redraw(false);
        };
    };

    setRenderEvent = () => {
        if (!this.config.chart.events) {
            this.config.chart.events = {};
        }
        this.config.chart.events.render = (event) => {
            const currentChart = event.target;
            if (this.rangeAnnotationsOptions) {
                this.rangeAnnotationsOptions.addLine(currentChart);
            }
            if (this.chartType != 'bar' && this.chartType != 'columnrange') {
                this.specificChartOptions.adjustChartHeight(currentChart, this.percentageHeightDesktop, this.percentageHeightMobile);
            }
            // Update the legend symbols on render to maintain them during resize
            this.specificChartOptions.updateLegendSymbols(currentChart);
        };
    };

    // Set resize events - throttled to 50ms
    // All resize events should be defined here to avoid overriding existing events
    setWindowResizeEvent = () => {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                // Get the current rendered chart instance
                const currentChart = Highcharts.charts.find((chart) => chart && chart.container === this.chart.container);
                // Update the data labels when the window is resized
                if (this.chartType === 'bar' && !this.hideDataLabels) {
                    this.barChart.postLoadDataLabels(currentChart);
                    // Force a single redraw after all updates
                    currentChart.redraw(false);
                }
            }, 50);
        });
    };
}

export default HighchartsBaseChart;
