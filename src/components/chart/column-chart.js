class ColumnChart {
    getColumnChartOptions = (useStackedLayout) => {
        return {
            plotOptions: {
                column: {
                    pointPadding: 0,
                    groupPadding: 0,
                    //pointWidth: 30,
                    //borderWidth: 0,
                },
                series: {
                    stacking: useStackedLayout ? 'normal' : null,
                },
            },
        };
    };

    // Set the spacing between each bar to be 10px (a point padding that equates to 5px on each side)
    updatePointPadding = (config, currentChart) => {
        const numberOfCategories = config.xAxis.categories.length;
        // const numberOfSeries = currentChart.series.length; // Get number of bar series
        const chartWidth = currentChart.plotBox.width;
        const widthOfEachColumn = chartWidth / numberOfCategories;
        // Work out the poing padding decimal value
        const pointPadding = 5 / widthOfEachColumn;
        // update the point padding
        currentChart.series.forEach((series) => {
            series.update({
                pointPadding: pointPadding,
            });
        });
        // Todo: adjust the point padding for cluster charts
    };
}

export default ColumnChart;
