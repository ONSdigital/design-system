import frontMatter from 'front-matter';
import fs from 'fs';
import nunjucks from 'nunjucks';

export default function renderExample(templatePath, nunjucksEnvironment) {
    try {
        const data = frontMatter(fs.readFileSync(templatePath, { encoding: 'utf8' }));
        const layout = data.attributes.layout;
        nunjucksEnvironment.addGlobal('isDesignSystemExample', true);

        let template;
        if (layout === null) {
            template = data.body;
        } else if (data.frontmatter.includes("'fullWidth': true")) {
            template = `
                {% extends 'layout/_template.njk' %}

                {% block body %}
                    ${data.body}
                {% endblock %}
            `;
        } else {
            template = `
                {% extends 'layout/_template.njk' %}

                {% block body %}
                    <div class="ons-u-p-l">
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
