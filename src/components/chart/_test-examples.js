export const EXAMPLE_LINE_CHART_REQUIRED_PARAMS = {
    chartType: 'line',
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
    chartType: 'line',
    theme: 'alternate',
    title: 'Example Line Chart',
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
    percentageHeightDesktop: 50,
    percentageHeightMobile: 120,
};

export const EXAMPLE_BAR_CHART_PARAMS = {
    chartType: 'bar',
    theme: 'alternate',
    title: 'Example Bar Chart',
    subtitle: 'A sample subtitle',
    id: 'bar-chart-123',
    xAxis: { title: 'X Axis Title', categories: ['Jan', 'Feb', 'Mar'] },
    yAxis: { title: 'Y Axis Title' },
    series: [
        { name: 'Series 1', data: [10, 20, 30] },
        { name: 'Series 2', data: [15, 25, 35] },
    ],
};

export const EXAMPLE_BAR_CHART_WITH_PERCENTAGE_HEIGHT_PARAMS = {
    chartType: 'bar',
    theme: 'alternate',
    title: 'Example Bar Chart',
    subtitle: 'A sample subtitle',
    id: 'bar-chart-123',
    xAxis: { title: 'X Axis Title', categories: ['Jan', 'Feb', 'Mar'] },
    yAxis: { title: 'Y Axis Title' },
    series: [
        { name: 'Series 1', data: [10, 20, 30] },
        { name: 'Series 2', data: [15, 25, 35] },
    ],
    percentageHeightDesktop: 50,
    percentageHeightMobile: 120,
};

export const EXAMPLE_BAR_WITH_LINE_CHART_PARAMS = {
    chartType: 'bar',
    theme: 'alternate',
    title: 'Example Bar Chart',
    subtitle: 'A sample subtitle',
    id: 'bar-chart-123',
    xAxis: { title: 'X Axis Title', categories: ['Jan', 'Feb', 'Mar'] },
    yAxis: { title: 'Y Axis Title' },
    series: [
        { name: 'Series 1', data: [10, 20, 30] },
        { name: 'Series 2', data: [15, 25, 35], type: 'line' },
    ],
};

export const EXAMPLE_COLUMN_CHART_PARAMS = {
    chartType: 'column',
    theme: 'alternate',
    title: 'Example Column Chart',
    subtitle: 'A sample subtitle',
    id: 'column-chart-123',
    xAxis: { title: 'X Axis Title', categories: ['Jan', 'Feb', 'Mar'] },
    yAxis: { title: 'Y Axis Title' },
    series: [
        { name: 'Series 1', data: [10, 20, 30] },
        { name: 'Series 2', data: [15, 25, 35] },
    ],
    percentageHeightDesktop: 50,
    percentageHeightMobile: 120,
};

export const EXAMPLE_LINE_CHART_WITH_ANNOTATIONS_PARAMS = {
    chartType: 'line',
    title: 'Example Line Chart with annotations',
    subtitle: 'A sample subtitle',
    id: 'line-chart-annotations-123',
    xAxis: { title: 'X Axis Title', categories: ['Jan', 'Feb', 'Mar'] },
    yAxis: { title: 'Y Axis Title' },
    series: [
        { name: 'Series 1', data: [10, 20, 30] },
        { name: 'Series 2', data: [15, 25, 35] },
    ],
    annotations: [
        {
            text: 'A test annotation',
            point: { x: 10, y: 1.3 },
            labelOffsetX: 10,
            labelOffsetY: -50,
        },
        {
            text: 'Another test annotation',
            point: { x: 48, y: 1.8 },
            labelOffsetX: 30,
            labelOffsetY: -70,
        },
    ],
};

export const EXAMPLE_BAR_CHART_WITH_ANNOTATIONS_PARAMS = {
    chartType: 'bar',
    theme: 'alternate',
    title: 'Example Bar Chart',
    subtitle: 'A sample subtitle',
    id: 'bar-chart-annotations-123',
    config: {
        chart: { type: 'bar' },
        xAxis: { title: { text: 'X Axis Title' }, categories: ['Jan', 'Feb', 'Mar'] },
        yAxis: { title: { text: 'Y Axis Title' } },
        series: [
            { name: 'Series 1', data: [10, 20, 30] },
            { name: 'Series 2', data: [15, 25, 35] },
        ],
    },
    annotations: [
        {
            text: 'A test annotation',
            point: { x: 2, y: 3 },
            labelOffsetX: 10,
            labelOffsetY: -50,
        },
    ],
};

export const EXAMPLE_COLUMN_CHART_WITH_ANNOTATIONS_PARAMS = {
    chartType: 'column',
    theme: 'alternate',
    title: 'Example Column Chart',
    subtitle: 'A sample subtitle',
    id: 'column-chart-annotations-123',
    config: {
        chart: { type: 'column' },
        xAxis: { title: { text: 'X Axis Title' }, categories: ['Jan', 'Feb', 'Mar'] },
        yAxis: { title: { text: 'Y Axis Title' } },
        series: [
            { name: 'Series 1', data: [10, 20, 30] },
            { name: 'Series 2', data: [15, 25, 35] },
        ],
    },
    annotations: [
        {
            text: 'A test annotation',
            point: { x: 11, y: 31.8 },
            labelOffsetX: 10,
            labelOffsetY: -50,
        },
    ],
};

export const EXAMPLE_COLUMN_WITH_LINE_CHART_PARAMS = {
    chartType: 'column',
    theme: 'alternate',
    title: 'Example Column Chart',
    subtitle: 'A sample subtitle',
    id: 'column-chart-123',
    xAxis: { title: 'X Axis Title', categories: ['Jan', 'Feb', 'Mar'] },
    yAxis: { title: 'Y Axis Title' },
    series: [
        { name: 'Series 1', data: [10, 20, 30] },
        { name: 'Series 2', data: [15, 25, 35], type: 'line' },
    ],
};

export const EXAMPLE_SCATTER_CHART_PARAMS = {
    chartType: 'scatter',
    theme: 'primary',
    title: 'Example Scatter Chart',
    subtitle: 'A sample subtitle',
    id: 'scatter-chart-123',
    legend: true,
    xAxis: { title: 'X Axis Title' },
    yAxis: { title: 'Y Axis Title' },
    series: [
        {
            name: 'Female',
            data: [
                [161.2, 51.6],
                [167.5, 59.0],
                [159.5, 49.2],
                [157.0, 63.0],
            ],
        },
        {
            name: 'Male',
            data: [
                [174.0, 65.6],
                [175.3, 71.8],
                [193.5, 80.7],
                [186.5, 72.6],
            ],
        },
    ],
};
