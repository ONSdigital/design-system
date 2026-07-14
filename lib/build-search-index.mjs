import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import frontMatter from 'front-matter';
import nunjucks from 'nunjucks';

function buildEntries(templatePath, type) {
    templatePath = path.resolve(templatePath);

    return {
        title: path.basename(templatePath, '.njk'),
        uri: templatePath.replace('.njk', '.html').substring(templatePath.indexOf(`/${type}`)),
    };
}

export default async function buildSearchIndex() {
    let types = ['components', 'patterns', 'foundations'];
    const pages = [];
    types.forEach((type) => {
        const hasExample = globSync(`./src/${type}/**/*example-*`).sort();
        const templatePath = Array.from(new Set(hasExample.map((filePath) => path.dirname(filePath))));

        if (templatePath.length) {
            pages.push(...templatePath.map((folderPath) => buildEntries(folderPath, type)));
        }
    });
    const result = pages.map((page) => {
        const path = [];

        return {
            en: page.title,
            url: page.uri,
            category: path.join(' › '),
            tags: page.searchTerms?.map((term) => term.title),
        };
    });
    const filePath = process.cwd();
    const searchIndexJson = JSON.stringify(result);
    fs.writeFile(`${filePath}/src/static/examples/data/search-index.json`, searchIndexJson, (err) => {
        if (err) console.log(err);
    });
}

export function renderSearch(templatePath, nunjucksEnvironment) {
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
        ${data.body}
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
