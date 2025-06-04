import ChartConstants from './chart-constants';

class ScatterChart {
    constructor() {
        this.chartConstants = ChartConstants.constants();
        this.markerStyles = this.chartConstants.scatterMarkerStyles;
        this.confidenceLevelMarkerStyles = this.chartConstants.confidenceLevelMarkerStyles;
    }

    getScatterChartOptions = () => {
        return {
            xAxis: {
                gridLineWidth: 1,
            },
            yAxis: {
                gridLineWidth: 1,
            },
        };
    };

    // Use a different set of marker styles for scatter charts
    updateMarkers = (currentChart) => {
        currentChart.series.forEach((series, i) => {
            series.update({ marker: this.markerStyles[i] != undefined ? this.markerStyles[i] : this.markerStyles[0] }, false);
        });
    };

    updateMarkersForConfidenceLevels = (series) => {
        series.forEach((series, i) => {
            series.update(
                {
                    marker:
                        this.confidenceLevelMarkerStyles[i] != undefined
                            ? this.confidenceLevelMarkerStyles[i]
                            : this.confidenceLevelMarkerStyles[0],
                },
                false,
            );
        });
    };
}

export default ScatterChart;
