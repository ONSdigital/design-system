export const EXAMPLE_LINE_CHART_REQUIRED_PARAMS = {
    chartType: 'line',
    theme: 'primary',
    title: 'Example Line Chart',
    subtitle: 'A sample subtitle',
    id: 'chart-123',
    xAxis: { title: 'X Axis Title', categories: ['Jan', 'Feb', 'Mar'] },
    yAxis: { title: 'Y Axis Title' },
    series: [
        { name: 'Series 1', data: [10, 20, 30] },
        { name: 'Series 2', data: [15, 25, 35] },
    ],
};

export const EXAMPLE_LINE_CHART_WITH_CONFIG_PARAMS = {
    chartType: 'bar',
    theme: 'alternate',
    title: 'Example Bar Chart',
    subtitle: 'A detailed subtitle',
    description: 'A detailed description',
    caption: 'A detailed caption',
    download: {
        title: 'Download this chart',
        itemsList: [
            {
                text: 'Download as PNG',
                url: '#',
            },
            {
                text: 'Download as JPEG',
                url: '#',
            },
        ],
    },
    id: 'chart-456',
    legend: true,
    xAxis: { title: 'X Axis Label', categories: ['A', 'B', 'C'], type: 'linear', labelFormat: '{value:,.f}' },
    yAxis: {
        title: 'Y Axis Label',
        labelFormat: '{value:,.f}',
    },
    series: [
        { name: 'Category 1', data: [5, 15, 25], dataLabels: true, tooltipSuffix: 'kg', marker: true },
        { name: 'Category 2', data: [10, 20, 30], dataLabels: true, tooltipSuffix: 'kg', marker: true },
    ],
};
