import fs from 'fs';
import path from 'path';
import glob from 'glob';

function buildEntries(templatePath, type) {
  templatePath = path.resolve(templatePath);

  return {
    title: path.basename(templatePath, '.njk'),
    uri: templatePath.replace('.njk', '').substring(templatePath.indexOf(`/${type}`)),
  };
}

export default async function createPageList(res, type = null, name = null) {
  try {
    let pages = [];
    if (type && name) {
      if (!fs.existsSync(`./src/${type}/${name}`)) {
        return res.status(404).send({ error: `${type} not found` });
      }
      pages = glob.sync(`./src/${type}/${name}/example-*.njk`).map(templatePath => buildEntries(templatePath, type));
    } else if (type) {
      const hasExample = glob.sync(`./src/${type}/**/*example-*`);
      const templatePath = Array.from(new Set(hasExample.map(filePath => path.dirname(filePath))));

      if (templatePath.length) {
        pages = templatePath.map(folderPath => buildEntries(folderPath, type));
      }
    }

    return pages;
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'An error occurred while building the page list' });
  }
}
