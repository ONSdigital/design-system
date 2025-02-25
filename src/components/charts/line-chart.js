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
                    enabled: false,
                },
                states: {
                    hover: {
                        lineWidth: 3,
                    },
                },
            },
        };
    }
}

export default LineChartPlotOptions;
