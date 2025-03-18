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

    // Set the spacing between each bar to be 2px (a point padding that equates to 1px on each side)
    // For charts with fewer than 5 categories, we use a wider point padding equivalent to 5px (10px gap between bars)
    // For cluster charts we use 0 for the point padding and a group padding equivalent to 7px (14px gap between bars)
    updatePointPadding = (config, currentChart, stackedLayout) => {
        const numberOfCategories = config.xAxis.categories.length;
        const numberOfSeries = currentChart.series.length; // Get number of bar series
        const chartWidth = currentChart.plotBox.width;
        let unitWidth = chartWidth / numberOfCategories;

        // Work out the poing padding decimal value
        let pointPadding = 0;
        let groupPadding = 0;
        // non-clustered charts or stacked charts
        if (numberOfSeries === 1 || stackedLayout === true) {
            if (numberOfCategories > 5) {
                pointPadding = 1 / unitWidth;
            } else {
                pointPadding = 5 / unitWidth;
            }
        } else {
            // clustered charts
            groupPadding = 7 / unitWidth;
        }

        // update the point width and padding
        currentChart.series.forEach((series) => {
            series.update({
                pointPadding: pointPadding,
                groupPadding: groupPadding,
            });
        });
    };
}

export default ColumnChart;
