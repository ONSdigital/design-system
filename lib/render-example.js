import frontMatter from 'front-matter';
import fs from 'fs';
import nunjucks from 'nunjucks';
import path from 'path';

export default function renderExample(templatePath, nunjucksEnvironment) {
    const LOCAL_ROOT = '/Users';
    const LIGHTHOUSE_ROOT = '/home/runner/work/design-system';
    const NETLIFY_ROOT = '/opt/build/repo/src/';

    try {
        const filePath = fs.realpathSync(path.resolve(LOCAL_ROOT, templatePath));
        if (!filePath.startsWith(LOCAL_ROOT) && !filePath.startsWith(LIGHTHOUSE_ROOT) && !filePath.startsWith(NETLIFY_ROOT)) {
            throw new TypeError('403 Forbidden: Attempted to access a file outside the allowed directory.');
        }
        const data = frontMatter(fs.readFileSync(filePath, { encoding: 'utf8' }));
        const layout = data.attributes.layout;
        nunjucksEnvironment.addGlobal('isDesignSystemExample', true);

        let template;
        if (layout === null) {
            template = data.body;
        } else {
            template = `
                {% extends 'layout/_template.njk' %}

                {% block body %}
                    <div class="ons-u-p-xl">
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
