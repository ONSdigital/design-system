const PercyScript = require('@percy/script');

PercyScript.run(async (page, percySnapshot) => {
  await page.goto('http://localhost:3030');
  await page.waitFor('.patternlib-page');
  await percySnapshot('homepage');
});
