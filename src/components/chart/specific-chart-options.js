class SpecificChartOptions {
    constructor(theme, type) {
        this.constants = {
            primaryTheme: ['#206095', '#27a0cc', '#003c57', '#118c7b', '#a8bd3a', '#871a5b', '#f66068', '#746cb1', '#22d0b6'],
            // Alternate theme colours from https://service-manual.ons.gov.uk/data-visualisation/colours/using-colours-in-charts
            alternateTheme: ['#206095', '#27A0CC', '#871A5B', '#A8BD3A', '#F66068'],
            labelColor: '#414042',
            desktopFontSize: '1rem',
        };

        this.options = {
            colors: theme === 'primary' ? this.constants.primaryTheme : this.constants.alternateTheme,
            legend: {
                align: 'left',
                verticalAlign: 'top',
                layout: 'horizontal',
                symbolWidth: type === 'line' ? 20 : 12,
                symbolHeight: type === 'line' ? 3 : 12,
                margin: 50,
                itemStyle: {
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
            chart: {
                //marginRight: 250,
                events: {
                    load: (event) => {
                        const currentChart = event.target;
                        currentChart.update(
                            {
                                chart: {
                                    marginTop: currentChart.legend.display ? undefined : 50, // Only set marginTop when legend is off
                                },
                            },
                            false,
                            false,
                        );

                        if (type === 'line') {
                            currentChart.series.forEach((series) => {
                                const points = series.points;
                                if (points && points.length > 0) {
                                    // Show only the last point marker
                                    const lastPoint = points[points.length - 1];
                                    lastPoint.update(
                                        {
                                            marker: {
                                                enabled: true,
                                                radius: 4,
                                                symbol: 'circle',
                                                fillColor: series.color,
                                                lineWidth: 0,
                                            },
                                            // dataLabels: {
                                            //     enabled: true,
                                            //     format: `{series.name}`,
                                            //     align: 'left',
                                            //     verticalAlign: 'center',
                                            //     color: series.color,
                                            //     x: 5,
                                            //     y: 2,
                                            //     allowOverlap: true,
                                            //     crop: false,
                                            //     overflow: 'none',
                                            // },
                                        },
                                        false,
                                    );
                                }
                            });

                            currentChart.redraw();
                        }
                    },
                },
            },
        };
    }

    getOptions = () => this.options;
}

export default SpecificChartOptions;
