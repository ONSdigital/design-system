class LineChartPlotOptions {
    static plotOptions() {
        return this.plotOptions;
    }

    constructor() {
        this.plotOptions = {
            line: {
                lineWidth: 3,
                linecap: 'round',
                // In a later PR we will update the marker styles
                marker: {
                    enabled: false,
                    radius: 4,
                    symbol: 'circle',
                    lineWidth: 0,
                },
            },
        };
    }
}

export default LineChartPlotOptions;
