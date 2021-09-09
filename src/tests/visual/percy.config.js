import replace from 'replace-in-file';
import fs from 'fs';
import util from 'util';
import glob from 'glob';

const globUtil = util.promisify(glob);
const readdir = util.promisify(fs.readdir);

export const port = process.env.TEST_PORT_NUMBER || 8000;
export const testURL = `http://localhost:${port}`;

export async function replacePaths() {
  const options = {
    files: ['build/**/*.html', 'build/scripts/main.js'],
    from: [/scripts/g, /css\//g, /patternlib-img/g, /"\/img\//g],
    to: ['build/scripts', 'build/css/', 'build/patternlib-img', '"/build/img/'],
  };

  try {
    await replace(options);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

export async function generateURLs() {
  let urls = [];
  const directories = [
    {
      path: './build/components',
    },
    {
      path: './build/patterns',
    },
    {
      path: './build/foundations',
    },
  ];
  for (const directory of directories) {
    const folders = await readdir(directory.path);
    for (const folder of folders) {
      const files = await globUtil(`${directory.path}/${folder}/**/*.html`, { ignore: `${directory.path}/${folder}/index.html` });
      for (const file of files) {
        urls.push({ url: `${testURL}/${file}`, name: file });
      }
    }
  }
  return urls;
}
