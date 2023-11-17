import cors from 'cors';
import express from 'express';

import renderPageList from './render-page-list';
import { handleTypeRoute, handleExamplesRoute } from './handle-routes';
import { pages, title } from './config.indexPage';

process.env.IS_DEV_SERVER = true;
const port = process.env.TEST_PORT ?? 3010;

(async () => {
  const app = express();
  app.use(cors());

  app.all('/test/fake', (req, res) => {
    res.status(200).json({});
  });

  app.all('/test/fake/*', (req, res) => {
    res.status(200).json({});
  });

  app.use((req, res, next) => {
    if (!req.path.startsWith('/test')) {
      next();
      return;
    }

    res.send('');
  });

  app.get('/', async (req, res) => {
    const output = renderPageList(pages, title);
    res.send(output);
  });

  app.get('/:type(components|patterns|foundations)', async (req, res) => {
    const type = req.params.type;
    const output = await handleTypeRoute(type, null, res);
    res.send(output);
  });

  app.get('/:type(components|patterns|foundations)/:name', async (req, res) => {
    const type = req.params.type;
    const name = req.params.name;
    const output = await handleTypeRoute(type, name, res);
    res.send(output);
  });

  app.get('/:type(components|patterns|foundations)/:name/:exampleName', async (req, res) => {
    const type = req.params.type;
    const name = req.params.name;
    const exampleName = req.params.exampleName.replace('.html', '');
    const output = await handleExamplesRoute(type, name, exampleName);
    res.send(output);
  });

  app.use(express.static('./src/static'));
  app.use(express.static('./src/static/favicons'));
  app.use(express.static('./build'));

  app.listen(port, () => {
    console.log(`Development server listening at http://0.0.0.0:${port}`);
  });
})();
