import express from 'express';

import createNunjucksEnvironment from './rendering/create-nunjucks-environment.js';
import { getSiteMap } from './rendering/helpers/site-map';
import installRenderHelpers from './rendering/install-render-helpers';
import renderPage from './rendering/render-page.js';

process.env.IS_DEV_SERVER = true;

const app = express();

const nunjucksEnvironment = createNunjucksEnvironment();
installRenderHelpers(nunjucksEnvironment);

app.use((req, res, next) => {
  if (!req.path.startsWith('/test')) {
    next();
    return;
  }

  res.send('');
});

app.use((req, res, next) => {
  if (req.path.startsWith('/test')) {
    next();
    return;
  }

  let rawRequestPath = (req.path ?? '/').substr(1);
  if (rawRequestPath !== '' && !rawRequestPath.endsWith('/')) {
    rawRequestPath += '/';
  }

  const siteMap = getSiteMap();
  const requestPath = !!rawRequestPath ? `${rawRequestPath}index.html` : 'index.html';
  const requestEntry = siteMap.routes.get(requestPath);
  if (!requestEntry) {
    next();
    return;
  }

  const output = renderPage(requestEntry.templatePath, nunjucksEnvironment);
  res.send(output);
});

app.use(express.static('./src/static'));
app.use(express.static('./build'));

app.listen(process.env.TEST_PORT ?? 3010);
