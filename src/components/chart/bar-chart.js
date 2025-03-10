import ChartConstants from './chart-constants';

class BarChartPlotOptions {
    static plotOptions() {
        return this.plotOptions;
    }

    constructor() {
        const constants = ChartConstants.constants();
        this.plotOptions = {
            bar: {
                // Set the width of the bars to be 30px
                // The spacing is worked out in the specific-chart-options.js file
                pointWidth: 30, // Fixed bar height
                pointPadding: 0,
                groupPadding: 0,
                borderWidth: 0,
                borderRadius: 0,
                // Set the data labels to be enabled and positioned outside the bars
                // We can add custom formatting on each chart to move the labels inside the bars if the bar is wide enough
                dataLabels: {
                    enabled: true,
                    inside: false,
                    style: {
                        textOutline: 'none',
                        // there is no semibold font weight available in the design system fonts, so we use 700 instead
                        fontWeight: '700',
                        color: constants.labelColor,
                        fontSize: constants.mobileFontSize,
                    },
                },
            },
        };
    }
}

export default BarChartPlotOptions;
