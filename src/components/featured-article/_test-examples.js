export const EXAMPLE_FEATURED_ARTICLE_WITH_CHART = {
    title: {
        text: 'Economic Trends 2024',
        url: '/economy/economic-trends-2024',
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
        useStackedLayout: false,
        percentageHeightDesktop: 60,
        percentageHeightMobile: 40,
    },
};

export const EXAMPLE_FEATURED_ARTICLE_WITH_IMAGE = {
    title: {
        text: 'Population Insights',
        url: '/people/population/insights',
    },
    image: {
        src: 'example.png',
        alt: 'Example alt text',
    },
};
