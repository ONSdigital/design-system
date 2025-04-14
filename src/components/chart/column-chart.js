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

    // Set the point padding between each bar to be 3% (an overall gap of 6%)
    // For charts with fewer than 5 categories, we use a wider point padding of 4% (8% gap between bars)
    // For cluster charts we use 0 for the point padding and a group padding of 4% (8% gap between bars)
    updatePointPadding = (config, currentChart, stackedLayout, numberOfExtraLines) => {
        const numberOfCategories = config.xAxis.categories.length;
        const numberOfSeries = currentChart.series.length - numberOfExtraLines; // Get number of column series
        let pointPadding = 0;
        let groupPadding = 0;
        // non-clustered charts or stacked charts
        if (numberOfSeries === 1 || stackedLayout === true) {
            if (numberOfCategories > 5) {
                pointPadding = 0.03;
            } else {
                pointPadding = 0.04;
            }
        } else {
            // clustered charts
            groupPadding = 0.04;
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
