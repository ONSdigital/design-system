export const pages = [
  { title: 'Components', uri: '/components' },
  { title: 'Patterns', uri: '/patterns' },
  { title: 'Foundations', uri: '/foundations' },
];

export const pagesWithIndex = pages.map(page => ({ ...page, uri: `${page.uri}/index.html` }));

export const title = 'ONS Design System';
