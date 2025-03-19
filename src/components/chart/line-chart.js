class LineChartPlotOptions {
    static plotOptions() {
        return this.plotOptions;
    }

    constructor() {
        this.plotOptions = {
            line: {
                lineWidth: 3,
                linecap: 'round',
            },
        };
    }
}

export default LineChartPlotOptions;
