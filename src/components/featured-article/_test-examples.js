export const EXAMPLE_FEATURED_ARTICLE_WITH_CHART = {
    title: {
        text: 'Economic Trends 2024',
        url: '/economy/economic-trends-2024',
    },
    metadata: {
        date: {
            prefix: 'Released',
            showPrefix: true,
            iso: '2024-05-01',
            short: '1 May 2024',
        },
        object: {
            text: 'Bulletin',
            url: '/bulletins/economic-trends',
        },
        file: {
            fileType: 'PDF',
            fileSize: '1MB',
            filePages: '12 pages',
        },
    },
    chart: {
        chartType: 'line',
        title: 'Economic Growth Over Time',
        id: 'growth-chart',
        description: 'This chart shows GDP growth',
        theme: 'default',
        headingLevel: 3,
        legend: true,
        xAxis: { title: { text: 'Year' } },
        yAxis: { title: { text: 'GDP (%)' } },
        series: [{ name: 'GDP', data: [2.1, 2.3, 1.8] }],
        annotations: [],
        rangeAnnotations: [],
        referenceLineAnnotations: [],
        estimateLineLabel: 'Estimate',
        uncertaintyRangeLabel: 'Range',
        isChartInverted: false,
        useStackedLayout: false,
        percentageHeightDesktop: 60,
        percentageHeightMobile: 40,
    },
    itemsList: [
        {
            text: 'Download full report',
            url: '/downloads/full-report.pdf',
        },
    ],
};

export const EXAMPLE_FEATURED_ARTICLE_WITH_IMAGE = {
    title: {
        text: 'Population Insights',
        url: '/people/population/insights',
    },
    metadata: {
        date: {
            iso: '2024-04-01',
            short: '1 April 2024',
        },
        object: {
            text: 'Article',
        },
    },
    image: {
        src: 'example.png',
        alt: 'Example alt text',
    },
    itemsList: [
        {
            text: 'View data tables',
            url: '/downloads/data-tables.xlsx',
        },
    ],
};
