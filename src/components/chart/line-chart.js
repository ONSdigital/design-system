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
                    marker: {
                        enabled: false,
                    },
                },
            },
        };
    };

    updateLastPointMarker = (currentChart) => {
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
                    },
                    false,
                );
            }
        });
    };
}

export default LineChart;
