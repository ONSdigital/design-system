/* this contains global options for all charts */
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

        // These options can be set globally for all charts
        this.options = {
            chart: {
                backgroundColor: 'transparent',
                style: {
                    fontFamily: '"OpenSans", "Helvetica Neue", arial, sans-serif',
                    color: '#222222',
                },
            },
            // chart title is rendered in wagtail
            title: {
                text: '',
            },
            credits: {
                // Remove Highcharts watermark
                enabled: false,
            },
            accessibility: {
                enabled: true,
                screenReaderSection: {
                    beforeChartFormat: '<h5>{title}</h5><div>{chartSubtitle}</div><div>{chartLongdesc}</div>',
                },
            },
            yAxis: {
                labels: {
                    style: {
                        color: this.constants.axisLabelColor,
                        fontSize: this.constants.desktopFontSize,
                    },
                },
                lineColor: this.constants.gridLineColor,
                gridLineColor: this.constants.gridLineColor,
                zeroLineColor: this.constants.zeroLineColor,
            },
            xAxis: {
                labels: {
                    style: {
                        color: this.constants.axisLabelColor,
                        fontSize: this.constants.desktopFontSize,
                    },
                },
                lineColor: this.constants.gridLineColor,
                gridLineColor: this.constants.gridLineColor,
                zeroLineColor: this.constants.zeroLineColor,
                // Add tick marks
                tickWidth: 1,
                tickLength: 6,
                tickColor: this.constants.gridLineColor,
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
