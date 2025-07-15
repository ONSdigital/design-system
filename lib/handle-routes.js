import renderExample from './render-example';
import createPageList from './create-page-list';
import renderPageList from './render-page-list';
import createNunjucksEnvironment from './create-nunjucks-environment.js';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const PROJECT_PATH = process.cwd();
const nunjucksEnvironment = createNunjucksEnvironment();
const window = new JSDOM('').window;
const purify = DOMPurify(window);

export async function handleTypeRoute(type, name = null, res) {
    const pages = name ? await createPageList(res, type, name) : await createPageList(res, type);
    const title = name ? `"${name}" examples` : `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
    const output = renderPageList(pages, purify.sanitize(title));

    return output;
}

export async function handleExamplesRoute(type, name, exampleName) {
    const output = renderExample(`${PROJECT_PATH}/src/${type}/${name}/${exampleName}.njk`, nunjucksEnvironment);

    return output;
}
