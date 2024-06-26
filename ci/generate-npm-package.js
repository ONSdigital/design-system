import * as fs from 'fs-extra';

import { copyComponents, copyTemplates } from './common';

const cwd = process.cwd();
const sourcePath = `${cwd}/src`;
const componentsPath = `${sourcePath}/components`;
const newComponentsPath = `${cwd}/components`;
const templatesPath = `${sourcePath}/layout`;
const newTemplatesPath = `${cwd}/layout`;
const assetFolders = ['css', 'favicons', 'img', 'scripts', 'js'];
const builtAssetsFolders = assetFolders.map((folder) => `${cwd}/build/${folder}`);
const newSassPath = `${cwd}/scss`;

async function removeExistingFolders() {
    const folders = [newComponentsPath, newTemplatesPath, 'fonts', ...assetFolders];
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
            const files = (await fs.readdir(builtPath)).filter((path) => !path.includes('ds-'));

            for (let file of files) {
                if (file.match(/(\.\w+)$/)) {
                    await fs.copy(`${builtPath}/${file}`, `${folder}/${file}`);
                } else {
                    const newFolderPath = `${folder}/${file}`;
                    const nestedBuiltPath = `${builtPath}/${file}`;
                    await fs.ensureDir(newFolderPath);

                    const nestedFiles = (await fs.readdir(nestedBuiltPath)).filter((path) => !path.includes('ds-'));

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

async function copyBaseSassAndFonts() {
    await fs.ensureDir(newSassPath);
    await fs.copy(`${sourcePath}/scss`, `${newSassPath}`);
    await fs.copy(`${sourcePath}/static/fonts`, `${cwd}/fonts`);
}

async function run() {
    await removeExistingFolders();
    await copyComponents(componentsPath, newComponentsPath);
    await copyTemplates(templatesPath, newTemplatesPath);
    await copyAssets();
    await copyBaseSassAndFonts();
}

run();
