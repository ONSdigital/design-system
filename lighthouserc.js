module.exports = {
  ci: {
    collect: {
      staticDistDir: './build',
      numberOfRuns: 1,
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
