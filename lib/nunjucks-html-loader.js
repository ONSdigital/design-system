import * as fs from 'fs';
import loaderUtils from 'loader-utils';
import nunjucks from 'nunjucks';
import frontmatter from 'frontmatter';
import marked from 'marked';
import { formatHTML } from './helpers/format-html';
import chalk from 'chalk';
import { htmlErrorStack } from 'print-error';
import { MarkdownExtension } from './tags/markdown';
import { NunjucksLoader } from './nunjucks-loader';
import { removeFrontmatterFromString } from './remove-frontmatter-from-string';
import setAttribute from './filters/set-attribute';
import setAttributes from './filters/set-attributes';
import { navigationHelper, subNavigationHelper, generateExampleParams } from './helpers';
const markdownRenderer = new marked.Renderer();
markdownRenderer.paragraph = text => {
  if (
    /^<(abbr|acronym|address|applet|area|article|aside|audio|b|base|bdi|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|head|header|hgroup|hr|h1|h2|h3|h4|h5|h6|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video)/i.test(
      text,
    )
  ) {
    return `${text}\n`;
  } else {
    return `<p>${text}</p>\n`;
  }
};
function getAllTemplates(context) {
  return context._module.issuer._identifier
    .slice(7)
    .split(' .')
    .filter(path => !path.includes('node_modules'))
    .sort((a, b) => a.split('/').length - b.split('/').length);
}
function buildSiteMap(context) {
  const templates = getAllTemplates(context).filter(path => !path.includes('/examples/'));
  const siteMap = [];
  templates.forEach(path => {
    const pathParts = path.split('/').slice(1);
    const frontmatter = getFrontmatterFromFile(context.rootContext + path);
    const sortOrder = frontmatter.sortOrder || Infinity;
    const group = frontmatter.group || '';
    const lang = frontmatter.lang || '';
    const experimental = frontmatter.experimental || '';
    const exclude = frontmatter.exclude || false;
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
          sortOrder,
          group,
          lang,
          exclude,
          experimental,
          url: path.replace('/index.njk', '').replace('.njk', '') || '/',
        });
      } else {
        const newRef = ref.find(page => page.url === `/${part}`);
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
  let path = context.resourcePath.replace(context.rootContext, '');
  const pathParts = path.split('/').slice(1);
  const pathDepth = pathParts.length;
  let parent;
  let pageRef = siteMap;
  let pathRef = '';
  pathParts.forEach((part, index) => {
    if (pageRef) {
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
        pageRef = pageRef.find(page => page.url === pathRef);
      }
    }
  });
  if (pageRef) {
    const title = pageRef.title;
    const experimental = pageRef.experimental;
    const exclude = pageRef.exclude;
    const children = pageRef.children;
    path = path.replace('/index.njk', '').replace('.njk', '') || '/';
    return { url: path, siteMap, children, parent, title, experimental, exclude };
  } else {
    return { url: path };
  }
}
function handleError(error, environment, layoutPath, callback, pageInfo) {
  if (error) {
    const filePath = `${process.cwd()}/src${pageInfo.url}/index.njk`;
    console.log('');
    console.log(chalk.red(error.stack.replace('(unknown path)', filePath)));
    let html = htmlErrorStack(error, { fontSize: '10px' }).replace('(unknown path)', filePath);
    html = `{% extends "${layoutPath}/_error.njk" %}{% block body %}${html}{% endblock %}`;
    html = nunjucks.compile(html, environment).render({
      error: error.toString(),
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
export default async function(source) {
  this.cacheable();
  const callback = this.async();
  const options = loaderUtils.getOptions(this) || {};
  const pageInfo = getPageInfo(this);
  const frontmatterData = frontmatter(source).data;
  const isExample = pageInfo.url.includes('/examples/');
  // Remove frontmatter from source
  source = removeFrontmatterFromString(source);
  // Combine context to be passed to template
  const context = Object.assign(
    {
      pageInfo,
      page: frontmatterData,
      data: frontmatterData,
    },
    options.context,
  );
  // Create nunjucks loader
  const loader = new NunjucksLoader(options.searchPaths, this.addDependency.bind(this));
  // Create nunjucks environment
  const environment = new nunjucks.Environment(loader);
  nunjucks.configure(null, {
    watch: false,
    autoescape: true,
  });
  environment.addGlobal('helpers', {
    navigationHelper,
    subNavigationHelper,
    generateExampleParams,
    addDependency: this.addDependency.bind(this),
  });
  environment.addFilter('setAttribute', setAttribute);
  environment.addFilter('setAttributes', setAttributes);
  environment.addExtension('MarkdownExtension', new MarkdownExtension());
  // Render page nunjucks to HTML
  renderHTML(nunjucks, source, environment, context)
    .then(html => {
      // Prettify HTML to stop markdown wrapping everything in code blocks
      html = formatHTML(html);
      // No need to render markdown if rendering an example page
      if (!isExample) {
        // Fix indented markdown (from nunjucks renderer) from being wrapped in code blocks by removing indents
        html = html.replace(/(?!<code[^>]*?>)(\n +)(?![^<]*?<\/code>)/g, '\n');
        // Render page markdown to HTML
        html = marked(html, {
          smartypants: true,
          pedantic: true,
          renderer: markdownRenderer,
        });
      }
      // Get page layout template path
      let layoutPath;
      if (frontmatterData && frontmatterData.layout) {
        layoutPath = `${frontmatterData.layout}.njk`;
      } else if (isExample) {
        layoutPath = '_example.njk';
      } else {
        layoutPath = '_page.njk';
      }
      const pathIsToDirectory = layoutPath.includes('/');
      if (!pathIsToDirectory && layoutPath.slice(0, 1) !== '_') {
        layoutPath = `_${layoutPath}`;
      }
      if (!pathIsToDirectory) {
        layoutPath = `${options.layoutPath}/${layoutPath}`;
      }
      this.addDependency(layoutPath);
      // Wrap html in extend for layout
      source = `{% extends "${layoutPath}" %}
            {% block main %}
            ${html}
            {% endblock %}`;
      // Render full page wrapped in layout
      renderHTML(nunjucks, source, environment, context)
        .then(html => {
          // Clean up html
          html = formatHTML(html, true);
          callback(null, html);
        })
        .catch(error => handleError(error, environment, options.layoutPath, callback, pageInfo));
    })
    .catch(error => handleError(error, environment, options.layoutPath, callback, pageInfo));
}
async function renderHTML(nunjucks, source, environment, context) {
  return new Promise((resolve, reject) => {
    nunjucks.compile(source, environment).render(context, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
