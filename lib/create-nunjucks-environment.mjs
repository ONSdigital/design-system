import nunjucks from 'nunjucks';

import setAttribute from './filters/set-attribute.mjs';
import setAttributes from './filters/set-attributes.mjs';
import tojson from './filters/tojson.mjs';
import extend from './functions/extend.mjs';

export default function createNunjucksEnvironment(loader) {
    const templatePaths = ['src'];
    const nunjucksLoader = loader ?? new nunjucks.FileSystemLoader(templatePaths, { noCache: true });

    const nunjucksEnvironment = new nunjucks.Environment(nunjucksLoader);

    nunjucksEnvironment.addFilter('setAttribute', setAttribute);
    nunjucksEnvironment.addFilter('setAttributes', setAttributes);
    nunjucksEnvironment.addFilter('tojson', tojson);
    nunjucksEnvironment.addGlobal('extend', extend);

    return nunjucksEnvironment;
}
