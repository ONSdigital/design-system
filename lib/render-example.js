import frontMatter from 'front-matter';
import fs from 'fs';
import nunjucks from 'nunjucks';
import { minify } from 'html-minifier';

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
    let html = compiledTemplate.render(templatePath);
    html = minify(html, {
      removeComments: true,
      collapseWhitespace: true,
    });
    //console.log(html);
    return html;

    // let html = compiledTemplate.render(templatePath);
    // html = minify(html, {
    //   removeComments: true,
    //   collapseWhitespace: true,
    // });

    // //removes whitespace and linebreaks before svg tags.
    // return html.replace(/\s*(<svg)/g, '$1');
  } catch (err) {
    console.error(`An error occurred whilst rendering: ${templatePath}`);
    throw err;
  }
}
