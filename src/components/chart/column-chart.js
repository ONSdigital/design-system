class ColumnChart {
    getColumnChartOptions = (useStackedLayout) => {
        return {
            plotOptions: {
                column: {
                    pointPadding: 0,
                    groupPadding: 0,
                    borderRadius: 0,
                    borderWidth: 0,
                },
                series: {
                    stacking: useStackedLayout ? 'normal' : null,
                },
            },
        };
    };

    // Set the point padding between each bar
    // For charts with fewer than 5 categories, we use a wider point padding of 2%
    // For cluster charts we use 0 for the point padding and a group padding of 2%
    updatePointPadding = (config, currentChart, stackedLayout, numberOfExtraLines, isMobile = false) => {
        const numberOfCategories = config.xAxis.categories.length;
        const numberOfSeries = currentChart.series.length - numberOfExtraLines; // Get number of column series
        // Guidelines
        const categoryThreshold = isMobile ? 10 : 20;
        const maxPointWidth = isMobile ? 55 : 75;

        let pointPadding = 0;
        let groupPadding = 0;

        // non-clustered charts or stacked charts
        if (numberOfSeries === 1 || stackedLayout === true) {
            pointPadding = numberOfCategories >= categoryThreshold ? 0.1 : 0.2;
        } else {
            // clustered charts
            groupPadding = numberOfCategories >= categoryThreshold ? 0.1 : 0.2;
        }

        // update the point width and padding
        currentChart.series.forEach((series) => {
            series.update({
                pointPadding: pointPadding,
                groupPadding: groupPadding,
                maxPointWidth: maxPointWidth,
            });
        });
    };
}

export default ColumnChart;
