import { promises as fs } from 'fs';

const srcPath = './search-index.json';

async function getData() {
  const content = await readAndFormatJSON();
  rewriteIndex(JSON.stringify(content));
}

async function rewriteIndex(content) {
  try {
    await fs.writeFile(srcPath, content, () => {});
  } catch (err) {
    console.error(err);
  }
}

async function readAndFormatJSON() {
  let data = await fs.readFile(srcPath, 'utf-8');
  data = data.slice(0, -2);
  data = `[${data}]`;
  return JSON.parse(data);
}

getData();
