class LineChart {
    getLineChartOptions = () => {
        return {
            legend: {
                // Specific legend symbol width and height for line charts
                symbolWidth: 20,
                symbolHeight: 3,
            },
            plotOptions: {
                line: {
                    lineWidth: 3,
                    linecap: 'round',
                    // In a later PR we will update the marker styles
                    marker: {
                        enabled: false,
                        radius: 4,
                        symbol: 'circle',
                        lineWidth: 0,
                    },
                },
            },
        };
    };

    getPlotOptionsOnly = () => {
        return this.getLineChartOptions().plotOptions;
    };

    updateLastPointMarker = (series) => {
        series.forEach((series) => {
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
    };
}

export default LineChart;
