module.exports = {
    ci: {
        collect: {
            staticDistDir: './build',
            url: require('./urls.json').skipurls,
            numberOfRuns: 1,
            settings: {
                onlyCategories: ['accessibility'],
                skipAudits: ['aria-allowed-attr'], // skips aria-allowed-attr audit for the urls in skipurls array
            },
        },
        assert: {
            assertions: {
                'categories:accessibility': ['warn', { minScore: 1 }],
            },
        },
        upload: {
            target: 'temporary-public-storage',
            githubToken: process.env.LHCI_GITHUB_APP_TOKEN,
            githubStatusCheck: 'failure-only',
        },
    },
};
