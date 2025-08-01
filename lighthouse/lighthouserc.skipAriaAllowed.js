module.exports = {
    ci: {
        collect: {
            staticDistDir: './build',
            url: require('./urls.json').urlsWithKnownIssues,
            numberOfRuns: 1,
            settings: {
                onlyCategories: ['accessibility'],
                skipAudits: ['aria-allowed-attr'], // skips aria-allowed-attr audit for the urls in skipurls array
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
