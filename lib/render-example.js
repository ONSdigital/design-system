import frontMatter from 'front-matter';
import fs from 'fs';
import nunjucks from 'nunjucks';

export default function renderExample(templatePath, nunjucksEnvironment) {
  try {
    const data = frontMatter(fs.readFileSync(templatePath, { encoding: 'utf8' }));
    const layout = data.attributes.layout;

    let template;
    if (layout === null) {
      template = data.body;
    } else {
      template = `
      {% extends 'layout/_template.njk' %}
  
      {% block body %}
        <div class="ons-u-p-m">
          ${data.body}
        </div>
      {% endblock %}
    `;
    }

    const compiledTemplate = nunjucks.compile(template, nunjucksEnvironment, templatePath);

    return compiledTemplate.render(templatePath);
  } catch (err) {
    console.error(`An error occurred whilst rendering: ${templatePath}`);
    throw err;
  }
}
