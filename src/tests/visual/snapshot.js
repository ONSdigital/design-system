const PercyScript = require('@percy/script');
const httpServer = require('http-server');
const PORT = process.env.PORT_NUMBER || 8000;
const TEST_URL = `http://localhost:${PORT}`;

// We need to replace the paths to css and js so they resolve correctly.
const replace = require('replace-in-file');
const options = {
  files: ['build/components/**/examples/**/*.html', 'build/scripts/main.js'],
  from: [/scripts/g, /css\//g],
  to: ['build/scripts', 'build/css/'],
};

const percyOptions = { headless: false };
PercyScript.run(async (page, percySnapshot) => {
  try {
    await replace(options);
  } catch (error) {
    console.error('Error occurred:', error);
  }

  let server = httpServer.createServer();
  server.listen(PORT);
  console.log(`Server started at ${TEST_URL}`);
  await page.goto(`${TEST_URL}/build/components/accordion/examples/accordion/index.html`);
  await page.waitFor('.collapsible--initialised');
  await percySnapshot('Accordion');
  server.close();
}, percyOptions);
