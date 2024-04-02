const fs = require('fs');
const util = require('util');
const { glob } = require('glob');
const readdir = util.promisify(fs.readdir);

const testURL = `http://host.docker.internal:3010`;

export default async () => {
  let urls = [];
  const directories = [
    {
      path: './src/components',
    },
    {
      path: './src/patterns',
    },
    {
      path: './src/foundations',
    },
  ];
  // Exclude the following examples from the VR tests
  let exclude = ['example-table-of-contents-sticky', 'example-table-of-contents-sticky-full-page'];
  for (const directory of directories) {
    const folders = await readdir(directory.path);
    for (const folder of folders) {
      const files = await glob(`${directory.path}/${folder}/**/example-*.njk`);
      for (const file of files) {
        const urlPath = file.replace(/^/, './').replace(/^\.\/src\/(.*\/example-.*?)\.njk$/, '/$1');
        let flag = true;
        for (const ex of exclude) {
          if (urlPath.endsWith(ex) == true) {
            flag = false;
          }
        }
        flag && urls.push({ url: `${testURL}${urlPath}`, label: urlPath, delay: 2000 });
      }
    }
  }
  return urls;
};
