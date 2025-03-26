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
                // Symbol width and height in the legend. May be overridden for individual chart types
                symbolWidth: 12,
                symbolHeight: 12,
                margin: 50,
                itemHoverStyle: {
                    color: this.constants.labelColor, // Prevents the text from changing color on hover
                },
                itemStyle: {
                    cursor: 'default', // ensures that it does not change to a hand (pointer) on hover.
                    color: this.constants.labelColor,
                    fontSize: this.constants.desktopFontSize,
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
            },
            yAxis: {
                labels: {
                    style: {
                        color: this.constants.axisLabelColor,
                        fontSize: this.constants.desktopFontSize,
                    },
                },
                title: {
                    align: 'high',
                    textAlign: 'middle',
                    reserveSpace: false,
                    offset: 15,
                    rotation: 0,
                    y: -25,
                    style: {
                        color: this.constants.axisLabelColor,
                        fontSize: this.constants.desktopFontSize,
                    },
                },
                lineColor: this.constants.gridLineColor,
                gridLineColor: this.constants.gridLineColor,
                // Add zero line
                plotLines: [
                    {
                        color: this.constants.zeroLineColor,
                        width: 1,
                        value: 0,
                        zIndex: 2,
                    },
                ],
                // Add tick marks
                tickWidth: 1,
                tickLength: 6,
                tickColor: this.constants.gridLineColor,
            },
            xAxis: {
                labels: {
                    style: {
                        color: this.constants.axisLabelColor,
                        fontSize: this.constants.desktopFontSize,
                    },
                },
                title: {
                    align: 'high',
                    style: {
                        color: this.constants.axisLabelColor,
                        fontSize: this.constants.desktopFontSize,
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
                    // disabes the tooltip on hover
                    enableMouseTracking: false,
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
        };
    }

    getOptions = () => this.options;

    getMobileOptions = () => {
        return {
            legend: {
                itemStyle: {
                    fontSize: this.constants.mobileFontSize,
                },
            },
            xAxis: {
                labels: {
                    style: {
                        fontSize: this.constants.mobileFontSize,
                    },
                },
                title: {
                    style: {
                        fontSize: this.constants.mobileFontSize,
                    },
                },
            },
            yAxis: {
                labels: {
                    style: {
                        fontSize: this.constants.mobileFontSize,
                    },
                },
                title: {
                    style: {
                        fontSize: this.constants.mobileFontSize,
                    },
                },
            },
        };
    };
}

export default CommonChartOptions;
