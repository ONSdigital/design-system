import * as fs from 'fs';
import chalk from 'chalk';
import nunjucks from 'nunjucks';
import marked from 'marked';
import pretty from 'pretty';

import { NunjucksLoader } from '../nunjucks-loader';
import { removeFrontmatterFromString } from '../remove-frontmatter-from-string';

const sourcePath = `${process.cwd()}/src`;

export function generateExampleParams(path) {
  const link = `/${path.replace('/index.njk', '')}`;
  const name = link.split('/examples/')[1];
  path = `${sourcePath}/${path}`;

  if(fs.existsSync(path)) {
    const raw = removeFrontmatterFromString(fs.readFileSync(path, 'utf8'));
    const srcPath = `${path.split('/examples/')[0]}/src/`;
    const optionsPath = `${srcPath}_macro-options.md`;
    
    let options;
    let scss;

    if(fs.existsSync(optionsPath)) {
      options = marked(fs.readFileSync(optionsPath, 'utf8'), {
        smartypants: true,
      });
    }

    if(fs.existsSync(srcPath)) {
      const sassFiles = fs.readdirSync(srcPath).filter(file => {
        const fileNameParts = file.split('.');
        const ext = fileNameParts[fileNameParts.length - 1];

        return ext === 'scss';
      });

      const sassRaw = sassFiles.map(file => fs.readFileSync(`${srcPath}${file}`, 'utf8'));
      scss = sassRaw.join('\n');
    }

    const loader = new NunjucksLoader(sourcePath);
    const environment = new nunjucks.Environment(loader);
    nunjucks.configure(null, {
      watch: false,
      autoescape: true
    });

    const html = pretty(nunjucks.compile(raw, environment).render(), { ocd: true });
 
    return {
      link,
      raw: `{% raw %}${raw}{% endraw %}`,
      options,
      html,
      scss,
      name
    };
  } else {
    console.log('');
    console.log(chalk.red(`Path: '${path}' not found.`));
  }
}
