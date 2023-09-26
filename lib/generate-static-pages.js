import fs from 'fs';
import { globSync } from 'glob';
import path from 'path';

import renderPageList from './render-page-list';
import { handleTypeRoute, handleExamplesRoute } from './handle-routes';
import { pages, pagesWithIndex, title } from './config.indexPage';

export default async function generateStaticPages() {
  createBuildDirectory();

  // Render the index page
  const indexPage = renderPageList(pagesWithIndex, title);
  fs.writeFileSync('./build/index.html', indexPage);

  // Loop through each page type and generate the pages
  const types = pages.map((page) => page.uri.slice(1));
  for (const type of types) {
    const folderNames = getFolderNames(type);
    const typePage = await generateTypePages(type, folderNames);
    fs.writeFileSync(`./build/${type}/index.html`, typePage);

    await generateExamplePages(type, folderNames);
  }
}

function createBuildDirectory() {
  if (!fs.existsSync('./build')) {
    fs.mkdirSync('./build');
  }
}

function getFolderNames(type) {
  const path = `./src/${type}`;
  return fs.readdirSync(path, { withFileTypes: true }).map((dir) => dir.name);
}

async function generateExamplePages(type, folderNames) {
  const dir = `./build/${type}`;
  for (const name of folderNames) {
    const exampleFiles = globSync(`./src/${type}/${name}/example-*.njk`).map((filePath) => path.basename(filePath, '.njk'));
    for (const file of exampleFiles) {
      const exampleName = path.basename(file, '.njk');
      const output = await handleExamplesRoute(type, name, exampleName);
      const examplesDir = `${dir}/${name}`;
      fs.writeFileSync(`${examplesDir}/${exampleName}.html`, output);
    }
  }
}

async function generateTypePages(type, folderNames) {
  const dir = `./build/${type}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const files = [];
  for (const name of folderNames) {
    const output = await handleTypeRoute(type, name);
    const examplesDir = `${dir}/${name}`;
    if (!fs.existsSync(examplesDir)) {
      fs.mkdirSync(examplesDir, { recursive: true });
    }
    fs.writeFileSync(`${examplesDir}/index.html`, output);
    files.push({ title: name, uri: `/${type}/${name}/index.html` });
  }

  return renderPageList(files, type);
}
