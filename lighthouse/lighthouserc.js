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
            assertMatrix: [
                {
                    matchingUrlPattern: 'components/radios/example-radios-with-revealed.*',
                    assertions: {
                        'categories:accessibility': ['error', { minScore: 0.91 }],
                    },
                },
                {
                    matchingUrlPattern: 'components/radios/example-radios-with-clear-button.*',
                    assertions: {
                        'categories:accessibility': ['error', { minScore: 0.94 }],
                    },
                },
                {
                    matchingUrlPattern: 'patterns/feedback/example-feedback-form.*|patterns/correct-errors/example-errors-proto.*',
                    assertions: {
                        'categories:accessibility': ['error', { minScore: 0.94 }],
                    },
                },
                {
                    matchingUrlPattern:
                        '^(?!.*components/radios/example-radios-with-revealed.*|.*components/radios/example-radios-with-clear-button.*|.*patterns/correct-errors/example-errors-proto.*|.*patterns/feedback/example-feedback-form.*).*',
                    assertions: {
                        'categories:accessibility': ['error', { minScore: 1 }],
                    },
                },
            ],
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
