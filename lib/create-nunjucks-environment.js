import nunjucks from 'nunjucks';

import setAttribute from './filters/set-attribute.js';
import setAttributes from './filters/set-attributes.js';

export default function createNunjucksEnvironment(loader) {
  const templatePaths = ['src'];
  const nunjucksLoader = loader ?? new nunjucks.FileSystemLoader(templatePaths, { noCache: true });

  const nunjucksEnvironment = new nunjucks.Environment(nunjucksLoader);

  nunjucksEnvironment.addFilter('setAttribute', setAttribute);
  nunjucksEnvironment.addFilter('setAttributes', setAttributes);

  return nunjucksEnvironment;
}
