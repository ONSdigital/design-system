import * as fs from 'fs';

import rimraf from 'rimraf';
import ncp from 'ncp';

const cwd = process.cwd();
const sourcePath = `${cwd}/src`;
const componentsPath = `${sourcePath}/components`;
const newComponentsPath = `${cwd}/components`;
const templatesPath = `${sourcePath}/styles/page-template`;
const newTemplatesPath = `${cwd}/page-templates`;
const assetFolders = ['css', 'favicons', 'fonts', 'img', 'scripts'];
const builtAssetsFolders = assetFolders.map(folder => `${cwd}/build/${folder}`);
const newSassPath = `${cwd}/scss`;

async function removeExistingFolders() {
  const folders = [newComponentsPath, newTemplatesPath, ...assetFolders];

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
    const componentPath = `${componentsPath}/${componentName}`;
    const newComponentPath = `${newComponentsPath}/${componentName}`;

    const items = await fs
      .readdirSync(componentPath)
      .filter(path => path.includes('.njk') && path.includes('_') && !path.includes('_test-'));

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

async function copyAssets() {
  await asyncForEach(assetFolders, async (folder, index) => {
    await createFolder(folder);

    try {
      const builtPath = builtAssetsFolders[index];
      const files = await fs.readdirSync(builtPath).filter(path => !path.includes('patternlib'));

      asyncForEach(files, async file => {
        if (file.match(/(\.\w+)$/)) {
          await copyFile(`${builtPath}/${file}`, `${folder}/${file}`);
        } else {
          const newFolderPath = `${folder}/${file}`;
          const nestedBuiltPath = `${builtPath}/${file}`;
          await createFolder(newFolderPath);

          const nestedFiles = await fs.readdirSync(nestedBuiltPath).filter(path => !path.includes('patternlib'));

          asyncForEach(nestedFiles, async nestedFile => {
            await copyFile(`${nestedBuiltPath}/${nestedFile}`, `${newFolderPath}/${nestedFile}`);
          });
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  });
}

async function copyBaseSass() {
  await createFolder(newSassPath);
  await copyDir(`${sourcePath}/scss/helpers`, `${newSassPath}/helpers`);
  await copyDir(`${sourcePath}/scss/vars`, `${newSassPath}/vars`);
}

async function copyDir(from, to) {
  return new Promise((resolve, reject) => {
    ncp(from, to, error => {
      if (error) {
        throw new Error(error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
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
  await copyAssets();
  await copyBaseSass();
}

run();
