class ColumnChart {
    getColumnChartOptions = (config, useStackedLayout, extraLines) => {
        return {
            plotOptions: {
                column: {
                    ...this.getPointPadding(config, useStackedLayout, extraLines, false),
                    borderRadius: 0,
                    borderWidth: 0,
                },
                series: {
                    stacking: useStackedLayout ? 'normal' : null,
                },
            },
        };
    };

    getColumnChartMobileOptions = (config, useStackedLayout, extraLines) => {
        return {
            plotOptions: {
                column: {
                    ...this.getPointPadding(config, useStackedLayout, extraLines, true),
                },
            },
        };
    };

    // Set spacing between bars based on screen size and number of categories:
    // - For charts with enough categories (≥ 10 on mobile, ≥ 20 on desktop), use 10% spacing (0.1), i.e. 20% total gap between bars
    // - For charts with fewer categories, use 20% spacing (0.2), i.e. 40% total gap
    // - For non-clustered or stacked charts, spacing is applied as pointPadding
    // - For clustered charts, spacing is applied as groupPadding
    // - Max bar width: 75px (desktop), 55px (mobile)
    getPointPadding = (config, stackedLayout, numberOfExtraLines, isMobile) => {
        const numberOfCategories = config.xAxis.categories ? config.xAxis.categories.length : 0;
        const numberOfSeries = config.series.length - numberOfExtraLines; // Get number of column series

        const categoryThreshold = isMobile ? 10 : 20;
        const maxPointWidth = isMobile ? 55 : 75;

        let pointPadding = 0;
        let groupPadding = 0;
        let spacing = numberOfCategories >= categoryThreshold ? 0.1 : 0.2;

        // non-clustered charts or stacked charts
        if (numberOfSeries === 1 || stackedLayout === true) {
            pointPadding = spacing;
        }
        // clustered charts
        else {
            groupPadding = spacing;
        }

        return { pointPadding: pointPadding, groupPadding: groupPadding, maxPointWidth: maxPointWidth };
    };
}

export default ColumnChart;
