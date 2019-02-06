import * as fs from 'fs';
import * as path from 'path';

import rimraf from 'rimraf';

const cwd = process.cwd();
const sourcePath = `${cwd}/src`;
const componentsPath = `${sourcePath}/components`;
const newComponentsPath = `${cwd}/onsComponents`;
const templatesPath = `${sourcePath}/styles/page-template/src`;
const newTemplatesPath = `${cwd}/onsPageTemplates`;

async function removeExistingFolders() {
  const folders = [newComponentsPath, newTemplatesPath];

  await asyncForEach(folders, removeFolder);
}

async function removeFolder(folderPath) {
  try {
    if (await fs.existsSync(folderPath)) {
      await rimraf.sync(folderPath);
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function copyComponents() {
  await createFolder(newComponentsPath);

  try {
    const items = await fs.readdirSync(componentsPath).filter(path => !path.includes('.njk'));

    items.forEach(await copyComponent);
  } catch (error) {
    throw new Error(error);
  }
}

async function copyComponent(componentName) {
  try {
    const componentPath = `${componentsPath}/${componentName}/src`;
    const newComponentPath = `${newComponentsPath}/${componentName}`;

    const items = await fs.readdirSync(componentPath).filter(path => path.includes('.njk'));

    if (items.length) {
      await createFolder(newComponentPath);
    }

    items.forEach(async path => {
      await copyFile(`${componentPath}/${path}`, `${newComponentPath}/${path}`);
    });
  } catch (error) {
    throw new Error(error);
  }
}

async function copyTemplates() {
  await createFolder(newTemplatesPath);

  try {
    const items = await fs.readdirSync(templatesPath).filter(path => path.includes('.njk'));

    items.forEach(await copyTemplate);
  } catch (error) {
    throw new Error(error);
  }
}

async function copyTemplate(templateFileName) {
  try {
    await copyFile(`${templatesPath}/${templateFileName}`, `${newTemplatesPath}/${templateFileName}`);
  } catch (error) {
    throw new Error(error);
  }
}

async function createFolder(folderPath) {
  try {
    await fs.mkdirSync(folderPath);
  } catch (error) {
    throw new Error(error);
  }
}

async function copyFile(filePath, newComponentPath) {
  try {
    await fs.copyFileSync(filePath, newComponentPath);
  } catch (error) {
    throw new Error(error);
  }
}

async function asyncForEach(array, callback) {
  for (let index = 0, arrayLength = array.length; index < arrayLength; index++) {
    await callback(array[index], index, array);
  }
}

async function run() {
  await removeExistingFolders();
  await copyComponents();
  await copyTemplates();
}

run();
