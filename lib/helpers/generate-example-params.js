import * as fs from 'fs';
import chalk from 'chalk';
import nunjucks from 'nunjucks';
import marked from 'marked';
import pretty from 'pretty';

import { NunjucksLoader } from '../nunjucks-loader';

const sourcePath = `${process.cwd()}/src`;

export function generateExampleParams(path) {
  const link = `/${path.replace('/index.njk', '')}`;
  const name = link.split('/examples/')[1];
  path = `${sourcePath}/${path}`;

  if(fs.existsSync(path)) {
    const raw = fs.readFileSync(path, 'utf8');
    const optionsPath = `${path.split('/examples/')[0]}/src/_macro-options.md`;
    let options;

    if(fs.existsSync(optionsPath)) {
      options = marked(fs.readFileSync(optionsPath, 'utf8'), {
        smartypants: true,
      });
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
      name
    };
  } else {
    console.log('');
    console.log(chalk.red(`Path: '${path}' not found.`));
  }
}
