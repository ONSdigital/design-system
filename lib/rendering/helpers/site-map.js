import frontMatter from 'front-matter';
import fs from 'fs';
import glob from 'glob';
import lodash from 'lodash';
import path from 'path';
import YAML from 'yaml';

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

    entry.groups = discoverPageGroups(entry);

    return entry;
  });

  const lookup = new Map(flatListing.map(entry => [entry.templatePath, entry]));

  for (let entry of flatListing) {
    entry.outputPath = rewritePath(entry, lookup);

    entry.url = entry.outputPath
      .substr(5)
      .replace(/\\/g, '/')
      .replace(/.+\/src\//, '/')
      .replace('index.html', '')
      .replace('.html', '');

    // Link groups to the associated entries.
    for (let group of entry.groups) {
      group.rootPage = lookup.get(group.rootPage);
      group.items = group.items.map(item => lookup.get(item));
      group.items = lodash.orderBy(group.items, ['sortOrder', 'title'], ['asc', 'asc']);
      for (let item of group.items) {
        item.group = group;
      }
    }
  }

  return lookup;
}

function discoverPageGroups(entry) {
  const groups = glob.sync(`${entry.basePath}/*/group.yml`).map(groupDefinitionPath => {
    const groupDefinition = YAML.parse(fs.readFileSync(groupDefinitionPath, { encoding: 'utf8' }));
    groupDefinition.rootPage = entry.templatePath;
    groupDefinition.slug = groupDefinitionPath.match(/\/([^\/]+)\/group\.yml/)[1];
    groupDefinition.basePath = `${entry.basePath}/${groupDefinition.slug}`;
    groupDefinition.items = glob.sync(`${groupDefinition.basePath}/{*.njk,*/index.njk}`);
    return groupDefinition;
  });
  return lodash.orderBy(groups, ['sortOrder', 'title'], ['asc', 'asc']);
}

function rewritePath(entry, lookup) {
  let result = entry.templatePath;

  // Remove page group slugs from URLs.
  const groupRootEntry = findGroupRoot(entry, lookup);
  if (groupRootEntry !== null) {
    const replacePattern = `(${groupRootEntry.basePath.replace(/[\\\/]/g, '\\/')})\/[^\/]+\/`;
    const replacement = '$1/';
    result = result.replace(new RegExp(replacePattern), replacement);
  }

  // Remove pages/ prefix from URLs.
  result = result.replace(/[\\\/]src[\\\/]pages[\\\/]/, '/src/');

  // Adjust file extension.
  result = result.replace('.njk', '.html');

  return result;
}

function findGroupRoot(entry, lookup) {
  let templatePath = entry.templatePath;
  while (!!templatePath) {
    templatePath = getParentTemplatePath(templatePath);

    const rootEntry = lookup.get(templatePath);
    if (rootEntry?.groups.length > 0) {
      return rootEntry;
    }
  }

  return null;
}

function getParentTemplatePath(templatePath) {
  const templateDirectoryPath = path.dirname(templatePath);

  if (path.basename(templatePath) !== 'index.njk') {
    return path.resolve(templateDirectoryPath, 'index.njk');
  }

  if (templateDirectoryPath === SRC_PATH) {
    return null;
  }

  return path.resolve(path.dirname(templateDirectoryPath), 'index.njk');
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
