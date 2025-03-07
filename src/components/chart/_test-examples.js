export const EXAMPLE_CHART_REQUIRED_PARAMS = {
    chartType: 'line',
    theme: 'primary',
    title: 'Example Line Chart',
    subtitle: 'A sample subtitle',
    uuid: 'chart-123',
    config: {
        chart: { type: 'line' },
        xAxis: { title: { text: 'X Axis Title' }, categories: ['Jan', 'Feb', 'Mar'] },
        yAxis: { title: { text: 'Y Axis Title' } },
        series: [
            { name: 'Series 1', data: [10, 20, 30] },
            { name: 'Series 2', data: [15, 25, 35] },
        ],
    },
};

export const EXAMPLE_CHART_WITH_CONFIG_PARAMS = {
    chartType: 'bar',
    theme: 'alternate',
    title: 'Example Bar Chart',
    subtitle: 'A detailed subtitle',
    uuid: 'chart-456',
    config: {
        chart: { type: 'bar' },
        legend: { enabled: true, align: 'right', verticalAlign: 'top', layout: 'vertical' },
        xAxis: { title: { text: 'X Axis Label' }, categories: ['A', 'B', 'C'] },
        yAxis: { title: { text: 'Y Axis Label' }, reversed: false },
        series: [
            { name: 'Category 1', data: [5, 15, 25] },
            { name: 'Category 2', data: [10, 20, 30] },
        ],
    },
};
