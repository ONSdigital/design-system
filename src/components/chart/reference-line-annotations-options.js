import ChartConstants from './chart-constants';

class ReferenceLineAnnotationsOptions {
    constructor(referenceLineAnnotations) {
        this.constants = ChartConstants.constants();
        this.referenceLineAnnotations = referenceLineAnnotations;
    }

    getReferenceLineAnnotationsOptionsDesktop = () => {
        let xAxisPlotLines = [];
        let yAxisPlotLines = [];
        this.referenceLineAnnotations.forEach((referenceLineAnnotation) => {
            let referenceLineConfig = {
                label: {
                    text: referenceLineAnnotation.text,
                    style: {
                        color: this.constants.labelColor,
                        fontSize: this.constants.defaultFontSize,
                        width: referenceLineAnnotation.labelWidth ? referenceLineAnnotation.labelWidth : 150,
                    },
                    x: referenceLineAnnotation.labelOffsetX ? referenceLineAnnotation.labelOffsetX : 10,
                    y: referenceLineAnnotation.labelOffsetY ? referenceLineAnnotation.labelOffsetY : 20,
                    rotation: 0,
                    align: 'left',
                    textAlign: 'left',
                },
                color: this.constants.zeroLineColor,
                // note this works to give a dashed line with 4px and a 4px gap, but
                // this way of styling it is undocumented
                dashStyle: '2 2',
                width: 2,
                value: referenceLineAnnotation.value,
                zIndex: 3,
            };
            if (referenceLineAnnotation.axis === 'x') {
                xAxisPlotLines.push(referenceLineConfig);
            } else if (referenceLineAnnotation.axis === 'y') {
                yAxisPlotLines.push(referenceLineConfig);
            }
        });
        return {
            xAxis: xAxisPlotLines.length > 0 ? { plotLines: xAxisPlotLines } : undefined,
            yAxis: yAxisPlotLines.length > 0 ? { plotLines: yAxisPlotLines } : undefined,
        };
    };

    getReferenceLineAnnotationsOptionsMobile = (annotationsLength, chartType) => {
        let xAxisPlotLines = [];
        let yAxisPlotLines = [];
        this.referenceLineAnnotations.forEach((referenceLineAnnotation, index) => {
            let isVertical = referenceLineAnnotation.axis === 'x' ? true : false;
            if (chartType === 'bar') {
                isVertical = !isVertical;
            }
            let referenceLineConfig = {
                label: {
                    // Add the number of point and range annotations to the current reference line annotation loop
                    // So that if we have more than one type of annotations, the numbers will be sequential
                    text: `${annotationsLength + index + 1}`,
                    useHTML: true,
                    className: 'ons-chart__annotations-footnotes-number',
                    allowOverlap: true,
                    style: {
                        color: this.constants.labelColor,
                        fontSize: this.constants.defaultFontSize,
                    },
                    x: isVertical ? 7 : 0,
                    y: isVertical ? 13 : -10, // 13 works with the height of the styled number
                    rotation: 0,
                    zIndex: 3,
                },
                color: this.constants.zeroLineColor,
                // note this works to give a dashed line with 4px and a 4px gap, but
                // this way of styling it is undocumented
                dashStyle: '2 2',
                width: 2,
                value: referenceLineAnnotation.value,
                zIndex: 3,
            };
            if (referenceLineAnnotation.axis === 'x') {
                xAxisPlotLines.push(referenceLineConfig);
            } else if (referenceLineAnnotation.axis === 'y') {
                yAxisPlotLines.push(referenceLineConfig);
            }
        });
        return {
            xAxis: xAxisPlotLines.length > 0 ? { plotLines: xAxisPlotLines } : undefined,
            yAxis: yAxisPlotLines.length > 0 ? { plotLines: yAxisPlotLines } : undefined,
        };
    };
}

export default ReferenceLineAnnotationsOptions;
