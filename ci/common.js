import * as fs from 'fs-extra';

export async function copyComponents(componentsPath, newComponentsPath) {
  await fs.ensureDir(newComponentsPath);

  try {
    const items = await fs.readdirSync(componentsPath).filter(path => !path.includes('.njk'));

    items.forEach(item => copyComponent(item, componentsPath, newComponentsPath));
  } catch (error) {
    throw new Error(error);
  }
}

async function copyComponent(componentName, componentsPath, newComponentsPath) {
  try {
    const componentPath = `${componentsPath}/${componentName}`;
    const newComponentPath = `${newComponentsPath}/${componentName}`;

    const items = await fs
      .readdirSync(componentPath)
      .filter(item => !item.includes('.md') && !item.includes('_test-') && !item.includes('index') && item !== 'examples');

    if (items.length) {
      await fs.ensureDir(newComponentPath);
    }

    items.forEach(async path => {
      await fs.copy(`${componentPath}/${path}`, `${newComponentPath}/${path}`);
    });
  } catch (error) {
    throw new Error(error);
  }
}

export async function copyTemplates(templatesPath, newTemplatesPath) {
  await fs.ensureDir(newTemplatesPath);

  try {
    const items = await fs.readdirSync(templatesPath).filter(path => path.includes('.njk') && path.includes('_'));

    items.forEach(item => copyTemplate(item, templatesPath, newTemplatesPath));
  } catch (error) {
    throw new Error(error);
  }
}

async function copyTemplate(templateFileName, templatesPath, newTemplatesPath) {
  try {
    await fs.copy(`${templatesPath}/${templateFileName}`, `${newTemplatesPath}/${templateFileName}`);
  } catch (error) {
    throw new Error(error);
  }
}
