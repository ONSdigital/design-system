class LineChartPlotOptions {
    static plotOptions() {
        return this.plotOptions;
    }

    constructor() {
        this.plotOptions = {
            line: {
                lineWidth: 3,
                linecap: 'round',
                marker: {
                    // This gets enabled at the end of each line
                    // See the `setLastPointMarker` method in chart.js
                    enabled: false,
                },
            },
        };
    }
}

export default LineChartPlotOptions;
