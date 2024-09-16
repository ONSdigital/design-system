module.exports = {
    ci: {
        collect: {
            url: require('./lighthouse/urls.json').urls,
            numberOfRuns: 1,
            settings: {
                onlyCategories: ['accessibility'],
            },
        },
        assert: {
            assertions: {
                'categories:accessibility': ['warn', { minScore: 1 }],
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
