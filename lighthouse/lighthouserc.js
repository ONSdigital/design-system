module.exports = {
    ci: {
        collect: {
            staticDistDir: './build',
            url: require('./urls.json').urlsWithoutKnownIssues,
            numberOfRuns: 1,
            settings: {
                onlyCategories: ['accessibility'],
            },
        },
        assert: {
            assertions: {
                'categories:accessibility': ['error', { minScore: 1 }],
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
