import ChartConstants from './chart-constants';

class AnnotationsOptions {
    constructor(annotations) {
        this.constants = ChartConstants.constants();
        this.annotations = annotations;
    }

    getAnnotationsOptionsDesktop = () => {
        let annotations = [
            {
                labels: [],
                labelOptions: {
                    shape: 'connector',
                    borderColor: this.constants.labelColor,
                    padding: 3,
                    style: {
                        color: this.constants.labelColor,
                        fontSize: this.constants.defaultFontSize,
                        width: 150,
                        textAlign: 'left',
                    },
                },
                draggable: '',
            },
        ];
        this.annotations.forEach((annotation) => {
            annotations[0].labels.push({
                point: {
                    x: annotation.point.x,
                    y: annotation.point.y,
                    xAxis: 0,
                    yAxis: 0,
                },
                text: annotation.text,
                x: annotation.labelOffsetX,
                y: annotation.labelOffsetY,
            });
        });
        return annotations;
    };

    getAnnotationsOptionsMobile = () => {
        let annotations = [
            {
                labels: [],
                labelOptions: {
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    // We use css styling for the rounded number annotation at mobile
                    useHTML: true,
                    className: 'ons-chart__annotations-footnotes-number',
                },
                draggable: '',
            },
        ];
        this.annotations.forEach((annotation, index) => {
            annotations[0].labels.push({
                point: {
                    x: annotation.point.x,
                    y: annotation.point.y,
                    xAxis: 0,
                    yAxis: 0,
                },
                text: index + 1,
                x: 0,
                y: 0,
                // Ensures the full label is read out by screen readers
                accessibility: {
                    description: annotation.text,
                },
            });
        });
        return annotations;
    };
}

export default AnnotationsOptions;
