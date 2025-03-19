class SpecificChartOptions {
    constructor(theme, type) {
        this.constants = {
            primaryTheme: ['#206095', '#27a0cc', '#003c57', '#118c7b', '#a8bd3a', '#871a5b', '#f66068', '#746cb1', '#22d0b6'],
            // Alternate theme colours from https://service-manual.ons.gov.uk/data-visualisation/colours/using-colours-in-charts
            alternateTheme: ['#206095', '#27A0CC', '#871A5B', '#A8BD3A', '#F66068'],
            labelColor: '#414042',
            desktopFontSize: '0.875rem',
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
            chart: {
                type: type,
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
                            false,
                        );

                        if (type === 'line') {
                            currentChart.series.forEach((series) => {
                                if (series.options.marker.enabled === 'true') {
                                    series.update(
                                        {
                                            marker: {
                                                enabled: false,
                                            },
                                        },
                                        false,
                                    );
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
                                            },
                                            false,
                                        );
                                    }
                                } else {
                                    series.update(
                                        {
                                            marker: {
                                                enabled: false,
                                            },
                                        },
                                        false,
                                    );
                                }
                            });

                            currentChart.redraw(false);
                        }
                    },
                },
            },
        };
    }

    getOptions = () => this.options;
}

export default SpecificChartOptions;
