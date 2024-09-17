const fs = require('fs');
const util = require('util');
const { glob } = require('glob');
const readdir = util.promisify(fs.readdir);

async function createURLsFile() {
    try {
        const urls = await getURLs();
        fs.writeFileSync('./lighthouse/urls.json', urls);
    } catch (e) {
        console.error(e);
        return;
    }
}

async function getURLs() {
    let data = {};
    data.urls = [];
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
            const files = await glob(`${directory.path}/${folder}/**/*.html`);
            const filteredFiles = files.filter((path) => !path.includes('index.html') && !path.includes('example-skip-to-content.html'));
            for (const file of filteredFiles) {
                data.urls.push(file.replace('build/', 'http://localhost/'));
            }
        }
    }
    return JSON.stringify(data);
}

createURLsFile();
