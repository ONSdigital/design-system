import * as fs from 'fs';
import * as path from 'path';
import loaderUtils from 'loader-utils';
import nunjucks from 'nunjucks';
import frontmatter from 'frontmatter';
import marked from 'marked';
import pretty from 'pretty';
import chalk from 'chalk';
import { htmlErrorStack } from 'print-error';

import { navigationHelper, subNavigationHelper } from './helpers';

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
  const siteMap = [];

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
        ref.push({
          title,
          path: path.replace('/index.njk', '').replace('.njk', '') || '/'
        });
      } else {
        const newRef = ref.find(page => page.path === `/${part}`);

        if (newRef) {
          if (!newRef.children) {
            newRef.children = [];
          }

          ref = newRef.children;
        }
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

  let parent;
  let pageRef = siteMap;
  let pathRef = '';

  pathParts.forEach((part, index) => {
    part = `/${part.replace('index.njk', '').replace('.njk')}`;
    pathRef += part;

    if (pageRef && index === pathDepth - 2) {
      parent = Object.assign({}, pageRef);
    }

    if (part !== '/' && pageRef.children) {
      pageRef = pageRef.children;
    }

    const pathRefLength = pathRef.length;
    if (pathRefLength > 1 && pathRef[pathRefLength - 1] === '/') {
      pathRef = pathRef.slice(0, -1);
    }

    if (Array.isArray(pageRef)) {
      pageRef = pageRef.find(page => page.path === pathRef);
    }
  });

  const title = pageRef.title;
  const children = pageRef.children;

  return { path, siteMap, children, parent, title };
}

export default async function (source) {
  this.cacheable();
  let didError;

  const callback = this.async();
  const options = loaderUtils.getOptions(this) || {};
  const pageInfo = getPageInfo(this);
  const frontmatterData = frontmatter(source).data;

  // Remove frontmatter from source
  source = removeFrontmatterFromString(source);

  // Combine context to be passed to template
  const context = Object.assign(
    {
      pageInfo,
      page: frontmatterData,
      helpers: {
        navigationHelper,
        subNavigationHelper
      }
    },
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
  let html = await new Promise(resolve => {
    nunjucks.compile(source, environment).render(context, (error, result) => {
      if (error) {
        didError = true;
        handleError(error, environment, options.layoutPath, callback);
      }

      resolve(result);
    });
  });

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
  html = await new Promise(resolve => {
    nunjucks.compile(source, environment).render(context, (error, result) => {
      if (error) {
        didError = true;
        handleError(error, environment, options.layoutPath, callback);
      }

      resolve(result);
    });
  });

  // Clean up html
  html = pretty(html, {
    ocd: true
  });

  if (!didError) {
    callback(null, html);
  }
}

function handleError(error, environment, layoutPath, callback) {
  if (error) {
    console.log('');
    console.log(chalk.red(error.stack));
    let html = htmlErrorStack(error, { fontSize: '10px' });
    html = `{% extends "${layoutPath}/_error.njk" %}{% block body %}${html}{% endblock %}`;
    html = nunjucks.compile(html, environment).render({
      error: error.toString()
    });

    callback(null, html);
  }
}

function getFrontmatterFromFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const file = fs.readFileSync(filePath, 'utf8');
  return frontmatter(file).data || {};
}

function removeFrontmatterFromString(string) {
  if (string.substring(0, 3) === '---') {
    const matchedDashes = /^---[\r|\n|\r\n]/m.exec(string.slice(3));

    if (matchedDashes) {
      const sliceIndex = matchedDashes.index + matchedDashes[0].length;
      const frontmatter = string.slice(0, sliceIndex + 3);

      return string.slice(frontmatter.length);
    }
  }

  return string;
}
