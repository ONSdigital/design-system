const fs = require('fs');
const util = require('util');
const glob = util.promisify(require('glob'));
const readdir = util.promisify(fs.readdir);
const componentsDir = `./build/components`;

async function getPages() {
  try {
    const urls = await generateURLs();
    fs.writeFileSync('./lighthouse/urls.json', urls);
  } catch (e) {
    console.error(e);
    return;
  }
}

async function generateURLs() {
  let data = {};
  data.urls = [];
  const folders = await readdir(componentsDir);

  for (const folder of folders) {
    const files = await glob(`${componentsDir}/${folder}/**/*.html`, { ignore: `${componentsDir}/${folder}/index.html` });
    for (const file of files) {
      data.urls.push(file.replace('./build/', 'http://localhost:9000/'));
    }
  }
  return JSON.stringify(data);
}

getPages();
