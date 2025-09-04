class AreaChart {
    getAreaChartOptions = () => {
        return {
            legend: {
                symbolWidth: 12,
                symbolHeight: 12,
            },
            plotOptions: {
                area: {
                    fillOpacity: 1,
                    // Use a circle instead of the default blob plus line icon
                    // 'rectangle' counterintuitively gives a circle, because the legend icon has a border radius of half it's height by default
                    legendSymbol: 'rectangle',
                    stacking: 'normal',
                    lineWidth: 0,
                },
                series: {
                    marker: {
                        enabled: false,
                    },
                },
            },
        };
    };
}

export default AreaChart;
