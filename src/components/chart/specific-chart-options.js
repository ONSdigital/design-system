import ChartConstants from './chart-constants';

// Options that rely on the chart config but are not specific to the chart type
class SpecificChartOptions {
    constructor(theme, type, config) {
        this.constants = ChartConstants.constants();
        this.theme = theme;
        this.config = config;

        this.options = {
            colors: this.theme === 'primary' ? this.constants.primaryTheme : this.constants.alternateTheme,
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
                                // If markers are disabled, hide them all but the last point marker
                                if (series.options.marker.enabled.enabled === undefined) {
                                    const points = series.points;
                                    if (points && points.length > 0) {
                                        // Show only the last point marker
                                        const lastPoint = points[points.length - 1];
                                        lastPoint.update(
                                            {
                                                marker: {
                                                    enabled: true,
                                                },
                                            },
                                            false,
                                        );
                                    }
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
