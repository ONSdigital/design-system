import nunjucks from 'nunjucks';

import setAttribute from './filters/set-attribute.js';
import setAttributes from './filters/set-attributes.js';
import tojson from './filters/tojson';

export default function createNunjucksEnvironment(loader) {
    const templatePaths = ['src'];
    const nunjucksLoader = loader ?? new nunjucks.FileSystemLoader(templatePaths, { noCache: true });

    const nunjucksEnvironment = new nunjucks.Environment(nunjucksLoader);

    nunjucksEnvironment.addFilter('setAttribute', setAttribute);
    nunjucksEnvironment.addFilter('setAttributes', setAttributes);
    nunjucksEnvironment.addFilter('tojson', tojson);

    return nunjucksEnvironment;
}
