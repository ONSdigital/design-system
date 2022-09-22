import frontMatter from 'front-matter';
import fs from 'fs';
import glob from 'glob';
import lodash from 'lodash';
import path from 'path';

const SRC_PATH = path.resolve('./src');

let siteMapCache = null;
let siteMapCacheTime = 0;

function buildPageListing() {
  const flatListing = glob.sync('./src/**/[^_]*.njk').map(templatePath => {
    templatePath = path.resolve(templatePath);
    const data = frontMatter(fs.readFileSync(templatePath, { encoding: 'utf8' }));

    let segment = templatePath.match(/([^\/]+).njk/)[1];
    if (segment === 'index') {
      segment = templatePath.match(/([^\/]+)\/index.njk/)[1];
    }

    const entry = {
      ...data.attributes,
      basePath: templatePath.replace(/\/[^/]+\.njk$/, ''),
      templatePath,
      title: data.attributes.title || segment,
      sortOrder: data.attributes.sortOrder || Infinity,
      lang: data.attributes.lang || '',
      experimental: data.attributes.experimental || '',
    };

    return entry;
  });

  const lookup = new Map(flatListing.map(entry => [entry.templatePath, entry]));

  for (let entry of flatListing) {
    entry.outputPath = rewritePath(entry);

    entry.url = entry.outputPath
      .substr(5)
      .replace(/\\/g, '/')
      .replace(/.+\/src\//, '/')
      .replace('index.html', '')
      .replace('.html', '');
  }

  return lookup;
}

function rewritePath(entry) {
  let result = entry.templatePath;

  // Adjust file extension.
  result = result.replace('.njk', '.html');

  return result;
}

function buildSiteMap() {
  const allEntries = [...buildPageListing().values()];

  let siteMap = {
    children: [],
    lookup: new Map(),
    routes: new Map(allEntries.map(entry => [entry.outputPath.substr(SRC_PATH.length + 1), entry])),
  };

  for (let page of allEntries) {
    let entry = siteMap;
    const segments = page.url.replace(/^\/|\/$/g, '').split('/');
    for (let i = 0; i < segments.length; ++i) {
      let targetEntry = entry.children.find(child => child.segment === segments[i]);
      if (!targetEntry) {
        targetEntry = { segment: segments[i], depth: i, parent: entry, children: [] };
        entry.children.push(targetEntry);
      }

      entry = targetEntry;

      if (i === segments.length - 1) {
        if (page.url === '/') {
          Object.assign(siteMap, page);
        }
        Object.assign(entry, page);

        siteMap.lookup.set(page.templatePath, entry);
      }
    }
  }

  for (let entry of siteMap.lookup.values()) {
    entry.children = lodash.orderBy(entry.children, ['sortOrder', 'title'], ['asc', 'asc']);
  }

  // console.log(util.inspect(siteMap, true, 4));process.abort();
  return siteMap;
}

export function getSiteMap() {
  if (siteMapCache === null || (process.env.IS_DEV_SERVER && new Date().getTime() - siteMapCacheTime > 800)) {
    siteMapCache = buildSiteMap();
    siteMapCacheTime = new Date().getTime();
  }
  return siteMapCache;
}

export function getPageInfo(templatePath) {
  templatePath = path.resolve(templatePath);
  const siteMap = getSiteMap();
  const entry = siteMap.lookup.get(path.resolve(templatePath));
  return { ...entry, siteMap: siteMap.children };
}
