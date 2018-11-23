import * as fs from 'fs';
import * as path from 'path';
import loaderUtils from 'loader-utils';
import nunjucks from 'nunjucks';
import frontmatter from 'frontmatter';
import marked from 'marked';
import pretty from 'pretty';

import getFrontmatterFromFile from './helpers/getFrontmatterFromFile';
import removeFrontmatterFromString from './helpers/removeFrontmatterFromString';

const NunjucksLoader = nunjucks.Loader.extend({
  //Based off of the Nunjucks 'FileSystemLoader'
  init: function (searchPaths, sourceFoundCallback) {
    this.sourceFoundCallback = sourceFoundCallback;
    if (searchPaths) {
      searchPaths = Array.isArray(searchPaths) ? searchPaths : [searchPaths];
      // For windows, convert to forward slashes
      this.searchPaths = searchPaths.map(path.normalize);
    } else {
      this.searchPaths = ['.'];
    }
  },

  getSource: function (name) {
    let fullpath = null;
    let paths = this.searchPaths;

    for (let i = 0; i < paths.length; i++) {
      let basePath = path.resolve(paths[i]);
      let p = path.resolve(paths[i], name);

      // Only allow the current directory and anything
      // underneath it to be searched
      if (p.indexOf(basePath) === 0 && fs.existsSync(p)) {
        fullpath = p;
        break;
      }
    }

    if (!fullpath) {
      return null;
    }

    this.sourceFoundCallback(fullpath);

    return {
      src: fs.readFileSync(fullpath, 'utf-8'),
      path: fullpath,
      noCache: this.noCache
    };
  }
});

function getAllTemplates(context) {
  return context._module.issuer._identifier
    .slice(7)
    .split(' .')
    .filter(path => !path.includes('node_modules'))
    .sort((a, b) => a.split('/').length - b.split('/').length);
}

function buildSiteMap(context) {
  const templates = getAllTemplates(context);
  const siteMap = {};

  templates.forEach(path => {
    const pathParts = path.split('/').slice(1);
    const frontmatter = getFrontmatterFromFile(context.rootContext + path);
    let ref = siteMap;

    pathParts.forEach((part, index) => {
      if (part.includes('.njk')) {
        // If is page
        const key = part.replace('.njk', '');
        let title = frontmatter.title;

        // Set title
        if (!title) {
          if (key.toLowerCase() === 'index') {
            title = pathParts[index - 1];
          } else {
            title = key;
          }
        }

        // Add page to siteMap
        ref[key] = {
          title,
          path: path.replace('/index.njk', '').replace('.njk', '') || '/'
        };
      } else {
        // If is path
        if (!ref[part]) {
          // If sitemap does not contain path create it
          ref[part] = {};
        }

        ref = ref[part];
      }
    });
  });

  return siteMap;
}

function getPageInfo(context) {
  const siteMap = buildSiteMap(context);
  const path = context.resourcePath.replace(context.rootContext, '');
  const pathParts = path.split('/').slice(1);
  const pathDepth = pathParts.length;

  let children = siteMap;
  let parentRef = siteMap;

  for (let i = 0, l = pathDepth - 1; i < l; i++) {
    children = children[pathParts[i]];

    if (i < l - 1) {
      parentRef = parentRef[pathParts[i]];
    }
  }

  const title = children.index.title;
  delete children.index;
  const parent = parentRef.index;

  return { path, siteMap, children, parent, title };
}

export default function (source) {
  this.cacheable();

  const callback = this.async();
  const options = loaderUtils.getOptions(this) || {};
  const pageInfo = getPageInfo(this);
  const frontmatterData = frontmatter(source).data;

  // Remove frontmatter from source
  source = removeFrontmatterFromString(source);

  // Combine context to be passed to template
  const context = Object.assign(
    { pageInfo },
    { page: frontmatterData },
    options.context
  );

  // Create nunjucks loader
  const loader = new NunjucksLoader(
    options.searchPaths,
    this.addDependency.bind(this)
  );

  // Create nunjucks environment
  const environment = new nunjucks.Environment(loader);
  nunjucks.configure(null, {
    watch: false,
    autoescape: true
  });

  // Render page nunjucks to HTML
  let html = nunjucks.compile(source, environment).render(context);

  // Render page markdown to HTML
  html = marked(html, {
    smartypants: true,
    pedantic: true
  });

  // Get page layout template path
  let layoutPath;

  if (frontmatterData && frontmatterData.layout) {
    layoutPath = `${frontmatterData.layout}.njk`;
  } else {
    layoutPath = '_master.njk';
  }

  if (layoutPath.slice(0, 1) !== '_') {
    layoutPath = `_${layoutPath}`;
  }

  layoutPath = `${options.layoutPath}/${layoutPath}`;

  // Wrap html in extend for layout
  source = `{% extends "${layoutPath}" %}
            {% block body %}
            ${html}
            {% endblock %}`;

  // Render full page wrapped in layout
  html = nunjucks.compile(source, environment).render(context);

  // Clean up html
  html = pretty(html, {
    ocd: true
  });

  callback(null, html);
}
