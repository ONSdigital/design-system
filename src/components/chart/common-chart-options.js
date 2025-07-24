import ChartConstants from './chart-constants';

// Options that are common to all chart types - these are set once in the Highcharts.setOptions() method
class CommonChartOptions {
    constructor() {
        this.constants = ChartConstants.constants();

        this.options = {
            chart: {
                backgroundColor: 'transparent',
                style: {
                    fontFamily: '"OpenSans", "Helvetica Neue", arial, sans-serif',
                    color: '#222222',
                },
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
                layout: 'horizontal',
                // Symbol width and height are set in a postLoad event, depending on the series type
                // Default to the line width to ensure there is enough space for the overall legend item for line symbols
                symbolWidth: 20,
                margin: 50,
                navigation: {
                    enabled: false,
                },
                itemDistance: 30,
                itemHoverStyle: {
                    color: this.constants.labelColor, // Prevents the text from changing color on hover
                },
                itemStyle: {
                    color: this.constants.labelColor,
                    fontSize: this.constants.defaultFontSize,
                    fontWeight: 'normal',
                },
                // Disable click event on legend
                // There is currently an issue because the legend items are still buttons
                // and therefore the screen reader still announces that they can be clicked
                events: {
                    itemClick: () => {
                        return false;
                    },
                },
                accessibility: {
                    keyboardNavigation: {
                        enabled: false, // Prevents focus on legend items while keeping screen reader support
                    },
                },
            },
            // Remove the chart title as rendered by Highcharts, as this is rendered in the surrounding component
            title: {
                text: '',
            },
            credits: {
                // Remove Highcharts watermark
                enabled: false,
            },
            accessibility: {
                enabled: true,
                keyboardNavigation: {
                    focusBorder: {
                        enabled: false,
                    },
                    enabled: true,
                    seriesNavigation: {
                        mode: 'serialize',
                    },
                },
            },
            yAxis: {
                labels: {
                    style: {
                        color: this.constants.axisLabelColor,
                        fontSize: this.constants.defaultFontSize,
                    },
                },
                title: {
                    text: '', // Remove the default title rendered by Highcharts if not provided
                    align: 'high',
                    textAlign: 'middle',
                    reserveSpace: false,
                    useHTML: true,
                    offset: 15,
                    rotation: 0,
                    y: -25,
                    style: {
                        color: this.constants.axisLabelColor,
                        fontSize: this.constants.defaultFontSize,
                    },
                },
                lineColor: this.constants.gridLineColor,
                gridLineColor: this.constants.gridLineColor,
                // Add tick marks
                tickWidth: 1,
                tickLength: 6,
                tickColor: this.constants.gridLineColor,
            },
            xAxis: {
                labels: {
                    useHTML: true,
                    rotation: 0,
                    style: {
                        color: this.constants.axisLabelColor,
                        fontSize: this.constants.defaultFontSize,
                    },
                },
                title: {
                    align: 'high',
                    style: {
                        color: this.constants.axisLabelColor,
                        fontSize: this.constants.defaultFontSize,
                    },
                },
                lineColor: this.constants.gridLineColor,
                gridLineColor: this.constants.gridLineColor,
                // Add tick marks
                tickWidth: 1,
                tickLength: 6,
                tickColor: this.constants.gridLineColor,
            },
            plotOptions: {
                series: {
                    animation: false,

                    // disables the legend item hover
                    states: {
                        inactive: {
                            opacity: 1, // Prevent dimming of other series
                            enabled: false,
                        },
                        hover: {
                            enabled: false, // Disable the hover effect
                        },
                    },
                },
            },
            tooltip: {
                animation: false,
            },
        };
    }

    getOptions = () => this.options;
}

export default CommonChartOptions;
