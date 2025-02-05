module.exports = {
    ci: {
        collect: {
            staticDistDir: './build',
            url: require('./urls.json').urls,
            // url: [
            //     'components/radios/example-radios-with-revealed-text-input.html',
            //     'components/radios/example-radios-with-revealed-text-input-expanded.html',
            //     'components/radios/example-radios-with-revealed-text-area.html',
            //     'components/radios/example-radios-with-revealed-text-area-expanded.html',
            //     'components/radios/example-radios-with-revealed-select.html',
            //     'components/radios/example-radios-with-revealed-select-expanded.html',
            //     'components/radios/example-radios-with-revealed-radios.html',
            //     'components/radios/example-radios-with-revealed-radios-expanded.html',
            //     'components/radios/example-radios-with-revealed-checkboxes.html',
            //     'components/radios/example-radios-with-revealed-checkboxes-expanded.html',
            //     'components/radios/example-radios-with-clear-button.html',
            //     'components/radios/example-radios-with-clear-button-expanded.html',
            //     'patterns/correct-errors/example-errors-proto.html',
            //     'patterns/correct-errors/example-errors-proto-errors.html',
            //     'patterns/feedback/example-feedback-form.html',
            //     'patterns/feedback/example-feedback-form-errors.html',
            //     'components/accordion/example-accordion.html',
            //     'components/button/example-button-custom.html',
            //     'components/button/example-button-download.html',
            // ],
            numberOfRuns: 1,
            settings: {
                onlyCategories: ['accessibility'],
            },
        },
        assert: {
            assertMatrix: [
                {
                    matchingUrlPattern:
                        '^/(?!components/radios/example-radios-with-revealed-|patterns/correct-errors/exampleerrors-proto-).*',
                    assertions: {
                        'categories:accessibility': ['warn', { minScore: 1 }],
                    },
                },
                {
                    matchingUrlPattern: 'components/radios/example-radios-with-revealed-.*',
                    assertions: {
                        'categories:accessibility': ['warn', { minScore: 0.91 }],
                    },
                },
                {
                    matchingUrlPattern: 'patterns/correct-errors/example-errors-proto-.*',
                    assertions: {
                        'categories:accessibility': ['warn', { minScore: 0.94 }],
                    },
                },
                {
                    matchingUrlPattern: 'patterns/feedback/example-feedback-form-.*',
                    assertions: {
                        'categories:accessibility': ['warn', { minScore: 0.94 }],
                    },
                },
            ],
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
