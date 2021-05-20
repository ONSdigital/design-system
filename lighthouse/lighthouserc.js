module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      settings: {
        onlyCategories: ['accessibility'],
      },
    },
    preset: 'lighthouse:no-pwa',
    assertions: {
      'categories:accessibility': ['warn', { minScore: 0.9 }],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
