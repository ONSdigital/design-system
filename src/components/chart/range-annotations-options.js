import ChartConstants from './chart-constants';

class RangeAnnotationsOptions {
    constructor(rangeAnnotations) {
        this.constants = ChartConstants.constants();
        this.rangeAnnotations = rangeAnnotations;
    }

    getRangeAnnotationsOptionsDesktop = (chartType) => {
        let xAxisPlotBands = [];
        let yAxisPlotBands = [];
        this.rangeAnnotations.forEach((rangeAnnotation) => {
            let adjustedRangeValues = this.adjustRangeForCategoryAxis(rangeAnnotation, chartType);
            let rangeConfig = {
                from: adjustedRangeValues.axisValue1,
                to: adjustedRangeValues.axisValue2,
                label: {
                    text: rangeAnnotation.text,
                    useHTML: true,
                    className: rangeAnnotation.labelInside
                        ? `ons-chart__range-annotation-label ons-chart__range-annotation-label--${rangeAnnotation.axis}`
                        : 'ons-chart__range-annotation-label--outside',
                    allowOverlap: true,
                    style: {
                        color: this.constants.labelColor,
                        fontSize: this.constants.defaultFontSize,
                        width: rangeAnnotation.labelWidth ? rangeAnnotation.labelWidth : 150,
                    },
                },
                color: this.constants.shadingColor,
            };
            if (!rangeAnnotation.labelInside && rangeAnnotation.labelOffsetX) {
                rangeConfig.label.x = rangeAnnotation.labelOffsetX;
            }
            if (!rangeAnnotation.labelInside && rangeAnnotation.labelOffsetY) {
                rangeConfig.label.y = rangeAnnotation.labelOffsetY;
            }
            if (rangeAnnotation.axis === 'x') {
                xAxisPlotBands.push(rangeConfig);
            } else if (rangeAnnotation.axis === 'y') {
                yAxisPlotBands.push(rangeConfig);
            }
        });
        return {
            xAxis: xAxisPlotBands.length > 0 ? { plotBands: xAxisPlotBands } : undefined,
            yAxis: yAxisPlotBands.length > 0 ? { plotBands: yAxisPlotBands } : undefined,
        };
    };

    getRangeAnnotationsOptionsMobile = (annotationsLength, chartType) => {
        let xAxisPlotBands = [];
        let yAxisPlotBands = [];
        this.rangeAnnotations.forEach((rangeAnnotation, index) => {
            let adjustedRangeValues = this.adjustRangeForCategoryAxis(rangeAnnotation, chartType);
            let rangeConfig = {
                from: adjustedRangeValues.axisValue1,
                to: adjustedRangeValues.axisValue2,
                label: {
                    // Add the number of point annotations to the current range annotation loop
                    // So that if we have both types of annotations, the numbers will be sequential
                    text: `${annotationsLength + index + 1}`,
                    useHTML: true,
                    className: 'ons-chart__footnote-number',
                    allowOverlap: true,
                    style: {
                        color: this.constants.labelColor,
                        fontSize: this.constants.defaultFontSize,
                    },
                },
                color: this.constants.shadingColor,
            };
            if (rangeAnnotation.axis === 'x') {
                xAxisPlotBands.push(rangeConfig);
            } else if (rangeAnnotation.axis === 'y') {
                yAxisPlotBands.push(rangeConfig);
            }
        });
        return {
            xAxis: xAxisPlotBands.length > 0 ? { plotBands: xAxisPlotBands } : undefined,
            yAxis: yAxisPlotBands.length > 0 ? { plotBands: yAxisPlotBands } : undefined,
        };
    };

    getLabelPosition = (chartType, labelRect, plotBandRect, isXaxis) => {
        let isToLeft = false;
        let isToRight = false;
        let isToTop = false;
        let isToBottom = false;
        let isVertical = chartType === 'bar' ? !isXaxis : isXaxis;
        if (isVertical) {
            // vertical plotBand
            if (labelRect.right < plotBandRect.left) {
                isToLeft = true;
            }
            if (labelRect.left > plotBandRect.right) {
                isToRight = true;
            }
        } else {
            // horizontal plotBand
            if (labelRect.bottom < plotBandRect.top) {
                isToTop = true;
            }
            if (labelRect.top > plotBandRect.bottom) {
                isToBottom = true;
            }
        }
        return { isToLeft, isToRight, isToTop, isToBottom };
    };

    addLine = (currentChart) => {
        // If there is already a line in the chart, remove it before redrawing it
        const lines = currentChart.container.querySelectorAll('[data-range-annotation-line]');
        if (lines.length > 0) {
            lines.forEach((line) => {
                line.remove();
            });
        }

        // Get all plotBands from both axes
        const xAxisPlotBands = currentChart.xAxis[0].plotLinesAndBands;
        const yAxisPlotBands = currentChart.yAxis[0].plotLinesAndBands;

        // Combine all plotBands
        const allPlotBands = [...xAxisPlotBands, ...yAxisPlotBands];

        allPlotBands.forEach((plotBand) => {
            // We need to exit early if there is no label - the allPlotBands array
            // will include the plotLine for the zero line as well as the plotBands
            // for the range annotations
            if (!plotBand.label) {
                return;
            }

            // If the label is set to be inside the plotBand, exit early and don't draw a line
            if (plotBand.options.label.x === undefined && plotBand.options.label.y === undefined) {
                return;
            }

            // Get the plotBand element
            const plotBandElement = plotBand.svgElem.element;
            const plotBandRect = plotBandElement.getBoundingClientRect();

            // Get the label element
            const labelElement = plotBand.label.element;
            const labelRect = labelElement.getBoundingClientRect();

            // Get the label position relative to the plotBand (left, right, top or bottom)

            const labelPosition = this.getLabelPosition(
                currentChart.userOptions.chart.type,
                labelRect,
                plotBandRect,
                plotBand.axis.isXAxis,
            );

            // Only draw a line in the label doesn't overlap the plot band
            if (!(labelPosition.isToLeft || labelPosition.isToRight || labelPosition.isToTop || labelPosition.isToBottom)) {
                return;
            }

            // Create and add the connecting line
            const line = document.createElement('div');
            line.classList.add('ons-chart__connector-line');
            line.setAttribute('data-range-annotation-line', true);
            labelElement.appendChild(line);

            // Draw the line based on the label position
            if (labelPosition.isToRight) {
                let divWidth = labelRect.left - plotBandRect.right;
                line.style.width = `${divWidth}px`;
                line.style.height = '1px';
                line.style.top = `${labelRect.height / 2}px`;
                line.style.left = `-${divWidth}px`;
            }

            if (labelPosition.isToLeft) {
                let divWidth = plotBandRect.left - labelRect.right;
                line.style.width = `${divWidth}px`;
                line.style.height = '1px';
                line.style.top = `${labelRect.height / 2}px`;
                line.style.right = `-${divWidth}px`;
            }

            if (labelPosition.isToTop) {
                let divHeight = plotBandRect.top - labelRect.bottom;
                line.style.height = `${divHeight}px`;
                line.style.width = '1px';
                line.style.top = `${labelRect.height}px`;
                line.style.left = `${labelRect.width / 2}px`;
            }

            if (labelPosition.isToBottom) {
                let divHeight = labelRect.top - plotBandRect.bottom;
                line.style.height = `${divHeight}px`;
                line.style.width = '1px';
                line.style.top = `-${divHeight}px`;
                line.style.left = `${labelRect.width / 2}px`;
            }
        });
    };

    // For bar and column charts, we want the range to
    // start and end flush with the edges of the columns / bars,
    // not halfway through as is the Highcharts default.
    adjustRangeForCategoryAxis = (rangeAnnotation, chartType) => {
        let axisValue1 = rangeAnnotation.range.axisValue1;
        let axisValue2 = rangeAnnotation.range.axisValue2;
        if ((chartType === 'bar' && rangeAnnotation.axis === 'x') || (chartType === 'column' && rangeAnnotation.axis === 'x')) {
            axisValue1 = rangeAnnotation.range.axisValue1 - 0.5;
            axisValue2 = rangeAnnotation.range.axisValue2 - 0.5;
        }
        return { axisValue1, axisValue2 };
    };
}

export default RangeAnnotationsOptions;
