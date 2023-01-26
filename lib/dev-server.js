import cors from 'cors';
import express from 'express';

import renderPageList from './render-page-list';
import { handleTypeRoute, handleExamplesRoute } from './handle-routes';

process.env.IS_DEV_SERVER = true;

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
    const pages = [
      { title: 'Components', uri: '/components' },
      { title: 'Patterns', uri: '/patterns' },
      { title: 'Foundations', uri: '/foundations' },
    ];
    const title = 'ONS Design System';
    const output = renderPageList(pages, title);
    res.send(output);
  });

  app.get('/:type(components|patterns|foundations)', async (req, res) => {
    const output = await handleTypeRoute(req, res);
    res.send(output);
  });

  app.get('/:type(components|patterns|foundations)/:name', async (req, res) => {
    const output = await handleTypeRoute(req, res);
    res.send(output);
  });

  app.get('/:type(components|patterns|foundations)/:name/:exampleName', async (req, res) => {
    const output = await handleExamplesRoute(req);
    res.send(output);
  });

  app.use(express.static('./src/static'));
  app.use(express.static('./src/static/favicons'));
  app.use(express.static('./build'));

  app.listen(process.env.TEST_PORT ?? 3010);
})();
