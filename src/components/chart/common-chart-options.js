class CommonChartOptions {
    constructor() {
        this.constants = {
            axisLabelColor: '#707071',
            gridLineColor: '#d9d9d9',
            zeroLineColor: '#b3b3b3',
            // Responsive font sizes
            mobileFontSize: '0.875rem',
            desktopFontSize: '1rem',
        };

        this.options = {
            chart: {
                backgroundColor: 'transparent',
                style: {
                    fontFamily: '"OpenSans", "Helvetica Neue", arial, sans-serif',
                    color: '#222222',
                },
                // experiment with height relative to the width
                height: (9 / 16) * 100 + '%', // 16:9 ratio
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
                    offset: 0,
                    rotation: 0,
                    y: -25,
                },
                lineColor: this.constants.gridLineColor,
                gridLineColor: this.constants.gridLineColor,
                zeroLineColor: this.constants.zeroLineColor,
            },
            xAxis: {
                labels: {
                    rotation: 0,
                    style: {
                        color: this.constants.axisLabelColor,
                        fontSize: this.constants.desktopFontSize,
                    },
                },
                title: {
                    align: 'high',
                },
                lineColor: this.constants.gridLineColor,
                gridLineColor: this.constants.gridLineColor,
                zeroLineColor: this.constants.zeroLineColor,
                // Add tick marks
                tickWidth: 1,
                tickLength: 6,
                tickColor: this.constants.gridLineColor,
            },
            plotOptions: {
                series: {
                    // disabes the tooltip on hover
                    enableMouseTracking: false,

                    // disables the legend item hover
                    states: {
                        inactive: {
                            enabled: false,
                        },
                    },

                    // doesn't seem to work as expected
                    // states: {
                    //     hover: {
                    //         enabled: false,
                    //     },
                    // },
                    // },
                },
            },
            // Adjust font size for smaller width of chart
            // Note this is not the same as the viewport width
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 400,
                        },
                        chartOptions: {
                            chart: {
                                // Unset the responsive height at mobile
                                height: '150%',
                            },
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
                            },
                            yAxis: {
                                labels: {
                                    style: {
                                        fontSize: this.constants.mobileFontSize,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        };
    }

    getOptions = () => this.options;
}

export default CommonChartOptions;
