import { port, testURL, replacePaths, generateURLs } from './percy.config';
import PercyScript from '@percy/script';
import httpServer from 'http-server';

PercyScript.run(async (page, percySnapshot) => {
  await replacePaths();

  let server = httpServer.createServer();
  server.listen(port);
  console.log(`Server started at ${testURL}`);

  const urls = await generateURLs();

  for (const url of urls) {
    await page.goto(url.url);
    await percySnapshot(url.name);
  }

  server.close();
});
