import marked from 'marked';
import nunjucks from 'nunjucks';
import nunjucksMarkdown from 'nunjucks-markdown';

import setAttribute from './filters/set-attribute.js';
import setAttributes from './filters/set-attributes.js';
import * as helpers from './helpers/index.js';

export default function createNunjucksEnvironment() {
  const templatePaths = ['src', 'src/views'];
  const nunjucksLoader = new nunjucks.FileSystemLoader(templatePaths, { noCache: true });

  const nunjucksEnvironment = new nunjucks.Environment(nunjucksLoader);

  nunjucksEnvironment.addFilter('setAttribute', setAttribute);
  nunjucksEnvironment.addFilter('setAttributes', setAttributes);

  nunjucksEnvironment.addGlobal('helpers', {
    generateExampleParams: helpers.generateExampleParams,
    navigationHelper: helpers.navigationHelper,
    subNavigationHelper: helpers.subNavigationHelper,
    addDependency: () => {},
  });

  nunjucksMarkdown.register(nunjucksEnvironment, marked);

  return nunjucksEnvironment;
}
