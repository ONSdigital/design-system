import renderExample from './render-example';
import createPageList from './create-page-list';
import renderPageList from './render-page-list';
import createNunjucksEnvironment from './create-nunjucks-environment.js';

const PROJECT_PATH = process.cwd();
const nunjucksEnvironment = createNunjucksEnvironment();

export async function handleTypeRoute(req, res) {
  const params = req.params;
  let name = params.name;
  const pages = name ? await createPageList(res, params.type, name) : await createPageList(res, params.type);
  const title = name ? `"${name}" examples` : `${params.type.charAt(0).toUpperCase()}${params.type.slice(1)}`;
  const output = renderPageList(pages, title);

  return output;
}

export async function handleExamplesRoute(req) {
  const params = req.params;
  const output = renderExample(`${PROJECT_PATH}/src/${params.type}/${params.name}/${params.exampleName}.njk`, nunjucksEnvironment);

  return output;
}
