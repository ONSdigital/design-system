import * as fs from 'fs';
import * as path from 'path';
import loaderUtils from 'loader-utils';
import nunjucks from 'nunjucks';
import frontmatter from 'frontmatter';
import marked from 'marked';
import pretty from 'pretty';

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

function getPageInfo (context) {
  const path = context.resourcePath.replace(context.rootContext, '');
  const pathParts = path.split('/').slice(1);
  const pathDepth = pathParts.length;
  const allNunjucksTemplates = context._module.issuer._identifier
    .slice(7)
    .split(' .')
    .filter(path => !path.includes('node_modules'))
    .sort((a, b) => a.split('/').length - b.split('/').length);
  const siteMap = {};

  allNunjucksTemplates.forEach(path => {
    const pathParts = path.split('/').slice(1);
    const frontmatter = getFileFrontmatter(context.rootContext + path);
    let ref = siteMap;

    pathParts.forEach((part, index) => {
      if (part.includes('.njk')) {
        const key = part.replace('.njk', '');
        let title = frontmatter.title;

        if (!title) {
          if (key.toLowerCase() === 'index') {
            title = pathParts[index - 1];
          } else {
            title = key;
          }
        }

        ref[key] = {
          title,
          path: path.replace('/index.njk', '').replace('.njk', '') || '/'
        };
      } else {
        if (!ref[part]) {
          ref[part] = {};
        }

        ref = ref[part];
      }
    });
  });

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

function getFileFrontmatter (path) {
  if (!fs.existsSync(path)) {
    return;
  }

  const file = fs.readFileSync(path, 'utf8');
  return frontmatter(file).data || {};
}

function removeFrontmatter (source) {
  if (source.substring(0, 3) === '---') {
    const matchedDashes = /^---[\r|\n|\r\n]/m.exec(source.slice(3));

    if (matchedDashes) {
      const sliceIndex = matchedDashes.index + matchedDashes[0].length;
      const frontmatter = source.slice(0, sliceIndex + 3);

      return source.slice(frontmatter.length);
    }
  }

  return source;
}

export default function (source) {
  this.cacheable();

  const callback = this.async();
  const options = loaderUtils.getOptions(this) || {};
  const pageInfo = getPageInfo(this);
  const frontmatterData = frontmatter(source).data;

  const context = Object.assign(
    { pageInfo },
    { page: frontmatterData },
    options.context
  );

  const loader = new NunjucksLoader(
    options.searchPaths,
    this.addDependency.bind(this)
  );

  const environment = new nunjucks.Environment(loader);
  nunjucks.configure(null, {
    watch: false,
    autoescape: true
  });

  source = removeFrontmatter(source);

  let layoutPath;

  if (frontmatterData && frontmatterData.layout) {
    layoutPath = `${frontmatterData.layout}.njk`;
  } else {
    layoutPath = '_master.njk';
  }

  if (layoutPath.slice(0, 1) !== '_') {
    layoutPath = `_${layoutPath}`;
  }

  const viewTemplate = nunjucks.compile(source, environment);
  const viewHtml = marked(viewTemplate.render(context), {
    smartypants: true,
    pedantic: true
  });

  layoutPath = `${options.layoutPath}/${layoutPath}`;

  source = `{% extends "${layoutPath}" %}
            {% block body %}
            ${viewHtml}
            {% endblock %}`;

  const template = nunjucks.compile(source, environment);
  const html = pretty(template.render(context), { ocd: true });

  callback(null, html);
}
