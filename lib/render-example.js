import frontMatter from 'front-matter';
import fs from 'fs';
import { minify } from 'html-minifier';
import nunjucks from 'nunjucks';

export default function renderExample(templatePath, nunjucksEnvironment) {
  try {
    const data = frontMatter(fs.readFileSync(templatePath, { encoding: 'utf8' }));
    const layout = data.attributes.layout;
    nunjucksEnvironment.addGlobal('isDesignSystemExample', true);

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

    const html = compiledTemplate.render(templatePath);
    //console.log(html);
    const minifiedHtml = minify(html, {
      removeComments: true,
      collapseWhitespace: true,
      removeTagWhitespace: true,
    });
    console.log(minifiedHtml);
    return minifiedHtml;
  } catch (err) {
    console.error(`An error occurred whilst rendering: ${templatePath}`);
    throw err;
  }
}
