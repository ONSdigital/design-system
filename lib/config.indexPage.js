import { renderSearch } from './build-search-index';
import createNunjucksEnvironment from './create-nunjucks-environment';

export const pages = [
    { title: 'Components', uri: '/components' },
    { title: 'Patterns', uri: '/patterns' },
    { title: 'Foundations', uri: '/foundations' },
];

export const pagesWithIndex = pages.map((page) => ({ ...page, uri: `${page.uri}/index.html` }));

export const title = 'ONS Design System';

const nunjucksEnvironment = createNunjucksEnvironment();
const PROJECT_PATH = process.cwd();
export const pageSearch = renderSearch(`${PROJECT_PATH}/src/layout/_dsTemplate.njk`, nunjucksEnvironment);
