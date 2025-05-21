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
        { name: 'Category 1', data: [5, 15, 25], dataLabels: true, tooltipSuffix: 'kg', marker: true, connectNulls: true },
        { name: 'Category 2', data: [10, 20, 30], dataLabels: true, tooltipSuffix: 'kg', marker: true, connectNulls: true },
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

export const EXAMPLE_AREA_CHART_PARAMS = {
    chartType: 'area',
    theme: 'primary',
    title: 'Example Area Chart',
    subtitle: 'A sample subtitle',
    id: 'area-chart-123',
    xAxis: { title: 'X Axis Title', categories: ['Jan', 'Feb', 'Mar'] },
    yAxis: { title: 'Y Axis Title' },
    series: [
        { name: 'Series 1', data: [10, 20, 30] },
        { name: 'Series 2', data: [15, 25, 35] },
    ],
    percentageHeightDesktop: 50,
    percentageHeightMobile: 120,
};

export const EXAMPLE_INVALID_CHART_PARAMS = {
    chartType: 'invalid',
    title: 'Example Invalid Chart',
    subtitle: 'A sample subtitle',
    id: 'invalid-chart-123',
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
};

export const EXAMPLE_LINE_CHART_WITH_RANGE_ANNOTATION_ON_X_AXIS_PARAMS = {
    chartType: 'line',
    title: 'Example Line Chart with range annotations',
    subtitle: 'A sample subtitle',
    id: 'line-chart-range-annotations-x-axis-123',
    xAxis: { title: 'X Axis Title', categories: ['Jan', 'Feb', 'Mar'] },
    yAxis: { title: 'Y Axis Title' },
    series: [
        { name: 'Series 1', data: [10, 20, 30] },
        { name: 'Series 2', data: [15, 25, 35] },
    ],
    rangeAnnotations: [
        {
            text: 'A test x axis range annotation',
            range: { axisValue1: 10, axisValue2: 15 },
            axis: 'x',
            labelOffsetX: 150,
            labelOffsetY: 0,
        },
    ],
};

export const EXAMPLE_LINE_CHART_WITH_RANGE_ANNOTATION_ON_Y_AXIS_WITH_LABEL_WIDTH_PARAMS = {
    chartType: 'line',
    title: 'Example Line Chart with range annotations',
    subtitle: 'A sample subtitle',
    id: 'line-chart-range-annotations-y-axis-123',
    xAxis: { title: 'X Axis Title', categories: ['Jan', 'Feb', 'Mar'] },
    yAxis: { title: 'Y Axis Title' },
    series: [
        { name: 'Series 1', data: [10, 20, 30] },
        { name: 'Series 2', data: [15, 25, 35] },
    ],
    rangeAnnotations: [
        {
            text: 'A test y axis range annotation with a label width of 250px',
            range: { axisValue1: 5, axisValue2: 10 },
            axis: 'y',
            labelWidth: 250,
            labelOffsetX: 150,
            labelOffsetY: 0,
        },
    ],
};

export const EXAMPLE_LINE_CHART_WITH_RANGE_ANNOTATION_WITH_LABEL_INSIDE_PARAMS = {
    chartType: 'line',
    title: 'Example Line Chart with range annotations',
    subtitle: 'A sample subtitle',
    id: 'line-chart-range-annotations-label-inside-123',
    xAxis: { title: 'X Axis Title', categories: ['Jan', 'Feb', 'Mar'] },
    yAxis: { title: 'Y Axis Title' },
    series: [
        { name: 'Series 1', data: [10, 20, 30] },
        { name: 'Series 2', data: [15, 25, 35] },
    ],
    rangeAnnotations: [
        {
            text: 'A test y axis range annotation with the label inside',
            range: { axisValue1: 5, axisValue2: 10 },
            axis: 'y',
            labelInside: true,
            labelWidth: 250,
        },
    ],
};

export const EXAMPLE_LINE_CHART_WITH_MIXED_ANNOTATION_TYPES_PARAMS = {
    chartType: 'line',
    title: 'Example Line Chart with mixed annotation types',
    subtitle: 'A sample subtitle',
    id: 'line-chart-mixed-annotation-types-123',
    xAxis: { title: 'X Axis Title', categories: ['Jan', 'Feb', 'Mar'] },
    yAxis: { title: 'Y Axis Title' },
    series: [
        { name: 'Series 1', data: [10, 20, 30] },
        { name: 'Series 2', data: [15, 25, 35] },
    ],
    annotations: [
        {
            text: 'A test point annotation',
            point: { x: 2, y: 3 },
            labelOffsetX: 10,
            labelOffsetY: -50,
        },
    ],
    rangeAnnotations: [
        {
            text: 'A test x axis range annotation',
            range: { axisValue1: 10, axisValue2: 15 },
            axis: 'x',
            labelOffsetX: 150,
            labelOffsetY: 0,
        },
        {
            text: 'A test y axis range annotation with the label inside',
            range: { axisValue1: 5, axisValue2: 10 },
            axis: 'y',
            labelInside: true,
            labelWidth: 250,
        },
    ],
};

export const EXAMPLE_BOXPLOT_CHART_PARAMS = {
    chartType: 'boxplot',
    theme: 'primary',
    title: 'Example Boxplot Chart',
    subtitle: 'A sample subtitle',
    id: 'uuid',
    legend: true,
    series: [
        {
            data: [
                [760, 801, 848, 895, 965],
                [733, 853, 939, 980, 1080],
                [714, 762, 817, 870, 918],
                [724, 802, 806, 871, 950],
                [834, 836, 864, 882, 910],
                [939, 939, 939, 939, 939],
                [817, 817, 817, 817, 817],
                [806, 806, 806, 806, 806],
                [864, 864, 864, 864, 864],
            ],
            dataLabels: false,
            name: 'Net debt',
        },
    ],
    xAxis: {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        title: 'Years',
        type: 'linear',
        tickIntervalMobile: 5,
    },
    yAxis: {
        title: 'Percentage of GDP',
    },
    percentageHeightDesktop: 35,
    percentageHeightMobile: 90,
};

export const EXAMPLE_COLUMN_RANGE_CHART_PARAMS = {
    chartType: 'columnrange',
    theme: 'primary',
    title: 'Food stores showed a strong rise on the month, while non-food stores fell',
    subtitle:
        'Figure 6: Upward contribution from housing and household services (including energy) saw the annual CPIH inflation rate rise',
    id: 'uuid',
    legend: true,
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        type: 'linear',
        title: 'Categories',
    },
    yAxis: {
        title: 'Temperature ( °C )',
    },
    series: [
        {
            data: [
                [-9.5, 8.0],
                [-7.8, 8.3],
                [-13.1, 9.2],
                [-4.4, 15.7],
                [-1.0, 20.8],
                [3.1, 28.4],
                [5.9, 27.0],
                [4.6, 23.0],
                [4.9, 19.3],
                [-5.2, 11.6],
                [],
                [-10.5, 12.0],
                [-12.1, 18.5],
            ],
            dataLabels: true,
            name: 'Values',
        },
        {
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 3, 11, 12],
            marker: true,
            dataLabels: false,
            name: 'Another test data source',
            type: 'scatter',
        },
    ],
};
