import * as fs from 'fs';
import chalk from 'chalk';
import nunjucks from 'nunjucks';
import marked from 'marked';
import pretty from 'pretty';

import { NunjucksLoader } from '../nunjucks-loader';
import { removeFrontmatterFromString } from '../remove-frontmatter-from-string';

const sourcePath = `${process.cwd()}/src`;

export function generateExampleParams(params, addDependency) {
  const link = `/${params.path.replace('/index.njk', '').replace('/index.html', '')}`;
  const name = link.split('/examples/')[1];
  const path = `${sourcePath}/${params.path}`;

  if (fs.existsSync(path)) {
    addDependency(path);
    let raw = removeFrontmatterFromString(fs.readFileSync(path, 'utf8'));

    const srcPath = params.componentFolderPath ? `${sourcePath}/${params.componentFolderPath}/` : `${path.split('/examples/')[0]}/`;
    const optionsPath = `${srcPath}_macro-options.md`;
    const macroPath = `${srcPath}_macro.njk`;

    let options;
    let scss;
    let template;

    if (fs.existsSync(optionsPath)) {
      addDependency(optionsPath);
      options = marked(fs.readFileSync(optionsPath, 'utf8'), {
        smartypants: true
      });
    }

    if (fs.existsSync(srcPath)) {
      const sassFiles = fs.readdirSync(srcPath).filter(file => {
        const fileNameParts = file.split('.');
        const ext = fileNameParts[fileNameParts.length - 1];

        return ext === 'scss';
      });

      const sassRaw = sassFiles.map(file => {
        addDependency(`${srcPath}${file}`);
        return fs.readFileSync(`${srcPath}${file}`, 'utf8');
      });
      scss = sassRaw.join('\n');
    }

    if (fs.existsSync(macroPath)) {
      addDependency(macroPath);
      template = `{% raw %}${fs.readFileSync(macroPath, 'utf8')}{% endraw %}`;
    }

    const loader = new NunjucksLoader(sourcePath);
    const environment = new nunjucks.Environment(loader);
    nunjucks.configure(null, {
      watch: false,
      autoescape: true
    });

    const html = pretty(nunjucks.compile(raw, environment).render(), { ocd: true });

    if (path.match(/.njk$/)) {
      raw = `{% raw %}${raw}{% endraw %}`;
    } else {
      raw = undefined;
    }

    return {
      ...params,
      link,
      raw,
      options,
      html,
      scss,
      name,
      template
    };
  } else {
    console.log('');
    console.log(chalk.red(`Path: '${path}' not found.`));
  }
}
