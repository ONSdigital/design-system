import * as fs from 'fs-extra';

import { copyComponents, copyTemplates } from './common';

const cwd = process.cwd();
const sourcePath = `${cwd}/src`;
const componentsPath = `${sourcePath}/components`;
const newComponentsPath = `${cwd}/components`;
const templatesPath = `${sourcePath}/foundations/layout/page-template`;
const newTemplatesPath = `${cwd}/page-templates`;
const assetFolders = ['css', 'favicons', 'fonts', 'img', 'scripts'];
const builtAssetsFolders = assetFolders.map(folder => `${cwd}/build/${folder}`);
const newSassPath = `${cwd}/scss`;

async function removeExistingFolders() {
  const folders = [newComponentsPath, newTemplatesPath, ...assetFolders];
  for (let folder of folders) {
    await fs.remove(folder);
  }
}

async function copyAssets() {
  for (let assetFolderIndex = 0; assetFolderIndex < assetFolders.length; ++assetFolderIndex) {
    const folder = assetFolders[assetFolderIndex];
    const builtPath = builtAssetsFolders[assetFolderIndex];

    await fs.ensureDir(folder);

    try {
      const files = (await fs.readdir(builtPath)).filter(path => !path.includes('patternlib'));

      for (let file of files) {
        if (file.match(/(\.\w+)$/)) {
          await fs.copy(`${builtPath}/${file}`, `${folder}/${file}`);
        } else {
          const newFolderPath = `${folder}/${file}`;
          const nestedBuiltPath = `${builtPath}/${file}`;
          await fs.ensureDir(newFolderPath);

          const nestedFiles = (await fs.readdir(nestedBuiltPath)).filter(path => !path.includes('patternlib'));

          for (let nestedFile of nestedFiles) {
            await fs.copy(`${nestedBuiltPath}/${nestedFile}`, `${newFolderPath}/${nestedFile}`);
          }
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

async function copyBaseSass() {
  await fs.ensureDir(newSassPath);
  await fs.copy(`${sourcePath}/scss`, `${newSassPath}`);
}

async function run() {
  await removeExistingFolders();
  await copyComponents(componentsPath, newComponentsPath);
  await copyTemplates(templatesPath, newTemplatesPath);
  await copyAssets();
  await copyBaseSass();
}

run();
