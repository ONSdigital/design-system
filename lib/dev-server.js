import express from 'express';
import fs from 'fs';

import createNunjucksEnvironment from './rendering/create-nunjucks-environment.js';
import renderPage from './rendering/render-page.js';

const app = express();

const nunjucksEnvironment = createNunjucksEnvironment();

// app.set('view engine', 'njk');

app.use(express.static('./src/static'));
app.use(express.static('./build'));

app.use((req, res, next) => {
  let rawRequestPath = (req.path ?? '/').substr(1);
  if (rawRequestPath !== '' && !rawRequestPath.endsWith('/')) {
    rawRequestPath += '/';
  }

  const requestPath = !!rawRequestPath ? `${rawRequestPath}index` : 'index';

  let templatePath = `./src/pages/${requestPath}.njk`;
  if (!fs.existsSync(templatePath)) {
    templatePath = `./src/${requestPath}.njk`;
  }

  if (!fs.existsSync(templatePath)) {
    next();
    return;
  }

  const output = renderPage(templatePath, nunjucksEnvironment);
  res.send(output);
});

app.listen(3010);
