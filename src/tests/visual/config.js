module.exports = {
  version: 1,
  snapshot: {
    widths: [375, 1280],
    'enable-javascript': true,
  },
  'static-snapshots': {
    path: '/',
    'snapshot-files': '**/*.html',
  },
  agent: {
    'asset-discovery': {
      'allowed-hostnames': ['cdn.example.com'],
      'network-idle-timeout': 150, // ms
      'cache-responses': true,
      'page-pool-size-min': 5, // pages
      'page-pool-size-max': 20, // pages
    },
  },
};
