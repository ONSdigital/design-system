import frontMatter from 'front-matter';
import fs from 'fs';
import nunjucks from 'nunjucks';

import { getPageInfo } from './helpers/site-map';

export default function renderPage(templatePath, nunjucksEnvironment) {
  try {
    const isExample = templatePath.includes('examples/');

    const data = frontMatter(fs.readFileSync(templatePath, { encoding: 'utf8' }));
    const layout = data.attributes.layout ?? (isExample ? 'example' : 'page');

    let template;
    if (layout === 'none') {
      template = data.body;
    } else {
      template = `
          {% extends 'layouts/_${layout}.njk' %}

          {% block main %}
          ${data.body}
          {% endblock %}
        `;
    }

    const compiledTemplate = nunjucks.compile(template, nunjucksEnvironment, templatePath);

    return compiledTemplate.render({
      pageInfo: getPageInfo(templatePath),
    });
  } catch (err) {
    console.error(`An error occurred whilst rendering: ${templatePath}`);
    throw err;
  }
}
