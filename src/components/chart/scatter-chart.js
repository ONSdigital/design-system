import ChartConstants from './chart-constants';

class ScatterChart {
    constructor() {
        this.chartConstants = ChartConstants.constants();
        this.markerStyles = this.chartConstants.scatterMarkerStyles;
    }

    getScatterChartOptions = () => {
        return {
            plotOptions: {
                scatter: {
                    // enable tooltips for scatter charts
                    enableMouseTracking: true,
                },
            },
            xAxis: {
                gridLineWidth: 1,
            },
            yAxis: {
                gridLineWidth: 1,
            },
        };
    };

    // Set a different
    updateMarkers = (currentChart) => {
        currentChart.series.forEach((series, i) => {
            series.update({ marker: this.markerStyles[i] != undefined ? this.markerStyles[i] : this.markerStyles[0] }, false);
        });
    };
}

export default ScatterChart;
