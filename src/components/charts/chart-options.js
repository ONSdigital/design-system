/* this contains global options for all charts */
class ChartOptions {
    constructor(theme, title, type) {
        this.constants = {
            primaryTheme: ['#206095', '#27a0cc', '#003c57', '#118c7b', '#a8bd3a', '#871a5b', '#f66068', '#746cb1', '#22d0b6'],
            // Alternate theme colours from https://service-manual.ons.gov.uk/data-visualisation/colours/using-colours-in-charts
            alternateTheme: ['#206095', '#27A0CC', '#871A5B', '#A8BD3A', '#F66068'],
            labelColor: '#414042',
            axisLabelColor: '#707071',
            gridLineColor: '#d9d9d9',
            zeroLineColor: '#b3b3b3',
            // Responsive font sizes
            mobileFontSize: '0.875rem',
            desktopFontSize: '1rem',
        };

        // These options can be set globally for all charts
        this.options = {
            colors: theme === 'primary' ? this.constants.primaryTheme : this.constants.alternateTheme,
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
                symbolWidth: type === 'line' ? 20 : 12,
                symbolHeight: type === 'line' ? 3 : 12,
                margin: 30,
                itemStyle: {
                    color: this.constants.labelColor,
                    fontSize: this.constants.desktopFontSize,
                    fontWeight: 'normal',
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

export default ChartOptions;
