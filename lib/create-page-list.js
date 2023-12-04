import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

function buildEntries(templatePath, type) {
  templatePath = path.resolve(templatePath);

  return {
    title: path.basename(templatePath, '.njk'),
    uri: templatePath.replace('.njk', '.html').substring(templatePath.indexOf(`/${type}`)),
  };
}

export default async function createPageList(res, type = null, name = null) {
  try {
    let pages = [];
    if (type && name) {
      if (!fs.existsSync(`./src/${type}/${name}`)) {
        return res.status(404).send({ error: `${type} not found` });
      }
      pages = globSync(`./src/${type}/${name}/example-*.njk`)
        .sort()
        .map((templatePath) => buildEntries(templatePath, type));
    } else if (type) {
      const hasExample = globSync(`./src/${type}/**/*example-*`).sort();
      const templatePath = Array.from(new Set(hasExample.map((filePath) => path.dirname(filePath))));

      if (templatePath.length) {
        pages = templatePath.map((folderPath) => buildEntries(folderPath, type));
      }
    }
    //console.log(pages);
    const searchIndexJson = JSON.stringify(buildSearchIndex(pages));
    //await fs.writeFile(`${}/search-index.json`, searchIndexJson);
    return pages;
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'An error occurred while building the page list' });
  }
}

function buildSearchIndex(pages) {
  return pages.map((page) => {
    const path = [];

    const rootTitle = page?.title;
    if (!!rootTitle && rootTitle !== page.title) {
      path.push(rootTitle);
    }

    const sectionTitle = page?.title;
    if (!!sectionTitle && sectionTitle !== page.title && sectionTitle !== rootTitle) {
      path.push(sectionTitle);
    }

    let result = {
      en: page.title,
      url: page.url,
      category: path.join(' › '),
      tags: page.searchTerms?.map((term) => term.title),
    };
    //console.log(result);
    return result;
  });
}
