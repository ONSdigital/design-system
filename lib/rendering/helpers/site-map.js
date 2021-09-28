import frontMatter from 'front-matter';
import fs from 'fs';
import glob from 'glob';
import lodash from 'lodash';
import path from 'path';
import YAML from 'yaml';

let pageListingCache = null;
let siteMapCache = null;

function buildPageListing() {
  return glob.sync('./src/**/[^_]*.njk').map(templatePath => {
    templatePath = path.resolve(templatePath);
    const data = frontMatter(fs.readFileSync(templatePath, { encoding: 'utf8' }));

    let segment = templatePath.match(/([^\/]+).njk/)[1];
    if (segment === 'index') {
      segment = templatePath.match(/([^\/]+)\/index.njk/)[1];
    }

    return {
      ...data.attributes,
      basePath: templatePath.replace(/\/[^/]+\.njk$/, ''),
      templatePath,
      url: templatePath
        .substr(5)
        .replace(/\\/g, '/')
        .replace(/.+\/src\//, '/')
        .replace(/^\/pages\//, '/')
        .replace('index.njk', '')
        .replace('.njk', ''),
      title: data.attributes.title || segment,
      sortOrder: data.attributes.sortOrder || Infinity,
      lang: data.attributes.lang || '',
      experimental: data.attributes.experimental || '',
    };
  });
}

export function getPageListing() {
  if (pageListingCache === null || process.env.IS_DEV_SERVER) {
    pageListingCache = buildPageListing();
  }
  return pageListingCache;
}

function discoverPageGroups(page) {
  const groups = glob.sync(`${page.basePath}/*/group.yml`).map(groupDefinitionPath => {
    const groupDefinition = YAML.parse(fs.readFileSync(groupDefinitionPath, { encoding: 'utf8' }));
    groupDefinition.rootPage = page.templatePath;
    groupDefinition.slug = groupDefinitionPath.match(/\/([^\/]+)\/group\.yml/)[1];
    groupDefinition.basePath = `${page.basePath}/${groupDefinition.slug}`;
    groupDefinition.items = glob.sync(`${groupDefinition.basePath}/{*.njk,*/index.njk}`);
    return groupDefinition;
  });
  return lodash.orderBy(groups, ['sortOrder', 'title'], ['asc', 'asc']);
}

function buildSiteMap() {
  const pages = getPageListing();

  let siteMap = {
    children: [],
    lookup: new Map(),
  };

  for (let page of pages) {
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

        entry.groups = discoverPageGroups(page);

        siteMap.lookup.set(page.templatePath, entry);
      }
    }
  }

  // Link groups to the associated entries.
  for (let entry of siteMap.lookup.values()) {
    for (let group of entry.groups) {
      group.rootPage = siteMap.lookup.get(group.rootPage);
      group.items = group.items.map(item => siteMap.lookup.get(item));
      for (let item of group.items) {
        item.group = group;
      }
    }
  }

  // console.log(util.inspect(siteMap, true, 4));process.abort();
  return siteMap;
}

export function getSiteMap() {
  if (siteMapCache === null || process.env.IS_DEV_SERVER) {
    siteMapCache = buildSiteMap();
  }
  return siteMapCache;
}

export function getPageInfo(templatePath) {
  templatePath = path.resolve(templatePath);
  const siteMap = getSiteMap();
  const entry = siteMap.lookup.get(path.resolve(templatePath));
  return { ...entry, siteMap: siteMap.children };
}
