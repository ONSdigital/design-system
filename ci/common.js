import * as fs from 'fs-extra';

export async function copyComponents(componentsPath, newComponentsPath) {
  await fs.ensureDir(newComponentsPath);

  const items = (await fs.readdir(componentsPath)).filter(path => !path.includes('.njk'));
  for (let item of items) {
    await copyComponent(item, componentsPath, newComponentsPath);
  }
}

async function copyComponent(componentName, componentsPath, newComponentsPath) {
  const componentPath = `${componentsPath}/${componentName}`;
  const newComponentPath = `${newComponentsPath}/${componentName}`;

  const items = (await fs.readdir(componentPath)).filter(
    item => !item.includes('.md') && !item.includes('_test-') && !item.includes('index') && item !== 'examples',
  );

  if (items.length) {
    await fs.ensureDir(newComponentPath);
  }

  for (let path of items) {
    await fs.copy(`${componentPath}/${path}`, `${newComponentPath}/${path}`);
  }
}

export async function copyTemplates(templatesPath, newTemplatesPath) {
  await fs.ensureDir(newTemplatesPath);

  const items = (await fs.readdir(templatesPath)).filter(path => path.includes('.njk') && path.includes('_'));
  for (let item of items) {
    await copyTemplate(item, templatesPath, newTemplatesPath);
  }
}

async function copyTemplate(templateFileName, templatesPath, newTemplatesPath) {
  await fs.copy(`${templatesPath}/${templateFileName}`, `${newTemplatesPath}/${templateFileName}`);
}
