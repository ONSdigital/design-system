class ColumnChart {
    getColumnChartOptions = () => {
        return {
            plotOptions: {
                column: {
                    pointPadding: 0,
                    groupPadding: 0,
                    borderRadius: 0,
                    borderWidth: 0,
                },
            },
        };
    };

    // Set the spacing between each bar to be 10px (a point padding that equates to 5px on each side)
    // For charts with fewer than 5 categories, we use a wider point padding equivalent to 7px (14px gap between bars)
    // For cluster charts we use 0 for the point padding and a group padding equivalent to 7px (14px gap between bars)
    updatePointPadding = (config, currentChart) => {
        const numberOfCategories = config.xAxis.categories.length;
        const numberOfSeries = currentChart.series.length; // Get number of bar series
        const chartWidth = currentChart.plotBox.width;
        const widthOfEachColumn = chartWidth / numberOfCategories;
        // Work out the poing padding decimal value
        let pointPadding = 0;
        let groupPadding = 0;
        // non-clustered charts
        if (numberOfSeries == 1) {
            if (numberOfCategories > 5) {
                pointPadding = 5 / widthOfEachColumn;
            } else {
                pointPadding = 7 / widthOfEachColumn;
            }
        } else {
            // clustered charts
            groupPadding = 7 / widthOfEachColumn;
        }
        // update the point padding
        currentChart.series.forEach((series) => {
            series.update({
                pointPadding: pointPadding,
                groupPadding: groupPadding,
            });
        });
    };
}

export default ColumnChart;
