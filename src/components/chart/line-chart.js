import ChartConstants from './chart-constants';
class LineChart {
    constructor() {
        this.chartConstants = ChartConstants.constants();
        this.markerStyles = this.chartConstants.lineMarkerStyles;
    }

    getLineChartOptions = () => {
        return {
            plotOptions: {
                line: {
                    lineWidth: 3,
                    linecap: 'round',
                },
                marker: {
                    enabled: true,
                },
            },
        };
    };

    getExtraLineChartOptions = () => {
        return {
            plotOptions: {
                line: {
                    color: this.chartConstants.extraLineColor,
                },
            },
        };
    };

    // Customise line charts which are set to hide markers
    // so that the last point marker displays (at the end of the line)
    updateLastPointMarker = (series) => {
        series.forEach((series, i) => {
            if (series.userOptions.marker.enabled === false) {
                const points = series.points;

                if (points && points.length > 0) {
                    // Show only the last point marker
                    const lastPoint = points[points.length - 1];
                    lastPoint.update({
                        marker: {
                            enabled: true,
                        },
                    });
                }
            }
            // Update the marker styles to use for each series
            series.update({ marker: this.markerStyles[i] != undefined ? this.markerStyles[i] : this.markerStyles[0] }, false);
        });
    };
}

export default LineChart;
