import prependFile from 'prepend-file';
import { removeFolder, createFolder, asyncForEach } from './helpers';
import { copyComponents, copyTemplates } from './common';

const cwd = process.cwd();
const sourcePath = `${cwd}/src`;
const destPath = `${cwd}/templates`;
const componentsPath = `${sourcePath}/components`;
const newComponentsPath = `${destPath}/components`;
const templatesPath = `${sourcePath}/foundations/page-template`;
const newTemplatesPath = `${destPath}/layout`;
const copiedPageTemplatePath = `${newTemplatesPath}/_template.njk`;

async function removeExistingFolders() {
  const folders = [newComponentsPath, newTemplatesPath];

  await asyncForEach(folders, removeFolder);
}

async function addCDNVersionToPageTemplate() {
  const version = process.env.RELEASE_VERSION;

  if (version) {
    const insert = `{% set release_version = '${version}' %}\n`;

    prependFile.sync(copiedPageTemplatePath, insert);
  } else {
    throw new Error('RELEASE_VERSION not specified');
  }
}

async function run() {
  await removeExistingFolders();
  await createFolder(destPath);
  await copyComponents(componentsPath, newComponentsPath);
  await copyTemplates(templatesPath, newTemplatesPath);
  await addCDNVersionToPageTemplate();
}

run();
