module.exports = {
    ci: {
        collect: {
            staticDistDir: './build',
            url: require('./urls.json').urls,
            numberOfRuns: 1,
            settings: {
                onlyCategories: ['accessibility'],
            },
        },
        assert: {
            assertions: {
                'categories:accessibility': ['error', { minScore: 0.9 }],
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
