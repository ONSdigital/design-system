class ColumnChart {
    getColumnChartOptions = (config, useStackedLayout, extraLines) => {
        return {
            plotOptions: {
                column: {
                    borderRadius: 0,
                    borderWidth: 0,
                    ...this.getPointPadding(config, useStackedLayout, extraLines, false),
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

    getPointPadding = (config, stackedLayout, numberOfExtraLines, isMobile) => {
        const numberOfCategories = config.xAxis.categories.length;
        const numberOfSeries = config.series.length - numberOfExtraLines; // Get number of column series
        // Guidelines
        const categoryThreshold = isMobile ? 10 : 20;
        const maxPointWidth = isMobile ? 55 : 75;

        let pointPadding = 0;
        let groupPadding = 0;

        // non-clustered charts or stacked charts
        if (numberOfSeries === 1 || stackedLayout === true) {
            pointPadding = numberOfCategories >= categoryThreshold ? 0.05 : 0.1;
        } else {
            // clustered charts
            groupPadding = numberOfCategories >= categoryThreshold ? 0.05 : 0.1;
        }

        return { pointPadding: pointPadding, groupPadding: groupPadding, maxPointWidth: maxPointWidth };
    };
}

export default ColumnChart;
