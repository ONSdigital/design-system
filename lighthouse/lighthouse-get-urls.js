const fs = require('fs');
const util = require('util');
const glob = util.promisify(require('glob'));
const readdir = util.promisify(fs.readdir);

async function createURLsFile() {
  try {
    const urls = await getURLs();
    fs.writeFileSync('./lighthouse/urls.json', urls);
  } catch (e) {
    console.error(e);
    return;
  }
}

async function getURLs() {
  let data = {};
  data.urls = [];
  const directories = [
    {
      path: './build/components',
    },
    {
      path: './build/patterns',
    },
    {
      path: './build/styles',
    },
  ];
  for (const directory of directories) {
    const folders = await readdir(directory.path);
    for (const folder of folders) {
      const files = await glob(`${directory.path}/${folder}/**/*.html`, { ignore: `${directory.path}/${folder}/index.html` });
      for (const file of files) {
        data.urls.push(file.replace('./build/', 'http://localhost:9000/'));
      }
    }
  }
  return JSON.stringify(data);
}

createURLsFile();
